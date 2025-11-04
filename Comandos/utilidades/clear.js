const Discord = require("discord.js");

const { JsonDatabase, } = require("wio.db");
const dbe = new JsonDatabase({ databasePath:"./json/emojis.json" });
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
module.exports = {
    name: "clear",
    description:`Limpe o chat atual.`,
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) 
        return interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
        let numero = Number(interaction.options.getNumber('quantidade'))
        if (isNaN(numero)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Coloque um número válido!`})
            return;
        }
        if (numero > 2000 || numero <= 0) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | O comando só apaga entre \`0 - 2000\` mensagens!`})
            return;
        }
        let nmr2 = numero
        await interaction.reply({
            content: `${dbe.get(`16`)} | Limpando chat, aguarde...`,
            ephemeral: true
        });
        let deletedCount = 0; 

        function deleteMsg() {
            let msgApagar;
            if (nmr2 > 99) {
                msgApagar = 99
            } else {
                msgApagar = nmr2
            }
            
            interaction.channel.bulkDelete(msgApagar).then((msg) => {
                deletedCount = deletedCount + msg.size;
                nmr2 = nmr2 - msgApagar
                if (nmr2 <= 0) {
                    interaction.editReply({
                        content: `${dbe.get(`6`)} | **${deletedCount}** mensagens excluídas do chat.`,
                        ephemeral: true
                    });
                    return;
                } 
                deleteMsg()
            }).catch((msg) => {
                interaction.editReply({
                    content: `${dbe.get(`13`)} | Algumas mensagens são muito antigas e não poderei apagar! Escolha menos mensagens para apagar.`,
                    ephemeral: true
                });
                return;
            })
        }
        deleteMsg()
    }
}