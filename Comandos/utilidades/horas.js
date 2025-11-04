const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const TOKEN = 'SEU_TOKEN_AQUI';
const ID_CANAL_BATE_PONTO = '1303853664288641105';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
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
    console.log(`sistema de contagem de horas de todos os oficiais carregado (krozz lindo)!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!relatorio')) {
        const partes = message.content.trim().split(' ');
        if (partes.length !== 3) {
            await message.reply('❌ Use o formato: `!relatorio DD/MM/AAAA DD/MM/AAAA`');
            return;
        }

        const [_, dataInicioStr, dataFimStr] = partes;
        const dataInicio = dayjs(dataInicioStr, 'DD/MM/YYYY');
        const dataFim = dayjs(dataFimStr, 'DD/MM/YYYY').endOf('day');

        if (!dataInicio.isValid() || !dataFim.isValid()) {
            await message.reply('❌ Datas inválidas. Use o formato DD/MM/AAAA.');
            return;
        }

        const canal = await client.channels.fetch(ID_CANAL_BATE_PONTO);
        if (!canal) {
            await message.reply('❌ Canal de bate-ponto não encontrado.');
            return;
        }

        await message.reply(`⏳ Buscando registros de ${dataInicioStr} até ${dataFimStr}...`);

        const mensagens = await fetchMessagesBetween(canal, dataInicio.valueOf(), dataFim.valueOf());

        const registros = {};

        for (const msg of mensagens) {
            if (!msg.embeds.length) continue;

            const embed = msg.embeds[0];
            let texto = embed.description || '';
            if (!texto) {
                texto = embed.fields.map(f => `${f.name}: ${f.value}`).join('\n');
            }

            const nomeMatch = texto.match(/\[ID:\s*(\d+)\]\s*-\s*(.+)/);
            if (!nomeMatch) continue;

            const idOficial = nomeMatch[1];
            const nome = nomeMatch[2].replace(/`/g, '').trim();

            const tempoMatch = texto.match(/Tempo total em serviço:\s*([\d\w\s\*]+)/i);
            if (!tempoMatch) continue;

            const tempo = parseTempo(tempoMatch[1]);

            if (registros[idOficial]) {
                registros[idOficial].tempo = registros[idOficial].tempo.add(tempo);
            } else {
                registros[idOficial] = { nome, tempo };
            }
        }

        const registrosOrdenados = Object.entries(registros)
            .sort(([, a], [, b]) => b.tempo.asSeconds() - a.tempo.asSeconds());

        if (!registrosOrdenados.length) {
            await message.reply("❌ Nenhum registro encontrado nesse período.");
            return;
        }

        const chunkSize = 25;
        const chunks = [];
        for (let i = 0; i < registrosOrdenados.length; i += chunkSize) {
            chunks.push(registrosOrdenados.slice(i, i + chunkSize));
        }

        for (let i = 0; i < chunks.length; i++) {
            const embed = new EmbedBuilder()
                .setTitle(`📊 Relatório de Horas (${dataInicioStr} até ${dataFimStr}) - Página ${i + 1}/${chunks.length}`)
                .setColor('Blue');

            for (const [idOficial, { nome, tempo }] of chunks[i]) {
                const horas = Math.floor(tempo.asHours());
                const minutos = Math.floor(tempo.asMinutes()) % 60;
                embed.addFields({
                    name: `[ID: ${idOficial}] - ${nome}`,
                    value: `**${horas}** horas e **${minutos}** minutos`,
                    inline: false
                });
            }

            await message.channel.send({ embeds: [embed] });
        }
    }
});

client.login(TOKEN);
