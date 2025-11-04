const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, AttachmentBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const db = new JsonDatabase({ databasePath: "./json/data_ticket.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const db3 = new JsonDatabase({ databasePath: "./json/data_ticket.json"})
const Discord = require("discord.js")
module.exports = {
    name: "interactionCreate",
    run: async (interaction) => {
        if (interaction.isButton()) {
            const option = interaction.customId;
            const tabom = option.split("_")[0];

            if (option.endsWith("_avalia_atendimentoo")) {
                const modal = new Discord.ModalBuilder().setCustomId(`${tabom}_modal_avalia`).setTitle("Avalie nosso atendimento")

                const text = new Discord.TextInputBuilder()
                .setCustomId("numero_avalia")
                .setLabel("Escolha de 1 a 5")
                .setPlaceholder("Digite aqui ✏")
                .setStyle(1)
                .setMaxLength(1)
                .setValue("5")
                const desc = new Discord.TextInputBuilder()
                .setCustomId("desc_avalia")
                .setLabel("Diga mais sobre o nosso atendimento")
                .setPlaceholder("Digite aqui ✏")
                .setStyle(1)
                .setValue("Gostei muito do atendimendo, rapido e pratico")
    
                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                modal.addComponents(new Discord.ActionRowBuilder().addComponents(desc))
                
                return interaction.showModal(modal)
            }
        }
        if (interaction.isModalSubmit()) {
            const customId = interaction.customId
            const tabom = customId.split("_")[0];

            

            if (customId.endsWith("_modal_avalia")) {
                const tickets = db.get(`${tabom}`)
                const text = interaction.fields.getTextInputValue("numero_avalia");
                const text2 = interaction.fields.getTextInputValue("desc_avalia");

                const canal_avalia = interaction.client.channels.cache.get(dbc.get(`ticket.canal_avalia`))

                if (!canal_avalia) {
                    interaction.update({ content: `${dbe.get(`13`)} | Canal de avaliações inválido!`, components: []})
                    return;
                }

                let estrelas = "";
                if (text === "1") { 
                    estrelas = "`⭐ (1/5)`"
                } else if (text === "2") {
                    estrelas = "`⭐⭐` (2/5)"
                } else if (text === "3") {
                    estrelas = "`⭐⭐⭐` (3/5)"
                } else if (text === "4") {
                    estrelas = "`⭐⭐⭐⭐` (4/5)"
                } else if (text === "5") {
                    estrelas = "`⭐⭐⭐⭐⭐` (5/5)"
                } else {
                    interaction.reply({ content: `${dbe.get(`13`)} | Quantidade de estrelas inválida!`, ephemeral:true})
                    return;
                } 
                let staff;
                if (tickets.staff) {
                    staff = interaction.client.users.cache.get(tickets.staff)
                }
                const user = interaction.client.users.cache.get(tickets.usuario)
                const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: `Nova Avaliação ⭐`, iconURL: user.displayAvatarURL({ dynamic:true })})
                    .setThumbnail(user.displayAvatarURL({ dynamic:true }))
                    .addFields(
                        {
                            name: `${dbe.get(`32`)} | Avaliação enviada por:`,
                            value: `${user} - \`${tickets.usuario}\``,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`24`)} | Quem Assumiu:`,
                            value: `${staff || "Ninguém Assumiu"}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`28`)} | Avaliação:`,
                            value: `${estrelas}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`25`)} | Descrição:`,
                            value: `${text2 || "Não Escrita"}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`27`)} | Horário da Avaliação:`,
                            value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                            inline: false
                        }
                    );
    
                canal_avalia.send({ embeds: [embed], content: `<@${tickets.usuario}>` });
                interaction.update({ components: [], content: `${dbe.get(`6`)} | Avaliação enviada!` });

            }
        }
    }
}