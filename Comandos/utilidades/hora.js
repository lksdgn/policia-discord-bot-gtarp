const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const TOKEN = 'SEU_TOKEN_AQUI';
const ID_CANAL_BATE_PONTO = '1303853664288641105';
const CARGO1 = '1302014768336470018'; // Alto Escalão
const CARGO2 = '1302009012249956352'; // Segundo Escalão

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

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
            if (ts >= afterTimestamp && ts <= beforeTimestamp) {
                allMessages.push(msg);
            }
            lastId = msg.id;
        }

        const lastMsg = messages.last();
        if (lastMsg && lastMsg.createdTimestamp < afterTimestamp) {
            done = true;
        }
    }

    return allMessages;
}

client.once('ready', () => {
    console.log(`sistema de contagem de horas por patente carregado!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!horas')) {
        if (!message.member.roles.cache.has(CARGO1) && !message.member.roles.cache.has(CARGO2)) {
            await message.reply('❌ Você não tem permissão para usar este comando.');
            return;
        }

        const partes = message.content.trim().split(' ');
        if (partes.length !== 4 || !message.mentions.roles.size) {
            await message.reply('❌ Use o formato: `!horas @cargo DD/MM/AAAA DD/MM/AAAA`');
            return;
        }

        const cargoMencionado = message.mentions.roles.first();
        const dataInicio = dayjs(partes[2], 'DD/MM/YYYY');
        const dataFim = dayjs(partes[3], 'DD/MM/YYYY').endOf('day');

        if (!dataInicio.isValid() || !dataFim.isValid()) {
            await message.reply('❌ Datas inválidas. Use o formato DD/MM/AAAA.');
            return;
        }

        await message.reply(`⏳ Buscando registros de membros com o cargo ${cargoMencionado} entre ${partes[2]} e ${partes[3]}...`);

        const canal = await client.channels.fetch(ID_CANAL_BATE_PONTO);
        if (!canal) {
            await message.reply('❌ Canal de bate-ponto não encontrado.');
            return;
        }

        await message.guild.members.fetch();

        const membrosComCargo = cargoMencionado.members;
        const idsMap = new Map();

        membrosComCargo.forEach(member => {
            const nome = member.displayName || '';
            console.log(`[DEBUG] Verificando apelido: ${nome}`);

            // regex que captura: [PATENTE] Nome Sobrenome | ID
            const regex = /^\[\s*([^\]]+?)\s*\]\s+(.+?)\s*\|\s*(\d+)\s*$/;
            const match = nome.match(regex);
            if (match) {
                const patenteDoApelido = match[1].trim();
                const nomeRP = match[2].replace(/\s{2,}/g, ' ').trim();
                const idRP = match[3].trim();

                idsMap.set(idRP, nomeRP);
                console.log(`[DEBUG] ✅ Válido | ID: ${idRP} | Nome: ${nomeRP} | Patente: ${patenteDoApelido}`);
            } else {
                console.log(`[DEBUG] ❌ Ignorado (apelido fora do padrão): ${nome}`);
            }
        });

        const mensagens = await fetchMessagesBetween(canal, dataInicio.valueOf(), dataFim.valueOf());
        const registros = {};

        for (const msg of mensagens) {
            if (!msg.embeds.length) continue;

            const embed = msg.embeds[0];
            let texto = embed.description || '';
            if (!texto) {
                texto = embed.fields.map(f => `${f.name}: ${f.value}`).join('\n');
            }

            const idMatch = texto.match(/\[ID:\s*(\d+)\]/);
            const tempoMatch = texto.match(/Tempo total em serviço:\s*([\d\w\s\*]+)/i);
            if (!idMatch || !tempoMatch) continue;

            const idRP = idMatch[1];
            if (!idsMap.has(idRP)) continue;

            const tempo = parseTempo(tempoMatch[1]);

            if (registros[idRP]) {
                registros[idRP].tempo = registros[idRP].tempo.add(tempo);
            } else {
                registros[idRP] = {
                    nome: idsMap.get(idRP),
                    tempo
                };
            }
        }

        if (Object.keys(registros).length === 0) {
            await message.reply("❌ Nenhum tempo registrado para os membros válidos nesse período.");
            return;
        }

        const registrosOrdenados = Object.entries(registros).sort((a, b) => {
            return b[1].tempo.asSeconds() - a[1].tempo.asSeconds();
        });

        // 🔹 Quebrar em blocos de até 25 e enviar múltiplos embeds
        const chunks = [];
        for (let i = 0; i < registrosOrdenados.length; i += 25) {
            chunks.push(registrosOrdenados.slice(i, i + 25));
        }

        for (let i = 0; i < chunks.length; i++) {
            const embed = new EmbedBuilder()
                .setTitle(`📊 Relatório de Horas ${cargoMencionado.name} - ${partes[2]} até ${partes[3]} ${chunks.length > 1 ? `(Parte ${i + 1})` : ''}`)
                .setColor('Blue');

            for (const [idRP, { nome, tempo }] of chunks[i]) {
                const horas = Math.floor(tempo.asHours());
                const minutos = Math.floor(tempo.asMinutes()) % 60;

                embed.addFields({
                    name: `${nome} - ${idRP}`,
                    value: `**${horas}** horas e **${minutos}** minutos`,
                    inline: false
                });
            }

            await message.channel.send({ embeds: [embed] });
        }
    }
});

client.login(TOKEN);
