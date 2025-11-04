const Discord = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})

module.exports = {
    name: "botconfig", 
    description: "Configue o seu bot", 
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (interaction.user.id !== dbp.get(`${interaction.user.id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
            return;
        }
        interaction.reply({ 
            embeds: [
                new Discord.EmbedBuilder()
                .setTitle(`Configuração Bot`)
                .setDescription(`Selecione um dos botões abaixo para configurar o seu bot!`)
                .setColor(dbc.get(`color`) || "Default")
            ], components: [
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configbot`)
                    .setLabel(`Configurar Bot`)
                    .setEmoji(`<:gerenciar:1239447347055034421>`),
                    new Discord.ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configticket`)
                    .setLabel(`Configurar Ticket`)
                    .setEmoji(`<:1166960895201656852:1239447582464282674>`),
                    new Discord.ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configsugestsistem`)
                    .setLabel(`Configurar Sistema Sugestão`)
                    .setEmoji(`<:comentario:1245612394634543134>`)
                )
            ]
        }).then(msg => {
            setTimeout(() => {
                msg.edit({ content: `${dbe.get(`13`)} | Use o comando novamente!`, embeds: [], components: []})
            }, 180000);
        })
    }
}