const { Client, GatewayIntentBits } = require('discord.js');
const { exec } = require('child_process'); // Importa o módulo 'child_process'

const TOKEN = 'SEU_TOKEN_AQUI';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`sistema de reiniciar com pm2 carregado (krozz lindo)!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Comando !reiniciar
    if (message.content.startsWith('!reiniciar')) {
        // IDs de usuário permitidos para reiniciar
        const autorizadoIDs = ['480190903252680715', '520228168209137684'];

        if (autorizadoIDs.includes(message.author.id)) {
            await message.reply('Indo tomar o azulzinho pra recuperar o folego');
            // Comando para reiniciar o bot (dependendo do seu ambiente)
            exec('pm2 restart index.js', (error, stdout, stderr) => { // Exemplo com PM2
                if (error) {
                    console.error(`Erro ao reiniciar: ${error}`);
                    message.channel.send(`❌ Erro ao reiniciar: ${error.message}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            });
        } else {
            message.reply('Você não tem permissão para usar este comando.');
        }
        return; // Adicionado para evitar que o código abaixo seja executado após o reinício
    }
});

client.login(TOKEN);
