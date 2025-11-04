const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, PermissionsBitField} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const db = new JsonDatabase({ databasePath: "./json/data_ticket.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")
const randomString = require("randomized-string");
const { createTranscript } = require('discord-html-transcripts'); 


module.exports = {
    name: "paineis-ticket", // Coloque o nome do comando
    description: "Abra os paineis de interação do seu ticket por esse comando.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!db.get(`${interaction.channel.id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Não tem nenhum ticket aberto neste canal!`})
            return;
        }
        const Embed = new EmbedBuilder()
        .setAuthor({ name: `Interagindo com Paineis Ticket`, iconURL: interaction.guild.iconURL({ dynamic:true})})
        .setDescription(`Selecione abaixo qual painel deseja abrir :)`)
        .setColor(dbc.get("color"))

        const row = new ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("painel_member")
            .setLabel("Painel Membro")
            .setEmoji(dbc.get(`painel.button.membro`))
            .setStyle(2),
            new Discord.ButtonBuilder()
            .setCustomId("painel_staff")
            .setLabel("Painel Staff")
            .setEmoji(dbc.get(`painel.button.staff`))
            .setStyle(2),
        )

        interaction.reply({ embeds: [Embed], components: [row], ephemeral:true})

        const perm = interaction.channel.permissionOverwrites

        console.log(perm.guild)
        
    }
}