const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
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
    name: 'interactionCreate',
    run: async (interaction, client) => {
        if(interaction.customId === "sair_ticket"){
            const tickets = await db.get(`${interaction.channel.id}`)
            const user = tickets.usuario
            const painelId = tickets.painel
            if(user !== interaction.user.id){
                interaction.reply({
                    content:`Só quem pode sair é o usuario <@${user}>`,
                    ephemeral:true
                })
                return;
            }

            interaction.channel.edit({
                name:`closed・${interaction.user.username}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: interaction.user.id,
                        deny: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                ],
            });
            const canal = interaction.guild.channels.cache.get(db.get(`${interaction.channel.id}.call`))
            if (canal) {
                canal.delete()
            }
            interaction.reply({
                content:`<@&${dbc.get(`ticket.cargo_staff`)}>`,
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription("O Dono do ticket saiu, clique no botão abaixo para finalizar o ticket")
                    .setColor(dbc.get(`color`))
                ],
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("ticket_finalizar")
                        .setLabel("Finalizar Ticket")
                        .setEmoji(dbc.get(`painel.button.finalizar`))
                        .setStyle(Discord.ButtonStyle.Danger),
                    )
                ]
            })
        }
        if(interaction.customId === "ticket_finalizar"){
            const tickets = db.get(`${interaction.channel.id}`)
            const usuario = db.get(`${interaction.channel.id}.usuario`)
            const user = interaction.guild.members.cache.get(usuario)
            const motivo = db.get(`${interaction.channel.id}.motivo`)
            const codigo = db.get(`${interaction.channel.id}.codigo`)
            const logs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
            const assumiu = interaction.guild.members.cache.get(tickets.staff)
            const painelId = tickets.painel
            const assumiu1 = tickets.staff

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = dbc.get(`ticket.cargo_staff`);
          
            const hasRequiredRole = user1.roles.cache.has(roleIdToCheck);;
          
            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            const buttons = dbt.get(`${painelId}.buttons`)
            const id = Number(tickets.idbutton) - 1
            if (dbt.get(`${painelId}.tipo`) === "button") {
                if (buttons[id].finaliza === "ON" || dbt.get(`${painelId}.modal.finaliza`) === "ON") {
                    const modal = new Discord.ModalBuilder()
                    .setCustomId(`motivo_finaliza_ticket`)
                    .setTitle("DESCREVA O MOTIVO DA FINALIZAÇÃO")
    
                    const text = new Discord.TextInputBuilder()
                    .setCustomId("motivo")
                    .setLabel("Descreva o motivo da finalização do ticket")
                    .setPlaceholder("Digite aqui")
                    .setStyle(1)
                    modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                    
                    await interaction.showModal(modal)
                    return;
                }
            } else {
                const select = dbt.get(`${painelId}.select`)
                const id = Number(tickets.idPainel) - 1
                if (select[id].finaliza === "ON" || dbt.get(`${painelId}.modal.finaliza`) === "ON") {
                    const modal = new Discord.ModalBuilder()
                    .setCustomId(`motivo_finaliza_ticket`)
                    .setTitle("DESCREVA O MOTIVO DA FINALIZAÇÃO")
    
                    const text = new Discord.TextInputBuilder()
                    .setCustomId("motivo")
                    .setLabel("Descreva o motivo da finalização do ticket")
                    .setPlaceholder("Digite aqui")
                    .setStyle(1)
                    modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                    
                    await interaction.showModal(modal)
                    return;
                }
            }

            interaction.channel.edit({
                name:`closed・${user.displayName}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: usuario,
                        deny: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                ],
            });

            setTimeout(() => {
                interaction.channel.delete()
            }, 30000)
            const canal = interaction.guild.channels.cache.get(db.get(`${interaction.channel.id}.call`))
            if (canal) {
                canal.delete()
            }
            const file = await createTranscript(interaction.channel, {
                filename: `transcript-${interaction.user}.html`
            })
            const msg = await logs.send({ files: [file] })
            if (logs) {
                logs.send({
                    embeds:[
                        new Discord.EmbedBuilder()
                        .setTitle(`${dbe.get(`33`)} Sistema de Logs`)
                        .setDescription(`${dbe.get(`29`)} Usuário que abriu:\n> ${user}\n${dbe.get(`29`)} Usuário que fechou:\n> ${interaction.user}\n${dbe.get(`29`)} Quem assumiu:\n> ${assumiu ?? `Ninguem Assumiu`}\n\n${dbe.get(`25`)} Código do Ticket:\n\`${codigo}\`\n${dbe.get(`27`)} Horário de abertura:\n<t:${tickets.horario1}:f> <t:${tickets.horario2}:R>\n${dbe.get(`27`)} Horário do fechamento:\n<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`)
                        .setFooter({ text: `Veja as logs do ticket clicando no botão abaixo.`})
                    ],
                    components:[
                        new Discord.ActionRowBuilder()
                          .addComponents(
                              new Discord.ButtonBuilder()
                              .setLabel("Abrir Logs")
                              .setEmoji("<:1166960895201656852:1239447582464282674>")
                              .setStyle(1)
                              .setCustomId(`${interaction.channel.id}_logsTicket`)
                          )
                      ]
                })
                
            }
            

            if (user) {
                const embed = new EmbedBuilder()
                .setTitle(`${dbe.get(`1`)} | SEU TICKET FOI FECHADO`)
                .setColor("Random")
                if (tickets.motivo === "Não Escrito") {
                    embed.addFields(
                        {
                            name:`${dbe.get(`32`)} | Ticket aberto por:`,
                            value:`${user}`,
                            inline:false
                        },
                        {
                            name:`${dbe.get(`13`)} | Fechado por:`,
                            value:`${interaction.user}`,
                            inline:false
                        },
                        {
                            name:`${dbe.get(`24`)} | Quem Assumiu:`,
                            value:`${assumiu ?? `Ninguem Assumiu`}`,
                            inline:false
                        },
                    )
                } else {
                    embed.addFields(
                        {
                            name:`${dbe.get(`32`)} | Ticket aberto por:`,
                            value:`${user}`,
                            inline:false
                        },
                        {
                            name:`${dbe.get(`13`)} | Fechado por:`,
                            value:`${interaction.user}`,
                            inline:false
                        },
                        {
                            name:`${dbe.get(`24`)} | Quem Assumiu:`,
                            value:`${assumiu ?? `Ninguem Assumiu`}`,
                            inline:false
                        },
                        {
                            name:`${dbe.get(`25`)} | Motivo Ticket`,
                            value:`\`${motivo}\``,
                            inline:false
                        },
                    )
                }
                const buttons = dbt.get(`${painelId}.buttons`)
                const id = Number(tickets.idbutton) - 1

                if (buttons[id].finaliza === "ON" || dbt.get(`${painelId}.modal.finaliza`) === "ON") {
                    embed.addFields(
                        {
                            name:`${dbe.get(`25`)} | Motivo Finalização`,
                            value:`\`${motivo}\``,
                            inline:false
                        },
                    )
                }

                embed.addFields(
                    {
                        name:`${dbe.get(`27`)} | Horário do fechamento:`,
                        value:`<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                        inline:false
                    }
                )
                user.send({
                    embeds:[embed],
                })
            }

            interaction.channel.bulkDelete(99).then(() => {
                interaction.channel.bulkDelete(99).then(() => {
                    const embed = new EmbedBuilder()
                    .setColor(dbc.get(`color`))
                    .setTitle(`🎉 | O Ticket foi finalizado!`)
                    .setFields(
                        {
                            name: `${dbe.get(`24`)} Staff que fechou:`,
                            value: `${interaction.user} - ${interaction.user.id}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`32`)} Usuário que abriu:`,
                            value: `${user} - ${user.id}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`1`)} Informações:`,
                            value: `Caso queira ver as logs do ticket clique no botão abaixo para conferir.`,
                            inline: false
                        }
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(5)
                        .setLabel(`Ir para às LOGS`)
                        .setURL(`${interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`)).url}`)
                    )

                    interaction.channel.send({ embeds: [embed], components: [row]})
                })
            })
            const rowww = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`${interaction.channel.id}_avalia_atendimentoo`)
                .setLabel(`Avaliar Atendimento`)
                .setEmoji(dbe.get(`28`))
            )
            if (user) {
                user.send({ components: [rowww]}).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000 * 60 * 5);
                })
            }
        }
        if(interaction.isModalSubmit() && interaction.customId === "motivo_finaliza_ticket"){
            const tickets = db.get(`${interaction.channel.id}`)
            const usuario = db.get(`${interaction.channel.id}.usuario`)
            const motivof = interaction.fields.getTextInputValue("motivo");
            const user = interaction.guild.members.cache.get(usuario)
            const motivo = db.get(`${interaction.channel.id}.motivo`)
            const codigo = db.get(`${interaction.channel.id}.codigo`)
            const logs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
            const assumiu = interaction.guild.members.cache.get(tickets.staff)
            const painelId = tickets.painel
            const assumiu1 = tickets.staff

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = dbc.get(`ticket.cargo_staff`);
          
            const hasRequiredRole = user1.roles.cache.has(roleIdToCheck);;
          
            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            interaction.reply(`Fechando`)
            interaction.channel.edit({
                name:`closed・${user.displayName}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: usuario,
                        deny: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                        ],
                    },
                ],
            });

            setTimeout(() => {
                interaction.channel.delete()
            }, 30000)


            if (logs) {
                logs.send({
                    embeds:[
                        new Discord.EmbedBuilder()
                        .setTitle(`${dbe.get(`33`)} Sistema de Logs`)
                        .setDescription(`${dbe.get(`29`)} Usuário que abriu:\n> ${user}\n${dbe.get(`29`)} Usuário que fechou:\n> ${interaction.user}\n${dbe.get(`29`)} Quem assumiu:\n> ${assumiu ?? `Ninguem Assumiu`}\n\n${dbe.get(`25`)} Código do Ticket:\n\`${codigo}\`\n${dbe.get(`1`)} Motivo do Fechamento:\n\`${motivof}\`\n${dbe.get(`27`)} Horário de abertura:\n<t:${tickets.horario1}:f> <t:${tickets.horario2}:R>\n${dbe.get(`27`)} Horário do fechamento:\n<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`)
                        .setFooter({ text: `Veja as logs do ticket clicando no botão abaixo.`})
                    ],
                    components:[
                      new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                            .setLabel("Abrir Logs")
                            .setEmoji("<:1166960895201656852:1239447582464282674>")
                            .setStyle(1)
                            .setCustomId(`${interaction.channel.id}_logsTicket`)
                        )
                    ]
                })
            }
            
            

            if (user) {
                const embed = new EmbedBuilder()
                .setTitle(`${dbe.get(`1`)} | SEU TICKET FOI FECHADO`)
                .addFields(
                    {
                        name:`${dbe.get(`32`)} | Ticket aberto por:`,
                        value:`${user}`,
                        inline:false
                    },
                    {
                        name:`${dbe.get(`13`)} | Fechado por:`,
                        value:`${interaction.user}`,
                        inline:false
                    },
                    {
                        name:`${dbe.get(`24`)} | Quem Assumiu:`,
                        value:`${assumiu ?? `Ninguem Assumiu`}`,
                        inline:false
                    },
                )
                .setColor("Random")

                if (tickets.motivo === "Não Escrito") {
                } else {
                    embed.addFields(
                        {
                            name:`${dbe.get(`25`)} | Motivo Ticket`,
                            value:`\`${motivo}\``,
                            inline:false
                        },
                    )
                }

                const buttons = dbt.get(`${painelId}.buttons`)
                const id = Number(tickets.idbutton) - 1
                if (dbt.get(`${painelId}.tipo`) === "button") {
                    if (buttons[id].finaliza === "ON" || dbt.get(`${painelId}.modal.finaliza`) === "ON") {
                        embed.addFields(
                            {
                                name:`${dbe.get(`2`)} | Motivo da Finalização`,
                                value:`\`${motivof}\``,
                                inline:false
                            },
                        )
                    }
                } else {
                    if (dbt.get(`${painelId}.modal.finaliza`) === "ON") {
                        embed.addFields(
                            {
                                name:`${dbe.get(`2`)} | Motivo da Finalização`,
                                value:`\`${motivof}\``,
                                inline:false
                            },
                        )
                    }
                }

                embed.addFields(
                    {
                        name:`${dbe.get(`27`)} | Horário do fechamento:`,
                        value:`<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                        inline:false
                    }
                )
                user.send({
                    embeds:[embed],
                })
            }

            interaction.channel.bulkDelete(99).then(() => {
                interaction.channel.bulkDelete(99).then(() => {
                    const embed = new EmbedBuilder()
                    .setColor(dbc.get(`color`))
                    .setTitle(`🎉 | O Ticket foi finalizado!`)
                    .setFields(
                        {
                            name: `${dbe.get(`24`)} Staff que fechou:`,
                            value: `${interaction.user} - ${interaction.user.id}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`32`)} Usuário que abriu:`,
                            value: `${user} - ${user.id}`,
                            inline: false
                        },
                        {
                            name: `${dbe.get(`1`)} Informações:`,
                            value: `Caso queira ver as logs do ticket clique no botão abaixo para conferir.`,
                            inline: false
                        }
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(5)
                        .setLabel(`Ir para às LOGS`)
                        .setURL(`${interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`)).url}`)
                    )

                    interaction.channel.send({ embeds: [embed], components: [row]})
                })
            })
            const rowww = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`${interaction.channel.id}_avalia_atendimentoo`)
                .setLabel(`Avaliar Atendimento`)
                .setEmoji(dbe.get(`28`))
            )
            if (user) {
                user.send({ components: [rowww]}).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000 * 60 * 5);
                })
            }
        }
    }
}