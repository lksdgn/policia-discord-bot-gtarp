const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")

module.exports = {
    name: "set", 
    description:"「🧶」Exiba um painel",
    type:Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {
        if (interaction.user.id !== dbp.get(`${interaction.user.id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
            return;
        }

        const paineis = dbt.all();

        if (!paineis || Object.keys(paineis).length === 0) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Nenhum painel foi criado ainda!`})
            return;
        }

        const actionrowselect = new StringSelectMenuBuilder()
        .setCustomId('select-set-painel')
        .setPlaceholder('Selecione um painel')


        paineis.map((entry, index) => {
            actionrowselect.addOptions(
                {
                    label: `ID do Painel: ${entry.data.idpainel}`,
                    description: `Tipo: ${entry.data.tipo}`,
                    value: `${entry.data.idpainel}`
                }
            )
        })

        const selectMenu = new ActionRowBuilder()
        .addComponents(actionrowselect)

        const embed = new EmbedBuilder()
        .setTitle(`Setando Painel Ticket`)
        .setDescription(`Selecione abaixo qual painel você deseja setar!`)
        .setColor(dbc.get(`color`) || "Default")

        interaction.reply({ embeds: [embed], components: [selectMenu], ephemeral:true})
    }
}