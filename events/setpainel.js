const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")
module.exports = {
    name: "interactionCreate",
    run: async (interaction, client) => {
        if (interaction.isStringSelectMenu() && interaction.customId === "select-set-painel") {
            const option = interaction.values[0]

            if (option === dbt.get(`${option}.idpainel`)) {
                if (dbt.get(`${option}.tipo`) === "button") {
                    const embed = new EmbedBuilder()
                    .setTitle(`${dbt.get(`${option}.title`)}`)
                    .setDescription(`${dbt.get(`${option}.desc`)}`)
                    .setColor(dbc.get(`color`) || "Default")

                    if (dbt.get(`${option}.banner`)) {
                        embed.setImage(dbt.get(`${option}.banner`))
                    }
                    if (dbt.get(`${option}.thumb`)) {
                        embed.setThumbnail(dbt.get(`${option}.thumb`))
                    }
        
                    const row = new ActionRowBuilder()
                    dbt.get(`${option}.buttons`).map(entry => {
                        row.addComponents(
                            new ButtonBuilder()
                            .setCustomId(`${entry.id}_${option}`)
                            .setEmoji(entry.emoji)
                            .setLabel(entry.text)
                            .setStyle(entry.style)
                        )
                    })


                    if (dbt.get(`${option}.modomsg`) === "ON") {
                        let options = {
                            content: dbt.get(`${option}.desc`),
                            components: [row]
                        }
                        if (dbt.get(`${option}.banner`)) {
                            options.files = [dbt.get(`${option}.banner`)]
                        }
                        interaction.channel.send(options).then(msg => {
                            dbt.set(`${option}.idmsg`, msg.id)
                            dbt.set(`${option}.idcanal`, interaction.channel.id)
                            interaction.reply({ content: `${dbe.get(`6`)} | Mensagem enviada com sucesso!`, ephemeral:true})
                        }).catch(() => {
                            interaction.reply({ content: `${dbe.get(`13`)} | Ocorreu um erro ao enviar a mensagem!`, ephemeral:true})
                        })
                    } else {
                        interaction.channel.send({ embeds: [embed], components: [row]}).then(msg => {
                            dbt.set(`${option}.idmsg`, msg.id)
                            dbt.set(`${option}.idcanal`, interaction.channel.id)
                            interaction.reply({ content: `${dbe.get(`6`)} | Mensagem enviada com sucesso!`, ephemeral:true})
                        }).catch(() => {
                            interaction.reply({ content: `${dbe.get(`13`)} | Ocorreu um erro ao enviar a mensagem!`, ephemeral:true})
                        })
                    }
                }
                if (dbt.get(`${option}.tipo`) === "select") {
                    const embed = new EmbedBuilder()
                    .setTitle(`${dbt.get(`${option}.title`)}`)
                    .setDescription(`${dbt.get(`${option}.desc`)}`)
                    .setColor(dbc.get(`color`) || "Default")

                    if (dbt.get(`${option}.banner`)) {
                        embed.setImage(dbt.get(`${option}.banner`))
                    }
                    if (dbt.get(`${option}.thumb`)) {
                        embed.setThumbnail(dbt.get(`${option}.thumb`))
                    }
        
                    const actionrowselect = new StringSelectMenuBuilder()
                    .setCustomId('select_ticket')
                    .setPlaceholder(dbt.get(`${option}.placeholder`) || "")
                    
                    const paineis = dbt.get(`${option}.select`);

                    const selectOptions = paineis.map(painel => ({
                        label: painel.text,
                        description: painel.desc,
                        value: `${option}_${painel.id}`,
                        emoji: painel.emoji
                    }));
                    actionrowselect.addOptions(selectOptions);
            
                    const row = new ActionRowBuilder()
                    .addComponents(actionrowselect)

                    if (dbt.get(`${option}.modomsg`) === "ON") {
                        let options = {
                            content: dbt.get(`${option}.desc`),
                            components: [row]
                        }
                        if (dbt.get(`${option}.banner`)) {
                            options.files = [dbt.get(`${option}.banner`)]
                        }
                        interaction.channel.send(options).then(msg => {
                            dbt.set(`${option}.idmsg`, msg.id)
                            dbt.set(`${option}.idcanal`, interaction.channel.id)
                            interaction.reply({ content: `${dbe.get(`6`)} | Mensagem enviada com sucesso!`, ephemeral:true})
                        }).catch(() => {
                            interaction.reply({ content: `${dbe.get(`13`)} | Ocorreu um erro ao enviar a mensagem!`, ephemeral:true})
                        })
                    } else {
                        interaction.channel.send({ embeds: [embed], components: [row]}).then(msg => {
                            dbt.set(`${option}.idmsg`, msg.id)
                            dbt.set(`${option}.idcanal`, interaction.channel.id)                            
                            interaction.reply({ content: `${dbe.get(`6`)} | Mensagem enviada com sucesso!`, ephemeral:true})
                        }).catch(() => {
                            interaction.reply({ content: `${dbe.get(`13`)} | Ocorreu um erro ao enviar a mensagem!`, ephemeral:true})
                        })
                    }
                }
            }
        }
    }
}