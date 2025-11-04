// arquivo: bot-perfil.js
const { Client, GatewayIntentBits, EmbedBuilder, AuditLogEvent } = require('discord.js');
const dayjs = require('dayjs');
const fs = require('fs');
const duration = require('dayjs/plugin/duration');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const TOKEN = 'SEU_TOKEN_AQUI';
const ID_CANAL_BATE_PONTO = '1303853664288641105';
const UPS_FILE = './json/ups.json';

const PATENTES = [
  { id: '1004156164243738644', nome: 'Comando' },
  { id: '1276180887561568296', nome: 'Sub Comando' },
  { id: '1004156164919001138', nome: 'Coronel' },
  { id: '1004156165837553714', nome: 'Tenente Coronel' },
  { id: '1004156166575759472', nome: 'Major' },
  { id: '1181028239536304218', nome: 'Capitão' },
  { id: '1004156167880200335', nome: '1° Tenente' },
  { id: '1004156168677113896', nome: '2° Tenente' },
  { id: '1004156169364975716', nome: 'Aspirante' },
  { id: '1004156169960554597', nome: 'SubTenente' },
  { id: '1004156170652627027', nome: '1° Sargento' },
  { id: '1004156171181097031', nome: '2° Sargento' },
  { id: '1004156172057727057', nome: '3° Sargento' },
  { id: '1004156172586209290', nome: 'Cabo' },
  { id: '1004156173261488268', nome: 'Soldado' },
  { id: '1004156174628823082', nome: 'Recruta' }
];

const UNIDADES = [
  { id: '1004164453702586408', nome: 'HEAT' },
  { id: '1335728242543562802', nome: 'CORE' },
  { id: '1314748423223640114', nome: 'GTM' },
  { id: '1004164456173011056', nome: 'SAT' },
  { id: '1007115296177397840', nome: 'Marshal' }
];

const CURSOS = [
  { id: '1302013353744531507', nome: 'Sistema Prisional' },
  { id: '1283249162753802303', nome: 'Perseguição' },
  { id: '1283250015556599881', nome: 'Abordagem' },
  { id: '1283247766272741509', nome: 'Modulação na Central' },
  { id: '1283246784998674482', nome: 'Noções Básicas' },
  { id: '1337101528456233021', nome: 'Negociação Geral' },
  { id: '1337101585284730970', nome: 'Gerenciamento de Crise' }
];

const ADVERTENCIAS = [
  { id: '1005182294878851132', nome: 'Advertência Verbal' },
  { id: '1005181674776187012', nome: 'Advertência 1' },
  { id: '1005181864241275050', nome: 'Advertência 2' },
  { id: '1005182011020955688', nome: 'Advertência 3' }
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// --- salvar promoção (ups.json) ---
function salvarPromocao(userId, data) {
  let dados = {};
  if (fs.existsSync(UPS_FILE)) {
    try { dados = JSON.parse(fs.readFileSync(UPS_FILE)); } catch (e) { dados = {}; }
  }
  dados[userId] = dayjs(data).format('YYYY-MM-DD');
  fs.writeFileSync(UPS_FILE, JSON.stringify(dados, null, 2));
}

// --- escanear audit logs (a cada 3 horas) ---
async function escanearPromocoes() {
  try {
    const guild = await client.guilds.fetch('997723713002815508');
    const logs = await guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate, limit: 90 });

    logs.entries.forEach(entry => {
      const userId = entry.target?.id;
      const data = entry.createdAt;
      if (!entry.changes) return;

      const addRoles = entry.changes.find(change =>
        change.key === '$add' &&
        change.new && change.new.some(role => PATENTES.some(p => p.id === role.id))
      );

      if (addRoles && userId) salvarPromocao(userId, dayjs(data));
    });

    console.log(`[${dayjs().format('HH:mm')}] Audit log verificado`);
  } catch (err) {
    console.error('Erro ao escanear promoções:', err);
  }
}

setInterval(escanearPromocoes, 3 * 60 * 60 * 1000);
client.once('ready', () => {
  console.log('Bot pronto — verificando promoções agora e a cada 3h');
  escanearPromocoes().catch(console.error);
});

// --- parse de tempo ---
function parseTempo(tempoStr) {
  if (!tempoStr || typeof tempoStr !== 'string') return dayjs.duration();
  tempoStr = tempoStr.toLowerCase().replace(/\*/g, '').replace(/ e /g, ' ').trim();
  // suporta "2 hr 5 min", "2hr", "5 min", "10 seg"
  const h = tempoStr.match(/(\d+)\s*hr/);
  const m = tempoStr.match(/(\d+)\s*min/);
  const s = tempoStr.match(/(\d+)\s*seg/);
  return dayjs.duration({
    hours: h ? parseInt(h[1], 10) : 0,
    minutes: m ? parseInt(m[1], 10) : 0,
    seconds: s ? parseInt(s[1], 10) : 0
  });
}

// --- buscar mensagens entre timestamps (mais robusto) ---
async function fetchMessagesBetween(channel, after, before) {
  let all = [];
  let lastId = null;
  let done = false;

  while (!done) {
    const opts = { limit: 100 };
    if (lastId) opts.before = lastId;

    const msgs = await channel.messages.fetch(opts);
    if (!msgs || msgs.size === 0) break;

    for (const msg of msgs.values()) {
      const ts = msg.createdTimestamp;
      if (ts >= after && ts <= before) all.push(msg);
    }

    // prepara next page
    const last = msgs.last();
    if (!last) break;
    lastId = last.id;

    // Se a última mensagem alcançada já é anterior ao 'after', podemos parar
    if (last.createdTimestamp < after) done = true;

    // Se o número de mensagens retornadas for menor que 100, acabou o histórico
    if (msgs.size < 100) done = true;
  }

  return all;
}

// --- handler do comando !perfil ---
client.on('messageCreate', async (message) => {
  // filter básico
  try {
    if (message.author?.bot) return;
    const content = (message.content || '').trim();
    if (!content.toLowerCase().startsWith('!perfil')) return;

    // debug básico para entender por que "não responde"
    console.log(`[CMD] !perfil chamado por ${message.author.tag} em canal ${message.channel.id} - conteúdo: "${content}"`);

    if (!message.guild) {
      await message.reply('❌ Use este comando dentro do servidor (não no privado).');
      return;
    }

    // canal restrito (mantive sua regra)
    if (message.channel.id !== '1382413095460143215') {
      await message.reply('❌ Este comando só pode ser usado no canal <#1382413095460143215>.');
      return;
    }

    // obter membro alvo (mencionado ou autor)
    const args = content.split(/\s+/);
    let member;
    if (args.length >= 2 && message.mentions && message.mentions.users.size) {
      const mention = message.mentions.users.first();
      member = await message.guild.members.fetch(mention.id).catch(() => null);
      if (!member) {
        await message.reply('❌ Usuário mencionado não encontrado no servidor.');
        return;
      }
    } else {
      // tenta garantir que temos o member completo
      member = await message.guild.members.fetch(message.author.id).catch(() => message.member);
      if (!member) {
        await message.reply('❌ Não consegui obter seus dados de membro.');
        return;
      }
    }

    // pega o apelido que o bot realmente vê
    // guildMember.displayName é preferível (já lida com nickname ou username)
    const apelido = (member.displayName || '').trim();
    console.log(`[DEBUG] apelido detectado para ${member.user.tag}: "${apelido}"`);

    // regex para: [PATENTE] Nome Sobrenome | ID
    const regexApelido = /^\[\s*([^\]]+?)\s*\]\s+(.+?)\s*\|\s*(\d+)\s*$/;
    const match = apelido.match(regexApelido);

    if (!match) {
      await message.reply(
        '❌ Apelido inválido. Formato esperado: `[PATENTE] Nome Sobrenome | ID`' +
        `\nApelido atual: \`${apelido || 'vazio'}\`` +
        `\nExemplo: \`[SD] Lukas Stifler | 69\``
      );
      return;
    }

    const patenteDoApelido = match[1].trim();
    const nomeRP = match[2].replace(/\s{2,}/g, ' ').trim();
    const idRP = match[3].trim();

    console.log(`[DEBUG] parsed -> patente: "${patenteDoApelido}", nomeRP: "${nomeRP}", idRP: "${idRP}"`);

    // patente atual pelos cargos do membro (fallback para a patente do apelido)
    const patenteAtual = PATENTES.find(p => member.roles?.cache?.has(p.id));
    const patente = patenteAtual?.nome || patenteDoApelido || 'Nenhuma';

    const unidades = UNIDADES.filter(u => member.roles.cache.has(u.id)).map(u => u.nome);
    const cursos = CURSOS.filter(c => member.roles.cache.has(c.id)).map(c => c.nome);
    const advertencias = ADVERTENCIAS.filter(a => member.roles.cache.has(a.id)).map(a => a.nome);
    const laudoVacina = member.roles.cache.has('1118537019010846800') ? 'SIM' : 'NÃO';
    const dataEntradaFormatada = dayjs(member.joinedAt).format('DD/MM/YYYY');

    let dataPromocao = 'Não encontrada';
    if (fs.existsSync(UPS_FILE)) {
      try {
        const upsData = JSON.parse(fs.readFileSync(UPS_FILE));
        if (upsData[member.id]) dataPromocao = dayjs(upsData[member.id]).format('DD/MM/YYYY');
      } catch (e) {
        console.warn('Não foi possível ler ups.json corretamente:', e.message);
      }
    }

    const canal = await client.channels.fetch(ID_CANAL_BATE_PONTO).catch(() => null);
    if (!canal) {
      await message.reply('❌ Canal de bate-ponto não encontrado.');
      return;
    }

    // buscar mensagens do período (últimos 7 dias)
    const fim = dayjs().endOf('day');
    const inicio = dayjs().subtract(7, 'day').startOf('day');

    console.log(`[DEBUG] buscando embeds entre ${inicio.toISOString()} e ${fim.toISOString()}`);
    const mensagens = await fetchMessagesBetween(canal, inicio.valueOf(), fim.valueOf());

    let duracaoTotal = dayjs.duration();
    for (const msg of mensagens) {
      try {
        if (!msg.embeds || msg.embeds.length === 0) continue;
        const embed = msg.embeds[0];
        let texto = '';

        if (embed.description && embed.description.trim().length) {
          texto = embed.description;
        } else if (embed.fields && embed.fields.length) {
          texto = embed.fields.map(f => `${f.name}: ${f.value}`).join('\n');
        }

        if (!texto) continue;

        const idMatch = texto.match(/\[ID:\s*(\d+)\]/);
        const tempoMatch = texto.match(/Tempo total em serviço:\s*([\d\w\s\*]+)/i);
        if (!idMatch || !tempoMatch) continue;

        if (idMatch[1] !== idRP) continue;

        const tempo = parseTempo(tempoMatch[1]);
        duracaoTotal = duracaoTotal.add(tempo);
      } catch (err) {
        console.error('Erro ao processar uma embed:', err);
        continue;
      }
    }

    const horas = Math.floor(duracaoTotal.asHours());
    const minutos = Math.floor(duracaoTotal.asMinutes()) % 60;

    const embedResposta = new EmbedBuilder()
      .setTitle(`Perfil de ${nomeRP}`)
      .setColor('Blue')
      .addFields(
        { name: 'QRA:', value: nomeRP, inline: true },
        { name: 'ID:', value: idRP, inline: true },
        { name: 'Patente Atual:', value: patente, inline: false },
        { name: 'Unidade(s):', value: unidades.length ? unidades.join(', ') : 'Nenhuma', inline: false },
        { name: 'Cursos:', value: cursos.length ? cursos.join(', ') : 'Nenhum', inline: false },
        { name: 'Advertências:', value: advertencias.length ? advertencias.join(', ') : 'Nenhuma', inline: false },
        { name: 'Laudo e Vacinas:', value: laudoVacina, inline: true },
        { name: 'Data de Entrada:', value: dataEntradaFormatada, inline: true },
        { name: 'Última Promoção:', value: dataPromocao, inline: true },
        {
          name: `Horas em Serviço (últimos 7 dias - ${inicio.format('DD/MM/YYYY')} até ${fim.format('DD/MM/YYYY')}):`,
          value: `${horas} horas ${minutos} minutos`,
          inline: true
        }
      )
      .setTimestamp();

    await message.reply({ embeds: [embedResposta] });
  } catch (err) {
    console.error('Erro ao processar comando !perfil:', err);
    try { await message.reply('❌ Ocorreu um erro ao processar o comando. Confira os logs do bot.'); } catch (_) {}
  }
});

client.login(TOKEN);
