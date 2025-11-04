const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")
module.exports = {
    name: "interactionCreate",
    run: async (interaction, client) => {

        if (interaction.customId === "configsugestsistem") {
            let sistema = "\`🔴 Desligado\`"
            if (dbc.get(`sugest.sistema`) === "ON") {
                sistema = "\`🟢 Ligado\`"
            }
            const channel = interaction.guild.channels.cache.get(dbc.get(`sugest.channel`))
            const embed = new EmbedBuilder()
            .setColor(dbc.get(`color`) || "Default")
            .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Sistema ON/OFF:`,
                    value: `${sistema}`,
                    inline:true
                },
                {
                    name: `Emojis Atuais:`,
                    value: `Emoji Concordo: ${dbc.get(`sugest.certo`)}. Emoji Discordo: ${dbc.get(`sugest.errado`)}.`,
                    inline:true
                },
                {
                    name: `Atual Canal de Sugestão:`,
                    value: `${channel || "`Não Definido`"}`
                }
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(dbc.get(`sugest.sistema`) === "ON" ? 3 : 4)
                    .setCustomId(`sugestonoff`)
                    .setLabel(dbc.get(`sugest.sistema`) === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                    .setEmoji(dbc.get(`sugest.sistema`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudaemojicerto`)
                    .setLabel(`Mudar Emoji Concordo`)
                    .setEmoji(dbc.get(`sugest.certo`)),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudaemojidiscordo`)
                    .setLabel(`Mudar Emoji Discordo`)
                    .setEmoji(dbc.get(`sugest.errado`)),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudachannel`)
                    .setLabel(`Mudar Canal`)
                    .setEmoji("<:comentario:1245612394634543134>"),
                new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji('<:emoji_6:1239445960447361085>')
            )

            interaction.update({ embeds: [embed], components: [row]})
        }

        if (interaction.customId === "sugestonoff") {
            if (dbc.get(`sugest.sistema`) === "ON") {
                dbc.set(`sugest.sistema`, "OFF")
            } else {
                dbc.set(`sugest.sistema`, "ON")
            }
            let sistema = "\`🔴 Desligado\`"
            if (dbc.get(`sugest.sistema`) === "ON") {
                sistema = "\`🟢 Ligado\`"
            }
            const channel = interaction.guild.channels.cache.get(dbc.get(`sugest.channel`))
            const embed = new EmbedBuilder()
            .setColor(dbc.get(`color`) || "Default")
            .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Sistema ON/OFF:`,
                    value: `${sistema}`,
                    inline:true
                },
                {
                    name: `Emojis Atuais:`,
                    value: `Emoji Concordo: ${dbc.get(`sugest.certo`)}. Emoji Discordo: ${dbc.get(`sugest.errado`)}.`,
                    inline:true
                },
                {
                    name: `Atual Canal de Sugestão:`,
                    value: `${channel || "`Não Definido`"}`
                }
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(dbc.get(`sugest.sistema`) === "ON" ? 3 : 4)
                    .setCustomId(`sugestonoff`)
                    .setLabel(dbc.get(`sugest.sistema`) === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                    .setEmoji(dbc.get(`sugest.sistema`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudaemojicerto`)
                    .setLabel(`Mudar Emoji Concordo`)
                    .setEmoji(dbc.get(`sugest.certo`)),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudaemojidiscordo`)
                    .setLabel(`Mudar Emoji Discordo`)
                    .setEmoji(dbc.get(`sugest.errado`)),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`sugestmudachannel`)
                    .setLabel(`Mudar Canal`)
                    .setEmoji("<:comentario:1245612394634543134>"),
                new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji('<:emoji_6:1239445960447361085>')
            )

            interaction.update({ embeds: [embed], components: [row]})
        }
        if (interaction.customId === "sugestmudachannel") {
            const select = new ActionRowBuilder()
            .addComponents(
                new Discord.ChannelSelectMenuBuilder()
                .setChannelTypes(Discord.ChannelType.GuildText)
                .setCustomId(`channel_select_sugest`)
                .setMaxValues(1)
                .setPlaceholder(`Selecione um canal...`),
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`configsugestsistem`)
                .setEmoji(dbe.get(`29`))
            )
            interaction.update({ embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione o canal que será definido como o canal de sugestão.`)
                .setColor(dbc.get(`color`) || "Default")
            ], components: [select, row]})
        }
        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_select_sugest") {
            const cargos = interaction.values
            cargos.map((cargos) => { 
                dbc.set(`sugest.channel`, cargos)
                let sistema = "\`🔴 Desligado\`"
                if (dbc.get(`sugest.sistema`) === "ON") {
                    sistema = "\`🟢 Ligado\`"
                }
                const channel = interaction.guild.channels.cache.get(dbc.get(`sugest.channel`))
                const embed = new EmbedBuilder()
                .setColor(dbc.get(`color`) || "Default")
                .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .addFields(
                    {
                        name: `Sistema ON/OFF:`,
                        value: `${sistema}`,
                        inline:true
                    },
                    {
                        name: `Emojis Atuais:`,
                        value: `Emoji Concordo: ${dbc.get(`sugest.certo`)}. Emoji Discordo: ${dbc.get(`sugest.errado`)}.`,
                        inline:true
                    },
                    {
                        name: `Atual Canal de Sugestão:`,
                        value: `${channel || "`Não Definido`"}`
                    }
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(dbc.get(`sugest.sistema`) === "ON" ? 3 : 4)
                        .setCustomId(`sugestonoff`)
                        .setLabel(dbc.get(`sugest.sistema`) === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                        .setEmoji(dbc.get(`sugest.sistema`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`sugestmudaemojicerto`)
                        .setLabel(`Mudar Emoji Concordo`)
                        .setEmoji(dbc.get(`sugest.certo`)),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`sugestmudaemojidiscordo`)
                        .setLabel(`Mudar Emoji Discordo`)
                        .setEmoji(dbc.get(`sugest.errado`)),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`sugestmudachannel`)
                        .setLabel(`Mudar Canal`)
                        .setEmoji("<:comentario:1245612394634543134>"),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltarconfig`)
                        .setLabel(`Voltar`)
                        .setEmoji('<:emoji_6:1239445960447361085>')
                )
    
                interaction.update({ embeds: [embed], components: [row]})
            })
        }
        if (interaction.customId === "sugestmudaemojidiscordo") {
            interaction.deferUpdate()
            interaction.channel.send(`${dbe.get(`16`)} | Envie um emoji aqui no chat...`).then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = interaction.message.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", message => {
                    message.delete()
                    const newt = message.content

                    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

                    if (emojiRegex.test(newt)) {
                        dbc.set(`sugest.errado`, newt)
                        msg.edit({content: `${dbe.get(`6`)} | Emoji trocado com sucesso!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    } else if (newt.startsWith("<")) {
                        dbc.set(`sugest.errado`, newt)
                        msg.edit({content: `${dbe.get(`6`)} | Emoji trocado com sucesso!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    } else {
                        msg.edit({content: `${dbe.get(`13`)} | Mande um emoji válido!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    }

                    let sistema = "\`🔴 Desligado\`"
                    if (dbc.get(`sugest.sistema`) === "ON") {
                        sistema = "\`🟢 Ligado\`"
                    }
                    const channel = interaction.guild.channels.cache.get(dbc.get(`sugest.channel`))
                    const embed = new EmbedBuilder()
                    .setColor(dbc.get(`color`) || "Default")
                    .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .addFields(
                        {
                            name: `Sistema ON/OFF:`,
                            value: `${sistema}`,
                            inline:true
                        },
                        {
                            name: `Emojis Atuais:`,
                            value: `Emoji Concordo: ${dbc.get(`sugest.certo`)}. Emoji Discordo: ${dbc.get(`sugest.errado`)}.`,
                            inline:true
                        },
                        {
                            name: `Atual Canal de Sugestão:`,
                            value: `${channel || "`Não Definido`"}`
                        }
                    )
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(dbc.get(`sugest.sistema`) === "ON" ? 3 : 4)
                            .setCustomId(`sugestonoff`)
                            .setLabel(dbc.get(`sugest.sistema`) === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(dbc.get(`sugest.sistema`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudaemojicerto`)
                            .setLabel(`Mudar Emoji Concordo`)
                            .setEmoji(dbc.get(`sugest.certo`)),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudaemojidiscordo`)
                            .setLabel(`Mudar Emoji Discordo`)
                            .setEmoji(dbc.get(`sugest.errado`)),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudachannel`)
                            .setLabel(`Mudar Canal`)
                            .setEmoji("<:comentario:1245612394634543134>"),
                        new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`voltarconfig`)
                            .setLabel(`Voltar`)
                            .setEmoji('<:emoji_6:1239445960447361085>')
                    )
        
                    interaction.message.edit({ embeds: [embed], components: [row]})
                })
            })
        }

        if (interaction.customId === "sugestmudaemojicerto") {
            interaction.deferUpdate()
            interaction.channel.send(`${dbe.get(`16`)} | Envie um emoji aqui no chat...`).then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = interaction.message.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", message => {
                    message.delete()
                    const newt = message.content

                    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

                    if (emojiRegex.test(newt)) {
                        dbc.set(`sugest.certo`, newt)
                        msg.edit({content: `${dbe.get(`6`)} | Emoji trocado com sucesso!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    } else if (newt.startsWith("<")) {
                        dbc.set(`sugest.certo`, newt)
                        msg.edit({content: `${dbe.get(`6`)} | Emoji trocado com sucesso!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    } else {
                        msg.edit({content: `${dbe.get(`13`)} | Mande um emoji válido!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                    }

                    let sistema = "\`🔴 Desligado\`"
                    if (dbc.get(`sugest.sistema`) === "ON") {
                        sistema = "\`🟢 Ligado\`"
                    }
                    const channel = interaction.guild.channels.cache.get(dbc.get(`sugest.channel`))
                    const embed = new EmbedBuilder()
                    .setColor(dbc.get(`color`) || "Default")
                    .setAuthor({ name: `Configurando Sistema Sugestão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .addFields(
                        {
                            name: `Sistema ON/OFF:`,
                            value: `${sistema}`,
                            inline:true
                        },
                        {
                            name: `Emojis Atuais:`,
                            value: `Emoji Concordo: ${dbc.get(`sugest.certo`)}. Emoji Discordo: ${dbc.get(`sugest.errado`)}.`,
                            inline:true
                        },
                        {
                            name: `Atual Canal de Sugestão:`,
                            value: `${channel || "`Não Definido`"}`
                        }
                    )
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(dbc.get(`sugest.sistema`) === "ON" ? 3 : 4)
                            .setCustomId(`sugestonoff`)
                            .setLabel(dbc.get(`sugest.sistema`) === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(dbc.get(`sugest.sistema`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudaemojicerto`)
                            .setLabel(`Mudar Emoji Concordo`)
                            .setEmoji(dbc.get(`sugest.certo`)),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudaemojidiscordo`)
                            .setLabel(`Mudar Emoji Discordo`)
                            .setEmoji(dbc.get(`sugest.errado`)),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`sugestmudachannel`)
                            .setLabel(`Mudar Canal`)
                            .setEmoji("<:comentario:1245612394634543134>"),
                        new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`voltarconfig`)
                            .setLabel(`Voltar`)
                            .setEmoji('<:emoji_6:1239445960447361085>')
                    )
        
                    interaction.message.edit({ embeds: [embed], components: [row]})
                })
            })
        }

        if (interaction.customId === "configticket") {
            const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
            const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
            const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
            const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))

            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
            .setColor(dbc.get(`color`) || "Default")
            .addFields(
                {
                    name: `Canal de Logs:`,
                    value: `${channellogs || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Canal de Avaliação`,
                    value: `${channelavalia || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Categoria Padrão Ticket`,
                    value: `${categoria || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Cargo Staff`,
                    value: `${cargostaff || "\`Não Definido\`"}`,
                    inline:true
                }
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configlogs`)
                .setLabel(`Canal de Logs`)
                .setEmoji(`<:lupa:1237266965974880257>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configavaliacao`)
                .setLabel(`Canal de Avaliação`)
                .setEmoji(`<:emoji_51:1242968988171112498>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configpainel`)
                .setLabel(`Painel Ticket`)
                .setEmoji(`<:emoji_52:1242969865686487171>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`cargostaff`)
                .setLabel(`Cargo Staff`)
                .setEmoji(`<:suportee:1225478087660273826>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configcategoria`)
                .setLabel(`Categoria Padrão`)
                .setEmoji(`<:emoji_4:1239445904826695750>`),
            )

            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfig`)
                .setEmoji("<:emoji_6:1239445960447361085>")
            )
            interaction.update({
                embeds: [embed],
                components: [row, row2]
            })
        }

        if (interaction.customId === "voltarconfigchannel") {
            const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
            const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
            const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
            const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))

            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
            .setColor(dbc.get(`color`) || "Default")
            .addFields(
                {
                    name: `Canal de Logs:`,
                    value: `${channellogs || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Canal de Avaliação`,
                    value: `${channelavalia || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Categoria Padrão Ticket`,
                    value: `${categoria || "\`Não Definido\`"}`,
                    inline:true
                },
                {
                    name: `Cargo Staff`,
                    value: `${cargostaff || "\`Não Definido\`"}`,
                    inline:true
                }
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configlogs`)
                .setLabel(`Canal de Logs`)
                .setEmoji(`<:lupa:1237266965974880257>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configavaliacao`)
                .setLabel(`Canal de Avaliação`)
                .setEmoji(`<:emoji_51:1242968988171112498>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configpainel`)
                .setLabel(`Painel Ticket`)
                .setEmoji(`<:emoji_52:1242969865686487171>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`cargostaff`)
                .setLabel(`Cargo Staff`)
                .setEmoji(`<:suportee:1225478087660273826>`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configcategoria`)
                .setLabel(`Categoria Padrão`)
                .setEmoji(`<:emoji_4:1239445904826695750>`),
            )

            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfig`)
                .setEmoji("<:emoji_6:1239445960447361085>")
            )
            interaction.update({
                embeds: [embed],
                components: [row, row2]
            })
        }


        if (interaction.isButton()) {
            const option = interaction.customId;

            if (option === "configpainel") {
                const paineldaitro = new EmbedBuilder()
                .setAuthor({ name: `Configurando Painel Ticket`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .addFields(
                    {
                        name: `Veja as variáveis para você inserir na mensagem:`,
                        value: `\nMencionar quem abriu ticket: **{user}**\nExibir Codigo do Ticket: **{codigo}**\nMostrar quem Assumiu Ticket: **{assumido}**\nMostra o motivo do ticket: **{motivo}**\nMostra a descrição do ticket: **{desc}**\nMostra os horários do ticket: **{horario1}** e **{horario2}** **Ex:** [Horario 1](https://media.discordapp.net/attachments/1239421940624658543/1242999434695151686/image.png?ex=664fe0ef&is=664e8f6f&hm=dce9cee145702f6140bd769a9d76a90b90ac3f317674004f797d18bc6ea15b52&=&format=webp&quality=lossless&width=135&height=14), [Horario 2](https://media.discordapp.net/attachments/1239421940624658543/1242999423198302228/image.png?ex=664fe0ec&is=664e8f6c&hm=cf08c6111e0472d19f6dca06715e18bea3ddf720174077458a38552793a6ffff&=&format=webp&quality=lossless&width=56&height=12)`,
                        inline:false
                    },
                    {
                        name: `Mensagem do Painel Atual`,
                        value: `\n${dbc.get(`painel.desc`)}`,
                        inline:false
                    }
                )
                .setColor(dbc.get(`color`))

                const rogerio = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`alterarmensagem_painel`)
                            .setLabel(`Alterar Mensagem`)
                            .setEmoji("<:copy7:1225478184330596575>"),
                        new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`alterarimg_painel`)
                            .setLabel(`Alterar Imagens`)
                            .setEmoji("<:emoji_51:1242969823206441010>"),
                        new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`reset_msg_painel`)
                            .setLabel(`Resetar`)
                            .setEmoji("<a:load:1241739159375188099>"),
                        new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`voltarconfigchannel`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>"),
                    )

                interaction.update({ embeds: [paineldaitro], components: [rogerio] })

            }


            
            if (option === "configlogs") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.ChannelSelectMenuBuilder()
                    .setChannelTypes(Discord.ChannelType.GuildText)
                    .setCustomId(`channel_select_logs`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um canal...`),
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setEmoji(dbe.get(`29`))
                )
                interaction.update({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Selecione o canal que será definido como o canal de logs.`)
                    .setColor(dbc.get(`color`) || "Default")
                ], components: [select, row]})
            }
            if (option === "configavaliacao") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.ChannelSelectMenuBuilder()
                    .setChannelTypes(Discord.ChannelType.GuildText)
                    .setCustomId(`channel_select_avalia`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um canal...`),
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setEmoji(dbe.get(`29`))
                )
                interaction.update({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Selecione o canal que será definido como o canal de avaliação.`)
                    .setColor(dbc.get(`color`) || "Default")
                ], components: [select, row]})
            }

            if (option === "cargostaff") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.RoleSelectMenuBuilder()
                    .setCustomId(`role_select_staff`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um cargo...`),
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setEmoji(dbe.get(`29`))
                )
                interaction.update({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Selecione o cargo que será definido como o cargo staff.`)
                    .setColor(dbc.get(`color`) || "Default")
                ], components: [select, row]})
            }

            if (option === "configcategoria") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.ChannelSelectMenuBuilder()
                    .setChannelTypes(Discord.ChannelType.GuildCategory)
                    .setCustomId(`channel_select_category`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione uma categoria...`),
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setEmoji(dbe.get(`29`))
                )
                interaction.update({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Selecione a categoria que será definido como a categoria padrão aonde os tickets serão abertos.`)
                    .setColor(dbc.get(`color`) || "Default")
                ], components: [select, row]})
            }

        }

        if (interaction.customId === "reset_msg_painel") {
            const msg_resetada = ":bell: | Olá {user}! **Seja bem-vindo(a) ao seu ticket.**\n\n:zap: | Os **TICKETS** são totalmente privados, apenas membros da STAFF possuem acesso a este canal.\n\n:rotating_light: | Evite **MARCAÇÕES.** Aguarde até que um **STAFF** te atenda.\n\n:man_police_officer: | Staff que assumiu o ticket {assumido}\n:envelope_with_arrow: | Motivo do Ticket: __**{motivo}**__"
            dbc.set(`painel.desc`,  msg_resetada)

            interaction.reply({content: `${dbe.get(`6`)} | Mensagem resetada com sucesso!`, ephemeral:true})
            const paineldaitro = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Veja as variáveis para você inserir na mensagem:`,
                    value: `\nMencionar quem abriu ticket: **{user}**\nExibir Codigo do Ticket: **{codigo}**\nMostrar quem Assumiu Ticket: **{assumido}**\nMostra o motivo do ticket: **{motivo}**\nMostra a descrição do ticket: **{desc}**\nMostra os horários do ticket: **{horario1}** e **{horario2}** **Ex:** [Horario 1](https://media.discordapp.net/attachments/1239421940624658543/1242999434695151686/image.png?ex=664fe0ef&is=664e8f6f&hm=dce9cee145702f6140bd769a9d76a90b90ac3f317674004f797d18bc6ea15b52&=&format=webp&quality=lossless&width=135&height=14), [Horario 2](https://media.discordapp.net/attachments/1239421940624658543/1242999423198302228/image.png?ex=664fe0ec&is=664e8f6c&hm=cf08c6111e0472d19f6dca06715e18bea3ddf720174077458a38552793a6ffff&=&format=webp&quality=lossless&width=56&height=12)`,
                    inline:false
                },
                {
                    name: `Mensagem do Painel Atual`,
                    value: `\n${dbc.get(`painel.desc`)}`,
                    inline:false
                }
            )
            .setColor(dbc.get(`color`))

            const rogerio = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarmensagem_painel`)
                    .setLabel(`Alterar Mensagem`)
                    .setEmoji("<:copy7:1225478184330596575>"),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarimg_painel`)
                    .setLabel(`Alterar Imagens`)
                    .setEmoji("<:emoji_51:1242969823206441010>"),
                new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`reset_msg_painel`)
                    .setLabel(`Resetar`)
                    .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.message.edit({ embeds: [paineldaitro], components: [rogerio] })
        }

        if (interaction.customId === "alterarmensagem_painel"){
            const modal = new ModalBuilder().setCustomId("alterar_painel_msg").setTitle("Alterar Painel")

            const text = new TextInputBuilder()
            .setCustomId("text_modal")
            .setLabel("Edite a mensagem painel")
            .setPlaceholder("Digite aqui ✏")
            .setStyle(2)
            .setValue(`${dbc.get(`painel.desc`)}`)

            modal.addComponents(new ActionRowBuilder().addComponents(text))
            
            interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "alterar_painel_msg") {
            const text = interaction.fields.getTextInputValue("text_modal");

            dbc.set(`painel.desc`, text);

            interaction.reply({
                content:`${dbe.get(`6`)} | Painel alterado com sucesso!`,
                ephemeral:true
            })
            const paineldaitro = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Veja as variáveis para você inserir na mensagem:`,
                    value: `\nMencionar quem abriu ticket: **{user}**\nExibir Codigo do Ticket: **{codigo}**\nMostrar quem Assumiu Ticket: **{assumido}**\nMostra o motivo do ticket: **{motivo}**\nMostra a descrição do ticket: **{desc}**\nMostra os horários do ticket: **{horario1}** e **{horario2}** **Ex:** [Horario 1](https://media.discordapp.net/attachments/1239421940624658543/1242999434695151686/image.png?ex=664fe0ef&is=664e8f6f&hm=dce9cee145702f6140bd769a9d76a90b90ac3f317674004f797d18bc6ea15b52&=&format=webp&quality=lossless&width=135&height=14), [Horario 2](https://media.discordapp.net/attachments/1239421940624658543/1242999423198302228/image.png?ex=664fe0ec&is=664e8f6c&hm=cf08c6111e0472d19f6dca06715e18bea3ddf720174077458a38552793a6ffff&=&format=webp&quality=lossless&width=56&height=12)`,
                    inline:false
                },
                {
                    name: `Mensagem do Painel Atual`,
                    value: `\n${dbc.get(`painel.desc`)}`,
                    inline:false
                }
            )
            .setColor(dbc.get(`color`))

            const rogerio = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarmensagem_painel`)
                    .setLabel(`Alterar Mensagem`)
                    .setEmoji("<:copy7:1225478184330596575>"),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarimg_painel`)
                    .setLabel(`Alterar Imagens`)
                    .setEmoji("<:emoji_51:1242969823206441010>"),
                new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`reset_msg_painel`)
                    .setLabel(`Resetar`)
                    .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.message.edit({ embeds: [paineldaitro], components: [rogerio] })
        }

        if (interaction.customId === "alterarimg_painel") {
            let banner;
            let thumb;
            if (dbc.get(`painel.banner`)) {
                banner = `[Clique aqui para ver](${dbc.get(`painel.banner`)})`
            } else {
                banner = "`Não Definido`"
            }
            if (dbc.get(`painel.thumb`)) {
                thumb = `[Clique aqui para ver](${dbc.get(`painel.thumb`)})`
            } else {
                thumb = "`Não Definido`"
            }
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket (Imagens)`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Banner:`,
                    value: `${banner}`,
                    inline:true
                },
                {
                    name: `Thumbnail:`,
                    value: `${thumb}`,
                    inline:true
                }
            )
            .setColor(dbc.get(`color`))

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_banner`)
                .setLabel(`Alterar Banner`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_thumb`)
                .setLabel(`Alterar Thumbnail`),
                new ButtonBuilder()
                .setStyle(4)
                .setCustomId(`reset_painel_img`)
                .setLabel(`Resetar`)
                .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfigpainel`)
                .setLabel(`Voltar`)
                .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.update({ embeds: [embed], components: [row]})
        }
        if (interaction.customId === "alterarimg_banner"){
            const modal = new ModalBuilder()
            .setCustomId("alterar_painel_banner")
            .setTitle("Alterar Banner")

            const text = new TextInputBuilder()
            .setCustomId("text_modal")
            .setLabel("Envie o link do novo banner")
            .setPlaceholder("Digite aqui ✏")
            .setStyle(1)

            modal.addComponents(new ActionRowBuilder().addComponents(text))
            
            interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "alterar_painel_banner") {
            const text = interaction.fields.getTextInputValue("text_modal");

            if (!text.startsWith("https://")) {
                interaction.reply({ content: `${dbe.get(`13`)} | Link inválido!`, ephemeral:true})
                return;
            } 
            interaction.reply({ content: `${dbe.get(`6`)} | Alterado!`, ephemeral:true})
            dbc.set(`painel.banner`, text)
            let banner;
            let thumb;
            if (dbc.get(`painel.banner`)) {
                banner = `[Clique aqui para ver](${dbc.get(`painel.banner`)})`
            } else {
                banner = "`Não Definido`"
            }
            if (dbc.get(`painel.thumb`)) {
                thumb = `[Clique aqui para ver](${dbc.get(`painel.thumb`)})`
            } else {
                thumb = "`Não Definido`"
            }
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket (Imagens)`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Banner:`,
                    value: `${banner}`,
                    inline:true
                },
                {
                    name: `Thumbnail:`,
                    value: `${thumb}`,
                    inline:true
                }
            )
            .setColor(dbc.get(`color`))

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_banner`)
                .setLabel(`Alterar Banner`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_thumb`)
                .setLabel(`Alterar Thumbnail`),
                new ButtonBuilder()
                .setStyle(4)
                .setCustomId(`reset_painel_img`)
                .setLabel(`Resetar`)
                .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfigpainel`)
                .setLabel(`Voltar`)
                .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.message.edit({ embeds: [embed], components: [row]})
        }
        if (interaction.customId === "alterarimg_thumb"){
            const modal = new ModalBuilder()
            .setCustomId("alterar_painel_thumb")
            .setTitle("Alterar Thumbnail")

            const text = new TextInputBuilder()
            .setCustomId("text_modal")
            .setLabel("Envie o link da nova thumbnail")
            .setPlaceholder("Digite aqui ✏")
            .setStyle(1)

            modal.addComponents(new ActionRowBuilder().addComponents(text))
            
            interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "alterar_painel_thumb") {
            const text = interaction.fields.getTextInputValue("text_modal");

            if (!text.startsWith("https://")) {
                interaction.reply({ content: `${dbe.get(`13`)} | Link inválido!`, ephemeral:true})
                return;
            } 
            interaction.reply({ content: `${dbe.get(`6`)} | Alterado!`, ephemeral:true})
            dbc.set(`painel.thumb`, text)
            let banner;
            let thumb;
            if (dbc.get(`painel.banner`)) {
                banner = `[Clique aqui para ver](${dbc.get(`painel.banner`)})`
            } else {
                banner = "`Não Definido`"
            }
            if (dbc.get(`painel.thumb`)) {
                thumb = `[Clique aqui para ver](${dbc.get(`painel.thumb`)})`
            } else {
                thumb = "`Não Definido`"
            }
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket (Imagens)`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Banner:`,
                    value: `${banner}`,
                    inline:true
                },
                {
                    name: `Thumbnail:`,
                    value: `${thumb}`,
                    inline:true
                }
            )
            .setColor(dbc.get(`color`))

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_banner`)
                .setLabel(`Alterar Banner`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_thumb`)
                .setLabel(`Altar Thumbnail`),
                new ButtonBuilder()
                .setStyle(4)
                .setCustomId(`reset_painel_img`)
                .setLabel(`Resetar`)
                .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfigpainel`)
                .setLabel(`Voltar`)
                .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.message.edit({ embeds: [embed], components: [row]})
        }
        if (interaction.customId === "reset_painel_img") {
            dbc.delete(`painel.banner`)
            dbc.delete(`painel.thumb`)
            interaction.reply({ content: `${dbe.get(`6`)} | Resetado!`, ephemeral:true})
            let banner;
            let thumb;
            if (dbc.get(`painel.banner`)) {
                banner = `[Clique aqui para ver](${dbc.get(`painel.banner`)})`
            } else {
                banner = "`Não Definido`"
            }
            if (dbc.get(`painel.thumb`)) {
                thumb = `[Clique aqui para ver](${dbc.get(`painel.thumb`)})`
            } else {
                thumb = "`Não Definido`"
            }
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket (Imagens)`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Banner:`,
                    value: `${banner}`,
                    inline:true
                },
                {
                    name: `Thumbnail:`,
                    value: `${thumb}`,
                    inline:true
                }
            )
            .setColor(dbc.get(`color`))

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_banner`)
                .setLabel(`Alterar Banner`),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`alterarimg_thumb`)
                .setLabel(`Altar Thumbnail`),
                new ButtonBuilder()
                .setStyle(4)
                .setCustomId(`reset_painel_img`)
                .setLabel(`Resetar`)
                .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfigpainel`)
                .setLabel(`Voltar`)
                .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.message.edit({ embeds: [embed], components: [row]})
        }
        if (interaction.customId === "voltarconfigpainel") {
            const paineldaitro = new EmbedBuilder()
            .setAuthor({ name: `Configurando Painel Ticket`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .addFields(
                {
                    name: `Veja as variáveis para você inserir na mensagem:`,
                    value: `\nMencionar quem abriu ticket: **{user}**\nExibir Codigo do Ticket: **{codigo}**\nMostrar quem Assumiu Ticket: **{assumido}**\nMostra o motivo do ticket: **{motivo}**\nMostra a descrição do ticket: **{desc}**\nMostra os horários do ticket: **{horario1}** e **{horario2}** **Ex:** [Horario 1](https://media.discordapp.net/attachments/1239421940624658543/1242999434695151686/image.png?ex=664fe0ef&is=664e8f6f&hm=dce9cee145702f6140bd769a9d76a90b90ac3f317674004f797d18bc6ea15b52&=&format=webp&quality=lossless&width=135&height=14), [Horario 2](https://media.discordapp.net/attachments/1239421940624658543/1242999423198302228/image.png?ex=664fe0ec&is=664e8f6c&hm=cf08c6111e0472d19f6dca06715e18bea3ddf720174077458a38552793a6ffff&=&format=webp&quality=lossless&width=56&height=12)`,
                    inline:false
                },
                {
                    name: `Mensagem do Painel Atual`,
                    value: `\n${dbc.get(`painel.desc`)}`,
                    inline:false
                }
            )
            .setColor(dbc.get(`color`))

            const rogerio = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarmensagem_painel`)
                    .setLabel(`Alterar Mensagem`)
                    .setEmoji("<:copy7:1225478184330596575>"),
                new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`alterarimg_painel`)
                    .setLabel(`Alterar Imagens`)
                    .setEmoji("<:emoji_51:1242969823206441010>"),
                new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`reset_msg_painel`)
                    .setLabel(`Resetar`)
                    .setEmoji("<a:load:1241739159375188099>"),
                new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigchannel`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>"),
            )

            interaction.update({ embeds: [paineldaitro], components: [rogerio] })
        }
        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_select_category") {
            const cargos = interaction.values
            cargos.map((cargos) => { 
                dbc.set(`ticket.categoria`, cargos)
                const cargo = interaction.guild.roles.cache.get(cargos)
                const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
                const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Canal de Logs:`,
                        value: `${channellogs || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Canal de Avaliação`,
                        value: `${channelavalia || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Categoria Padrão Ticket`,
                        value: `${categoria || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Cargo Staff`,
                        value: `${cargostaff || "\`Não Definido\`"}`,
                        inline:true
                    }
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configlogs`)
                    .setLabel(`Canal de Logs`)
                    .setEmoji(`<:lupa:1237266965974880257>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavaliacao`)
                    .setLabel(`Canal de Avaliação`)
                    .setEmoji(`<:emoji_51:1242968988171112498>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configpainel`)
                    .setLabel(`Painel Ticket`)
                    .setEmoji(`<:emoji_52:1242969865686487171>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`cargostaff`)
                    .setLabel(`Cargo Staff`)
                    .setEmoji(`<:suportee:1225478087660273826>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcategoria`)
                    .setLabel(`Categoria Padrão`)
                    .setEmoji(`<:emoji_4:1239445904826695750>`),
                )
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({
                    embeds: [embed],
                    components: [row, row2]
                })
                interaction.channel.send({ content: `${dbe.get(`6`)} | Categoria padrão alterado com sucesso! A nova categoria é ${categoria}`}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            })
        }

        if (interaction.isRoleSelectMenu() && interaction.customId === "role_select_staff") {
            const cargos = interaction.values
            cargos.map((cargos) => { // fazer um select menu, com os bglh, ai c clica no bglh q vc quer, ai abre outtro select menu pra selecionar o cargo ou cnala, tendeu ?não olha o video
                dbc.set(`ticket.cargo_staff`, cargos)
                const cargo = interaction.guild.roles.cache.get(cargos)
                const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
                const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Canal de Logs:`,
                        value: `${channellogs || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Canal de Avaliação`,
                        value: `${channelavalia || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Categoria Padrão Ticket`,
                        value: `${categoria || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Cargo Staff`,
                        value: `${cargostaff || "\`Não Definido\`"}`,
                        inline:true
                    }
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configlogs`)
                    .setLabel(`Canal de Logs`)
                    .setEmoji(`<:lupa:1237266965974880257>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavaliacao`)
                    .setLabel(`Canal de Avaliação`)
                    .setEmoji(`<:emoji_51:1242968988171112498>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configpainel`)
                    .setLabel(`Painel Ticket`)
                    .setEmoji(`<:emoji_52:1242969865686487171>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`cargostaff`)
                    .setLabel(`Cargo Staff`)
                    .setEmoji(`<:suportee:1225478087660273826>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcategoria`)
                    .setLabel(`Categoria Padrão`)
                    .setEmoji(`<:emoji_4:1239445904826695750>`),
                )
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({
                    embeds: [embed],
                    components: [row, row2]
                })
                interaction.channel.send({ content: `${dbe.get(`6`)} | Cargo staff alterado com sucesso! O novo cargo é ${cargostaff}`}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            })
        }

        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_select_avalia") {
            const cargos = interaction.values
            cargos.map((cargos) => { // fazer um select menu, com os bglh, ai c clica no bglh q vc quer, ai abre outtro select menu pra selecionar o cargo ou cnala, tendeu ?não olha o video
                dbc.set(`ticket.canal_avalia`, cargos)
                const cargo = interaction.guild.roles.cache.get(cargos)
                const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
                const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Canal de Logs:`,
                        value: `${channellogs || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Canal de Avaliação`,
                        value: `${channelavalia || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Categoria Padrão Ticket`,
                        value: `${categoria || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Cargo Staff`,
                        value: `${cargostaff || "\`Não Definido\`"}`,
                        inline:true
                    }
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configlogs`)
                    .setLabel(`Canal de Logs`)
                    .setEmoji(`<:lupa:1237266965974880257>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavaliacao`)
                    .setLabel(`Canal de Avaliação`)
                    .setEmoji(`<:emoji_51:1242968988171112498>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configpainel`)
                    .setLabel(`Painel Ticket`)
                    .setEmoji(`<:emoji_52:1242969865686487171>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`cargostaff`)
                    .setLabel(`Cargo Staff`)
                    .setEmoji(`<:suportee:1225478087660273826>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcategoria`)
                    .setLabel(`Categoria Padrão`)
                    .setEmoji(`<:emoji_4:1239445904826695750>`),
                )
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({
                    embeds: [embed],
                    components: [row, row2]
                })
                interaction.channel.send({ content: `${dbe.get(`6`)} | Canal de avaliação alterado com sucesso! O novo canal é ${channelavalia}`}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            })
        }



        if (interaction.isChannelSelectMenu() && interaction.customId === "channel_select_logs") {
            const cargos = interaction.values
            cargos.map((cargos) => {
                dbc.set(`ticket.canal_logs`, cargos)
                const cargo = interaction.guild.roles.cache.get(cargos)
                const channellogs = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                const channelavalia = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_avalia`))
                const categoria = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                const cargostaff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Canais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione umas das opções abaixo para configurar os canais.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Canal de Logs:`,
                        value: `${channellogs || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Canal de Avaliação`,
                        value: `${channelavalia || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Categoria Padrão Ticket`,
                        value: `${categoria || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `Cargo Staff`,
                        value: `${cargostaff || "\`Não Definido\`"}`,
                        inline:true
                    }
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configlogs`)
                    .setLabel(`Canal de Logs`)
                    .setEmoji(`<:lupa:1237266965974880257>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavaliacao`)
                    .setLabel(`Canal de Avaliação`)
                    .setEmoji(`<:emoji_51:1242968988171112498>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configpainel`)
                    .setLabel(`Painel Ticket`)
                    .setEmoji(`<:emoji_52:1242969865686487171>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`cargostaff`)
                    .setLabel(`Cargo Staff`)
                    .setEmoji(`<:suportee:1225478087660273826>`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcategoria`)
                    .setLabel(`Categoria Padrão`)
                    .setEmoji(`<:emoji_4:1239445904826695750>`),
                )
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({
                    embeds: [embed],
                    components: [row, row2]
                })
                interaction.channel.send({ content: `${dbe.get(`6`)} | Canal de logs alterado com sucesso! O novo canal é ${channellogs}`}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            })
        }

        // Config bot, tudo para baixo...
        if (interaction.customId === "configbot") {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Bot`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .setDescription(`Selecione uma das opções abaixo para configurar diretamente o seu bot.`)
            .addFields(
                {
                    name: `Nome:`,
                    value: `${interaction.client.user.username}`,
                    inline:true
                },
                {
                    name: `Avatar:`,
                    value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true})})`,
                    inline:true
                }, 
                {
                    name: `Cor:`,
                    value: `\`${dbc.get(`color`)}\``
                }
            )
            .setColor(dbc.get(`color`) || "Default")

            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configname`)
                .setLabel(`Alterar Nome`)
                .setEmoji("<:emoji_45:1240119390767419523>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configavatar`)
                .setLabel(`Alterar Avatar`)
                .setEmoji("<:emoji_44:1240119359930896414>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configstatus`)
                .setLabel(`Alterar Status`)
                .setEmoji("<:emoji_46:1240119428486660178>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configcor`)
                .setLabel(`Alterar Cor`)
                .setEmoji("<:emoji_46:1240119442722127872>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configemojis`)
                .setLabel(`Alterar Emojis`)
                .setEmoji("<:emoji_47:1240119456236048476>"),
            )

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfig`)
                .setEmoji("<:emoji_6:1239445960447361085>")
            )
            interaction.update({
                embeds: [embed],
                components: [row2, row]
            })
        }
        
        if (interaction.customId === "voltarconfig") {
            interaction.update({ 
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
            })
        }
        if (interaction.customId === "voltarconfigbot") {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Bot`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .setDescription(`Selecione uma das opções abaixo para configurar diretamente o seu bot.`)
            .addFields(
                {
                    name: `Nome:`,
                    value: `${interaction.client.user.username}`,
                    inline:true
                },
                {
                    name: `Avatar:`,
                    value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true})})`,
                    inline:true
                }, 
                {
                    name: `Cor:`,
                    value: `\`${dbc.get(`color`)}\``
                }
            )
            .setColor(dbc.get(`color`) || "Default")

            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configname`)
                .setLabel(`Alterar Nome`)
                .setEmoji("<:emoji_45:1240119390767419523>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configavatar`)
                .setLabel(`Alterar Avatar`)
                .setEmoji("<:emoji_44:1240119359930896414>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configstatus`)
                .setLabel(`Alterar Status`)
                .setEmoji("<:emoji_46:1240119428486660178>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configcor`)
                .setLabel(`Alterar Cor`)
                .setEmoji("<:emoji_46:1240119442722127872>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configemojis`)
                .setLabel(`Alterar Emojis`)
                .setEmoji("<:emoji_47:1240119456236048476>"),
            )

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfig`)
                .setEmoji("<:emoji_6:1239445960447361085>")
            )
            interaction.update({
                embeds: [embed],
                components: [row2, row]
            })
        }

        if (interaction.isButton()) {
            const option = interaction.customId;

            if (option === "configemojis") {
                var emojis = '';
                dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                const Embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Emojis`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                .setColor(dbc.get(`color`))

                const row1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configemoji`)
                    .setLabel(`Editar Emoji`)
                    .setEmoji("<:emoji_11:1239446146015821925>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigbot`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [Embed], components: [row1]})
            }

            if (option === "configname") {
                const modal = new ModalBuilder()
                .setCustomId("modalconfigname")
                .setTitle("Alterar nome do BOT");
                const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual sera o novo nome do bot?")
                .setStyle(1)
                .setPlaceholder("Coloque o nome que você deseja")
                .setRequired(true)
    
                modal.addComponents(new ActionRowBuilder().addComponents(text))
                await interaction.showModal(modal)
            }
            if (option === "configavatar") {
                const modal = new ModalBuilder()
                .setCustomId("modalconfigavatar")
                .setTitle("Alterar avatar do BOT");
                const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual sera o novo avatar do bot?")
                .setStyle(1)
                .setPlaceholder("Coloque a url que você deseja")
                .setRequired(true)
    
                modal.addComponents(new ActionRowBuilder().addComponents(text))
                await interaction.showModal(modal)
            }
            if (option === "configstatus") {
                const modal = new ModalBuilder()
                .setTitle("Alterar Status do seu BOT")
                .setCustomId("modalconfigstatus");
    
                const text = new TextInputBuilder()
                .setCustomId("presence")
                .setRequired(true)
                .setPlaceholder("Online, Ausente, Invisivel ou Ocupado")
                .setLabel("ESCOLHA O TIPO DE PRESENÇA:")
                .setStyle(1);
    
                const text1 = new TextInputBuilder()
                .setCustomId("atividade")
                .setRequired(true)
                .setPlaceholder("Jogando, Assistindo, Competindo, Transmitindo, Ouvindo")
                .setLabel("ESCOLHA O TIPO DE ATIVIDADE:")
                .setStyle(1);
    
                const text2 = new TextInputBuilder()
                .setCustomId("text_ativd")
                .setRequired(true)
                .setPlaceholder("Digite aqui")
                .setLabel("ESCREVA O TEXTO DA ATIVIDADE:")
                .setStyle(1);
    
                const text3 = new TextInputBuilder()
                .setCustomId("url")
                .setRequired(false)
                .setLabel("URL DO CANAL:")
                .setPlaceholder("Se a escolha foi Transmitindo, Coloque a Url aqui, ex: https://www.twitch.tv/discord")
                .setStyle(2);
    
                modal.addComponents(new ActionRowBuilder().addComponents(text));
                modal.addComponents(new ActionRowBuilder().addComponents(text1));
                modal.addComponents(new ActionRowBuilder().addComponents(text2));
                modal.addComponents(new ActionRowBuilder().addComponents(text3));
    
                await interaction.showModal(modal);
            }
            if (option === "configcor") {
                const modal = new ModalBuilder()
                .setCustomId("modalconfigcorrrr")
                .setTitle("Alterar cor do BOT");
                const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual sera a nova cor do bot?")
                .setStyle(1)
                .setPlaceholder("Ex: #ff00b4")
                .setRequired(true)
    
                modal.addComponents(new ActionRowBuilder().addComponents(text))
                await interaction.showModal(modal)
            }

        }

        // Config dos Emojis 

        if (interaction.customId === "configemoji") {
            const modal = new ModalBuilder()
            .setCustomId("modalconfigemoji")
            .setTitle("Alterar os emojis do BOT");
            const text = new TextInputBuilder()
            .setCustomId("text")
            .setLabel("Digite o id do emojis.")
            .setStyle(1)
            .setPlaceholder("Coloque o id do emoji aqui:")
            .setRequired(true)

            modal.addComponents(new ActionRowBuilder().addComponents(text))
            await interaction.showModal(modal)
        }

        // Respostas dos modais 

        if (interaction.isModalSubmit() && interaction.customId === "modalconfigcorrrr") {
            const text = interaction.fields.getTextInputValue("text");

            if (text.startsWith("#")) {
                dbc.set(`color`, text)
                interaction.reply({ content: `${dbe.get(`6`)} | Cor alterada com sucesso!`, ephemeral:true})
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Bot`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione uma das opções abaixo para configurar diretamente o seu bot.`)
                .addFields(
                    {
                        name: `Nome:`,
                        value: `${interaction.client.user.username}`,
                        inline:true
                    },
                    {
                        name: `Avatar:`,
                        value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true})})`,
                        inline:true
                    }, 
                    {
                        name: `Cor:`,
                        value: `\`${dbc.get(`color`)}\``
                    }
                )
                .setColor(dbc.get(`color`) || "Default")
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configname`)
                    .setLabel(`Alterar Nome`)
                    .setEmoji("<:emoji_45:1240119390767419523>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavatar`)
                    .setLabel(`Alterar Avatar`)
                    .setEmoji("<:emoji_44:1240119359930896414>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configstatus`)
                    .setLabel(`Alterar Status`)
                    .setEmoji("<:emoji_46:1240119428486660178>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcor`)
                    .setLabel(`Alterar Cor`)
                    .setEmoji("<:emoji_46:1240119442722127872>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configemojis`)
                    .setLabel(`Alterar Emojis`)
                    .setEmoji("<:emoji_47:1240119456236048476>"),
                )
    
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.message.edit({
                    embeds: [embed],
                    components: [row2, row]
                })
            } else {
                interaction.reply({ content: `${dbe.get(`13`)} | Cor inválida!`, ephemeral:true})
            }
        }

        if(interaction.isModalSubmit() && interaction.customId === "modalconfigemoji") {
            const text = interaction.fields.getTextInputValue("text");
            const emojiantigo = `${dbe.get(`${text}`)}`;

            if (!isNaN(text)) {
                if (dbe.has(text)) {
                    const embed = new EmbedBuilder()
                    .setTitle(`Configurando Emojis`)
                    .setDescription(`${dbe.get(`16`)} | Envie abaixo o emoji que deseja substituir o emoji ${emojiantigo} (\`${text}\`), lembrando o BOT precisa estar no servidor em qual este emoji vai estar.`)
                    interaction.update({embeds: [embed], components: []}).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = interaction.message.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            const newt = message.content

                            const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

                            if (emojiRegex.test(newt)) {
                                dbe.set(`${text}`, newt)
                                var emojis = '';
                                dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                                const Embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Emojis`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                                .setColor(dbc.get(`color`))
                
                                const row1 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`configemoji`)
                                    .setLabel(`Editar Emoji`)
                                    .setEmoji("<:emoji_11:1239446146015821925>"),
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`voltarconfigbot`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                
                                msg.edit({ embeds: [Embed], components: [row1]})
                                interaction.channel.send({content: `${dbe.get(`6`)} | O emoji ${emojiantigo} (\`${text}\`) foi alterado para ${dbe.get(`${text}`)}`}).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                            } else if (newt.startsWith("<")) {
                                dbe.set(`${text}`, newt)
                                var emojis = '';
                                dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                                const Embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Emojis`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                                .setColor(dbc.get(`color`))
                
                                const row1 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`configemoji`)
                                    .setLabel(`Editar Emoji`)
                                    .setEmoji("<:emoji_11:1239446146015821925>"),
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`voltarconfigbot`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                msg.edit({ embeds: [Embed], components: [row1]})
                                interaction.channel.send({content: `${dbe.get(`6`)} | O emoji ${emojiantigo} (\`${text}\`) foi alterado para ${dbe.get(`${text}`)}`}).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                            } else {
                                var emojis = '';
                                dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                                const Embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Emojis`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                                .setColor(dbc.get(`color`))
                
                                const row1 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`configemoji`)
                                    .setLabel(`Editar Emoji`)
                                    .setEmoji("<:emoji_11:1239446146015821925>"),
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`voltarconfigbot`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                msg.edit({ embeds: [Embed], components: [row1]})
                                interaction.channel.send({content: `${dbe.get(`13`)} | Mande um emoji válido!`}).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                            }
                            
                        })
                    })
                } else {
                    var emojis = '';
                    dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                    const Embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Emojis`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                    .setColor(dbc.get(`color`))
    
                    const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`configemoji`)
                        .setLabel(`Editar Emoji`)
                        .setEmoji("<:emoji_11:1239446146015821925>"),
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltarconfigbot`)
                        .setEmoji("<:emoji_6:1239445960447361085>")
                    )
                    interaction.message.edit({ embeds: [Embed], components: [row1]})
                    interaction.channel.send({content: `${dbe.get(`13`)} | ID Inválido!`}).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 5000);
                    })
                }
            } else {
                var emojis = '';
                dbe.all().map((entry, index) => {emojis += `${index +1} - ${entry.data}\n`;});
                const Embed = new EmbedBuilder()
                .setTitle(`Configurando Emojis`)
                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                .setColor(dbc.get(`color`))

                const row1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configemoji`)
                    .setLabel(`Editar Emoji`)
                    .setEmoji(dbe.get(`30`)),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfigbot`)
                    .setEmoji(dbe.get(`29`))
                )
                interaction.message.edit({ embeds: [Embed], components: [row1]})
                interaction.channel.send({content: `${dbe.get(`13`)} | ID Inválido!`}).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            }
        }
        if(interaction.isModalSubmit() && interaction.customId === "modalconfigavatar") {
            const text = interaction.fields.getTextInputValue("text");

            if (text.startsWith('https')) {
                interaction.client.user.setAvatar(`${text}`)

                interaction.reply({ content: `${dbe.get(`6`)} | Alterado com sucesso!`, ephemeral:true})
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Bot`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Selecione uma das opções abaixo para configurar diretamente o seu bot.`)
                .addFields(
                    {
                        name: `Nome:`,
                        value: `${interaction.client.user.username}`,
                        inline:true
                    },
                    {
                        name: `Avatar:`,
                        value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true})})`,
                        inline:true
                    }, 
                    {
                        name: `Cor:`,
                        value: `\`${dbc.get(`color`)}\``
                    }
                )
                .setColor(dbc.get(`color`) || "Default")
    
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configname`)
                    .setLabel(`Alterar Nome`)
                    .setEmoji("<:emoji_45:1240119390767419523>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configavatar`)
                    .setLabel(`Alterar Avatar`)
                    .setEmoji("<:emoji_44:1240119359930896414>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configstatus`)
                    .setLabel(`Alterar Status`)
                    .setEmoji("<:emoji_46:1240119428486660178>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configcor`)
                    .setLabel(`Alterar Cor`)
                    .setEmoji("<:emoji_46:1240119442722127872>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`configemojis`)
                    .setLabel(`Alterar Emojis`)
                    .setEmoji("<:emoji_47:1240119456236048476>"),
                )
    
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`voltarconfig`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.message.edit({
                    embeds: [embed],
                    components: [row2, row]
                })
            } else {
                interaction.reply({ content: `${dbe.get(`13`)} | Coloque um link válido!`, ephemeral:true})
            }
        }

        if(interaction.isModalSubmit() && interaction.customId === "modalconfigname") {
            const text = interaction.fields.getTextInputValue("text");

            interaction.client.user.setUsername(`${text}`)

            interaction.reply({ content: `${dbe.get(`6`)} | Alterado com sucesso!`, ephemeral:true})
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Configurando Bot`, iconURL: interaction.guild.iconURL({ dynamic: true})})
            .setDescription(`Selecione uma das opções abaixo para configurar diretamente o seu bot.`)
            .addFields(
                {
                    name: `Nome:`,
                    value: `${interaction.client.user.username}`,
                    inline:true
                },
                {
                    name: `Avatar:`,
                    value: `[Clique aqui para ver](${interaction.client.user.displayAvatarURL({ dynamic:true})})`,
                    inline:true
                }, 
                {
                    name: `Cor:`,
                    value: `\`${dbc.get(`color`)}\``
                }
            )
            .setColor(dbc.get(`color`) || "Default")

            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configname`)
                .setLabel(`Alterar Nome`)
                .setEmoji("<:emoji_45:1240119390767419523>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configavatar`)
                .setLabel(`Alterar Avatar`)
                .setEmoji("<:emoji_44:1240119359930896414>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configstatus`)
                .setLabel(`Alterar Status`)
                .setEmoji("<:emoji_46:1240119428486660178>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configcor`)
                .setLabel(`Alterar Cor`)
                .setEmoji("<:emoji_46:1240119442722127872>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId(`configemojis`)
                .setLabel(`Alterar Emojis`)
                .setEmoji("<:emoji_47:1240119456236048476>"),
            )

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(1)
                .setCustomId(`voltarconfig`)
                .setEmoji("<:emoji_6:1239445960447361085>")
            )
            interaction.message.edit({
                embeds: [embed],
                components: [row2, row]
            })

        }

        if(interaction.isModalSubmit() && interaction.customId === "modalconfigstatus") {
            const text = interaction.fields.getTextInputValue("presence");
            const text1 = interaction.fields.getTextInputValue("atividade");
            const text2 = interaction.fields.getTextInputValue("text_ativd");
            const url = interaction.fields.getTextInputValue("url") || "https://www.twitch.tv/discord";
          
            const statusMap = {
                "online": "online",
                "ausente": "idle",
                "ocupado": "dnd",
                "invisivel": "invisible",
            };
          
            const activityMap = {
                "jogando": "Playing",
                "assistindo": "Watching",
                "competindo": "Competing",
                "transmitindo": "Streaming",
                "ouvindo": "Listening"
            };
            if(Object.keys(statusMap).includes(text.toLowerCase()) && Object.keys(activityMap).includes(text1.toLowerCase())) {
                
                if(text1.toLowerCase() === "transmitindo") {
                    try{
                        interaction.client.user.setPresence({
                            activities: [{
                                name: `${text2}`,
                                type: Discord.ActivityType[activityMap[text1.toLowerCase()]],
                                url: url
                            }]
                        })
                
                        interaction.client.user.setStatus(statusMap[text.toLowerCase()]);
                        interaction.reply({
                            content:"Status Alterado com sucesso!",
                            ephemeral:true
                        })
                    } catch(err){
                        console.log(err)
                            interaction.reply({
                            content:"Ocorreu um erro ao tentar mudar os status do bot",
                            ephemeral:true
                            })
                    }
                } else {
                    try{
                    
                    interaction.client.user.setPresence({
                        activities: [{
                            name: `${text2}`,
                            type: Discord.ActivityType[activityMap[text1.toLowerCase()]],
                        }]
                    })
                    interaction.client.user.setStatus(statusMap[text.toLowerCase()]);
                    interaction.reply({
                        content:"Status Alterado com sucesso!",
                        ephemeral:true
                    })
                    } catch(err){
                        console.log(err)
                        interaction.reply({
                            content:"Ocorreu um erro ao tentar mudar os status do bot",
                            ephemeral:true
                        })
                    }
                }
            } else {
                interaction.reply({content:"Desculpe, mas a atividade fornecida não é válida. Por favor, forneça uma das seguintes atividades: jogando, assistindo, competindo, transmitindo, ouvindo.", ephemeral:true});
            }
            
        } 

    }
}