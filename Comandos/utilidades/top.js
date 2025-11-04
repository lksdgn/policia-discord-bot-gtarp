// top5-automatico.js

import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import fs from 'fs';
import cron from 'node-cron';

dayjs.extend(duration);
dayjs.extend(customParseFormat);

const TOKEN = 'SEU_TOKEN_AQUI';
const CANAL_BATE_PONTO = '1303853664288641105';
const CANAL_LOGS = '1386235194360594492';
const CARGO_TOP5 = '1393070997489586286';
const IDMAP_PATH = './json/idmap.json';

const CARGOS_AUTORIZADOS = [
  '1004156164243738644',
  '1276180887561568296',
  '1302014768336470018'
];

function extrairNomeEIdDoApelido(nick) {
  if (!nick) return null;
  nick = nick.trim();
  const idMatch = nick.match(/(\d+)\s*$/);
  if (!idMatch) return null;
  const id = idMatch[1];
  const semPatente = nick.replace(/^[^\-|]+[\-|]/, '').trim();
  const nomePartes = semPatente.split(/[\-|]/)[0].trim().split(/\s+/);
  const primeiroNome = nomePartes[0]?.trim();
  if (!primeiroNome || !id) return null;
  return { primeiroNome, id };
}

function extrairNomeEIdDoBatePonto(str) {
  const idMatch = str.match(/\[ID:\s*(\d+)\]/);
  if (!idMatch) return null;
  const id = idMatch[1];
  const nomeMatch = str.match(/\[ID:\s*\d+\]\s*-\s*(.+)/);
  if (!nomeMatch) return null;
  const nomeCompleto = nomeMatch[1].trim();
  const primeiroNome = nomeCompleto.split(/\s+/)[0];
  return { primeiroNome, id };
}

function parseTempo(tempoStr) {
  tempoStr = tempoStr.toLowerCase().replace(/\*/g, '').replace(/ e /g, ' ').trim();
  const hMatch = tempoStr.match(/(\d+)\s*hr/);
  const mMatch = tempoStr.match(/(\d+)\s*min/);
  const sMatch = tempoStr.match(/(\d+)\s*seg/);
  const horas = hMatch ? parseInt(hMatch[1]) : 0;
  const minutos = mMatch ? parseInt(mMatch[1]) : 0;
  const segundos = sMatch ? parseInt(sMatch[1]) : 0;
  return dayjs.duration({ hours: horas, minutes: minutos, seconds: segundos });
}

async function fetchMessagesBetween(channel, afterTimestamp, beforeTimestamp) {
  let allMessages = [];
  let lastId = null;
  let done = false;
  while (!done) {
    const options = { limit: 100 };
    if (lastId) options.before = lastId;
    const messages = await channel.messages.fetch(options);
    if (messages.size === 0) break;
    for (const msg of messages.values()) {
      const ts = msg.createdTimestamp;
      if (ts >= afterTimestamp && ts <= beforeTimestamp) allMessages.push(msg);
      lastId = msg.id;
    }
    const lastMsg = messages.last();
    if (lastMsg && lastMsg.createdTimestamp < afterTimestamp) done = true;
  }
  return allMessages;
}

async function logExecucao(texto) {
  try {
    const canalLogs = await client.channels.fetch(CANAL_LOGS);
    if (canalLogs && canalLogs.isTextBased()) await canalLogs.send(texto);
  } catch {}
}

function temCargoAutorizado(member) {
  return CARGOS_AUTORIZADOS.some(cargoId => member.roles.cache.has(cargoId));
}

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function comandoTop5(message) {
  try {
    const canal = await client.channels.fetch(CANAL_BATE_PONTO);
    if (!canal || !canal.isTextBased()) return;

    let idmap = {};
    try {
      idmap = JSON.parse(fs.readFileSync(IDMAP_PATH, 'utf8'));
    } catch {
      return;
    }

    const agora = dayjs();
    const seteDiasAtras = agora.subtract(7, 'day');
    const mensagens = await fetchMessagesBetween(canal, seteDiasAtras.valueOf(), agora.valueOf());

    const registros = {};

    for (const msg of mensagens) {
      if (!msg.embeds.length) continue;
      const embed = msg.embeds[0];
      let texto = embed.description || '';
      if (!texto) texto = embed.fields.map(f => `${f.name}: ${f.value}`).join('\n');
      const batePontoInfo = extrairNomeEIdDoBatePonto(texto);
      if (!batePontoInfo) continue;
      const tempoMatch = texto.match(/Tempo total em servico:\s*([\d\w\s\*]+)/i);
      if (!tempoMatch) continue;
      const tempo = parseTempo(tempoMatch[1]);
      if (registros[batePontoInfo.id]) {
        registros[batePontoInfo.id].tempo = registros[batePontoInfo.id].tempo.add(tempo);
      } else {
        registros[batePontoInfo.id] = { tempo, batePontoInfo };
      }
    }

    const ordenados = Object.entries(registros)
      .sort(([, a], [, b]) => b.tempo.asSeconds() - a.tempo.asSeconds())
      .slice(0, 5);

    if (ordenados.length === 0) return;

    const guild = client.guilds.cache.first();
    await guild.members.fetch();

    let resposta = '**🏆 TOP 5 SEMANAL:**\n\n';

    const premios = [
      { acesso: 'Mercedes GT63 (exclusiva TOP 5) e Rifle Bullpup MK2', base: 300000, porHora: 5000 },
      { acesso: 'Mercedes GT63 (exclusiva TOP 5) e Rifle Bullpup MK2', base: 250000, porHora: 4000 },
      { acesso: 'Mercedes GT63 (exclusiva TOP 5) e Rifle Bullpup MK2', base: 200000, porHora: 3000 },
      { acesso: 'Mercedes GT63 (exclusiva TOP 5) e Rifle Bullpup MK2', base: 150000, porHora: 2000 },
      { acesso: 'Mercedes GT63 (exclusiva TOP 5) e Rifle Bullpup MK2', base: 100000, porHora: 1000 }
    ];

    for (let i = 0; i < ordenados.length; i++) {
      const [idServico, dados] = ordenados[i];
      const { tempo, batePontoInfo } = dados;

      const membro = guild.members.cache.find(m => {
        const nick = m.nickname || m.user.username;
        const apelidoInfo = extrairNomeEIdDoApelido(nick);
        if (!apelidoInfo) return false;
        const idIgual = apelidoInfo.id === batePontoInfo.id;
        const nomeIgual = normalize(apelidoInfo.primeiroNome) === normalize(batePontoInfo.primeiroNome);
        return idIgual && nomeIgual;
      });

      if (membro) {
        try {
          await membro.roles.add(CARGO_TOP5, 'Top 5 semanal');
        } catch {}
      }

      const horas = Math.floor(tempo.asHours());
      const minutos = Math.floor(tempo.asMinutes()) % 60;
      const totalPremio = premios[i].base + horas * premios[i].porHora;

      resposta += `**TOP ${i + 1}:** ${membro ? `<@${membro.id}>` : '(Usuário não encontrado)'} - ${horas} horas e ${minutos} minutos\n`;
      resposta += `Acesso a ${premios[i].acesso}\n`;
      resposta += `Recompensa de R$ ${totalPremio.toLocaleString('pt-BR')}\n\n`;
    }

    resposta += `**Abram ticket e marque o <@216807300810276866> para resgatar a bonificação.**\n\n`;
    resposta += `*Observação:*\n`;
    resposta += `Os benefícios são válidos até sábado às 23:59. Após isso perdem o acesso a viatura e ao armamento.\n`;
    resposta += `Oficiais que forem pegos farmando horas/salário serão excluídos da contagem pro top5 semanal e levarão multa referente às horas.`;

    const canalLogs = await client.channels.fetch(CANAL_LOGS);
    if (canalLogs) await canalLogs.send(resposta);
    await logExecucao(`Top 5 semanal gerado automaticamente.`);

  } catch (err) {
    console.error('Erro no comando Top5 automático:', err);
  }
}

async function comandoLimparTop5(message) {
  try {
    const guild = client.guilds.cache.first();
    await guild.members.fetch();
    const membrosComCargo = guild.members.cache.filter(m => m.roles.cache.has(CARGO_TOP5));
    for (const membro of membrosComCargo.values()) {
      try {
        await membro.roles.remove(CARGO_TOP5, 'Limpeza do Top5 semanal');
      } catch {}
    }
    await logExecucao(`Top 5 semanal resetado automaticamente.`);
  } catch (err) {
    console.error('Erro ao limpar Top5 automaticamente:', err);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.on('ready', () => {
  console.log(`sistema top5 by krozz ativo em: ${client.user.tag}`);

  // Sexta 23:59 - Remover cargos Top5
  cron.schedule('59 23 * * 5', async () => {
    await comandoLimparTop5();
  });

  // Sábado 23:59 - Gerar novo Top5
  cron.schedule('59 23 * * 6', async () => {
    await comandoTop5();
  });
});

client.login(TOKEN);
