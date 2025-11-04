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
    name: "deletar", 
    description:"deletar",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "ticket",
            description: "Delete todos os tickets do servidor",
            type: Discord.ApplicationCommandOptionType.Subcommand,
        },  
    ],
    
    run: async (client, interaction) => {
        if (interaction.user.id !== dbp.get(`${interaction.user.id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
            return;
        }
        const msgg = await interaction.reply({ content: `${dbe.get(`16`)} | Aguarde um momento...`, ephemeral:true})
        if (db.all().length <= 0) {
            msgg.edit({ content: `${dbe.get(`13`)} | Não tem nenhum ticket aberto!`, ephemeral:true})
            return;
        }
        switch (interaction.options.getSubcommand()) {
            case 'ticket': {
                db.all().map(async(entry) => {
                    const ticketId = entry.data.canal;
                    const tickets = db.get(`${ticketId}`)
                    const usuario = db.get(`${ticketId}.usuario`)
                    const user = interaction.guild.members.cache.get(usuario)
                    const motivo = db.get(`${ticketId}.motivo`)
                    const codigo = db.get(`${ticketId}.codigo`)
                    const logs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                    const assumiu = interaction.guild.members.cache.get(db.get(`${ticketId}.staff`))
                    const channel = interaction.guild.channels.cache.get(ticketId)
                    const user1 = interaction.guild.members.cache.get(interaction.user.id);
                    const roleIdToCheck = dbc.get(`ticket.cargo_staff`);
                  
                    const hasRequiredRole = user1.roles.cache.has(roleIdToCheck);;
                  
                    if (!hasRequiredRole) {
                        await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                        return;
                    }
        
                    channel.edit({
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
                        channel.delete()
                    }, 30000)
                    if(!logs) return console.log("Canal Logs não configurado");
        
                    const file = await createTranscript(channel, {
                        filename: `transcript-${user}.html`
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
                        
                        user.send({
                            embeds:[
                                new Discord.EmbedBuilder()
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
                                    {
                                        name:`${dbe.get(`25`)} | Motivo Ticket`,
                                        value:`\`${motivo}\``,
                                        inline:false
                                    },
                                    {
                                        name:`${dbe.get(`27`)} | Horário do fechamento:`,
                                        value:`<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                        inline:false
                                    }
                                )
                            ],
                        })
                    }
        
                    channel.bulkDelete(99).then(() => {
                        channel.bulkDelete(99).then(() => {
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
        
                            channel.send({ embeds: [embed], components: [row]})
                        })
                    })
                    const rowww = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`${channel.id}_avalia_atendimentoo`)
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
                })
            } 
            break
        
            default:
                break;
        }
    }
}