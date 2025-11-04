
const Discord = require("discord.js")

module.exports = {
    name: `botinfo`,
    description: `Veja as minhas informações!`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Informações do Bot ${interaction.client.user.username}`)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
        .setDescription(`Olá ${interaction.user} 👋, veja à seguir as minhas informações.`)
        .addFields(
            {
                name: `Nome:`,
                value: `${interaction.client.user.username}`,
                inline:true
            },
                 {
                name: `Avatar`,
                value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true })})`,
                inline:true
            },
            {
                name: `Membros que eu tenho acesso:`,
                value: `${interaction.client.users.cache.size} Membros`,
                inline:true
            },
        )
        .setColor("ff00b4")
        .setFooter({ text: `Bot do Servidor - ${interaction.guild.name}` })

        interaction.reply({ embeds: [embed], ephemeral:true })
    }
}