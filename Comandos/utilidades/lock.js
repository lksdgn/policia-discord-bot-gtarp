const Discord = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
module.exports = {
    name: `lock`,
    description: `Tranque o chat.`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) 
        return interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
        await interaction.reply({
            content:`${dbe.get(`16`)} | Aguarde um momento..`
        });
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id,{
            SendMessages: false
        });
        await interaction.channel.permissionOverwrites.edit(interaction.user.id,{
            SendMessages: true
        });
        interaction.editReply({
            content:`${dbe.get(`6`)} | Canal Bloqueado com sucessso!`,
        })
    }
}