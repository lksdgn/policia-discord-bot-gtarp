const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")
module.exports = {
    name: 'ConfigPainel',
    run: async (interaction, client) => {
        if (interaction.isStringSelectMenu() && interaction.customId === "select-config-painel") {
            const option = interaction.values[0]

            if (option === dbt.get(`${option}.idpainel`)) {

                if (dbt.get(`${option}.tipo`) === "button") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                    .setColor(dbc.get(`color`) || "Default")
                    .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                    .addFields(
                        {
                            name: `Nome do Painel:`,
                            value: `\`${option}\``,
                            inline:true
                        },
                        {
                            name: `Tipo do Painel:`,
                            value: `\`${dbt.get(`${option}.tipo`)}\``,
                            inline:true
                        },
                        {
                            name: `Categoria:`,
                            value: `${interaction.guild.channels.cache.get(dbt.get(`${option}.categoria`)) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                            inline:true
                        },
                        {name: ` `, value: ` `,inline:false},
                        {
                            name: `Título do Painel:`,
                            value: `${dbt.get(`${option}.title`)}`,
                            inline:false
                        },
                        {name: ` `,value: ` `,inline:false},
                        {
                            name: `Descrição do Painel:`,
                            value: `${dbt.get(`${option}.desc`)}`,
                            inline:false
                        }
                    )
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_title`)
                        .setLabel(`Mudar Título`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),  
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_button_voltar`)
                        .setLabel(`Configurar Botão`)
                        .setEmoji("<:gerenciar:1239447347055034421>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_outrasconfig`)
                        .setLabel(`Outras Configurações`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(3)
                        .setCustomId(`${option}_config_atualizar`)
                        .setLabel(`Atualizar Painel`)
                        .setEmoji("<a:load:1225477784743186472>"),
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltar_config`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                        new ButtonBuilder()
                        .setStyle(4)
                        .setCustomId(`${option}_config_del`)
                        .setEmoji("<:1166960963988230195:1239447625737048154>")
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})
                } else if (dbt.get(`${option}.tipo`) === "select") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                    .setColor(dbc.get(`color`) || "Default")
                    .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                    .addFields(
                        {
                            name: `Nome do Painel:`,
                            value: `\`${option}\``,
                            inline:true
                        },
                        {
                            name: `Tipo do Painel:`,
                            value: `\`${dbt.get(`${option}.tipo`)}\``,
                            inline:true
                        },
                        {
                            name: `Título do Painel:`,
                            value: `${dbt.get(`${option}.title`)}`,
                            inline:false
                        },
                        {name: ` `,value: ` `,inline:false},
                        {
                            name: `Descrição do Painel:`,
                            value: `${dbt.get(`${option}.desc`)}`,
                            inline:false
                        }
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_title`)
                        .setLabel(`Mudar Título`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),  
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_select`)
                        .setLabel(`Configurar Select`)
                        .setEmoji("<:gerenciar:1239447347055034421>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_outrasconfig`)
                        .setLabel(`Outras Configurações`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(3)
                        .setCustomId(`${option}_config_atualizar`)
                        .setLabel(`Atualizar Painel`)
                        .setEmoji("<a:load:1225477784743186472>"),
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltar_config`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                        new ButtonBuilder()
                        .setStyle(4)
                        .setCustomId(`${option}_config_del`)
                        .setEmoji("<:1166960963988230195:1239447625737048154>")
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})
                }
            }
        }

        if (interaction.isButton()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[0];
            const option = customId.split("_")[0]; 
            if (customId.endsWith("_config_outrasconfig")) {
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Outras Configurações`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Selecione abaixo as outras opções!`)
                .addFields(
                    {
                        name: `Nome do Painel:`,
                        value: `\`${option}\``,
                        inline:true
                    },
                    {
                        name: `Tipo do Painel:`,
                        value: `\`${dbt.get(`${option}.tipo`)}\``,
                        inline:true
                    },
                )
                .setColor(dbc.get(`color`) || "Default")

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${option}_config_modal`)
                    .setLabel(`Configurar Modais`)
                    .setEmoji("<:modal:1243284620779454534>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${option}_config_imagens`)
                    .setLabel(`Mudar Imagens`)
                    .setEmoji("<:emoji_51:1242969823206441010>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${option}_config_modomsg`)
                    .setLabel(`Modo Mensagem`)
                    .setEmoji("<:copy7:1225478184330596575>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_config_modomsg")) {
                let modo = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modomsg`) === "ON") {
                    modo = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Modo Mensagem`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`${dbe.get(`2`)} Quando o modo é trocado para mensagem simples, a mensagem do painel deixa de ser **EMBED** e passa à ser uma **MENSAGEM** e apenas a descrição e imagem será setada no painel de criação do ticket. Esteja ciente disso.`)
                .addFields(
                    {
                        name: `Modo Mensagem Simples:`,
                        value: `\`${modo}\``,
                        inline:true
                    },
                )
                .setColor(dbc.get(`color`) || "Default")

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modomsg`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modomsg_onoff`)
                    .setLabel(`Mensagem Simples`)
                    .setEmoji(dbt.get(`${option}.modomsg`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_modomsg_onoff")) {
                if (dbt.get(`${tabom}.modomsg`) === "ON") {
                    dbt.set(`${tabom}.modomsg`, "OFF")
                } else {
                    dbt.set(`${tabom}.modomsg`, "ON")
                }
                let modo = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modomsg`) === "ON") {
                    modo = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Modo Mensagem`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`${dbe.get(`2`)} Quando o modo é trocado para mensagem simples, a mensagem do painel deixa de ser **EMBED** e passa à ser uma **MENSAGEM** e apenas a descrição e imagem será setada no painel de criação do ticket. Esteja ciente disso.`)
                .addFields(
                    {
                        name: `Modo Mensagem Simples:`,
                        value: `\`${modo}\``,
                        inline:true
                    },
                )
                .setColor(dbc.get(`color`) || "Default")

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modomsg`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modomsg_onoff`)
                    .setLabel(`Mensagem Simples`)
                    .setEmoji(dbt.get(`${option}.modomsg`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_config_modal")) {
                let assunto = "`🔴 Desligado`"
                let descticket = "`🔴 Desligado`"
                let motivofinaliza = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modal.assunto`) === "ON") {
                    assunto = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.desc`) === "ON") {
                    descticket = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.finaliza`) === "ON") {
                    motivofinaliza = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Sistemas`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Assunto Ticket:`,
                        value: `${assunto}`,
                        inline:false
                    },
                    {
                        name: `Descrição do Ticket:`,
                        value: `${descticket}`,
                        inline:false
                    },
                    {
                        name: `Motivo Finalização:`,
                        value: `${motivofinaliza}`,
                        inline:false
                    },
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.assunto`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalassunto_onoff`)
                    .setLabel(`Assunto do Ticket`)
                    .setEmoji(dbt.get(`${option}.modal.assunto`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.desc`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modaldesc_onoff`)
                    .setLabel(`Descrição do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.desc`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.finaliza`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalfinalization_onoff`)
                    .setLabel(`Finalização do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.finaliza`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_modalassunto_onoff")) {
                if (dbt.get(`${tabom}.modal.assunto`) === "ON") {
                    dbt.set(`${tabom}.modal.assunto`, "OFF")
                } else {
                    dbt.set(`${tabom}.modal.assunto`, "ON")
                }
                let assunto = "`🔴 Desligado`"
                let descticket = "`🔴 Desligado`"
                let motivofinaliza = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modal.assunto`) === "ON") {
                    assunto = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.desc`) === "ON") {
                    descticket = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.finaliza`) === "ON") {
                    motivofinaliza = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Sistemas`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Assunto Ticket:`,
                        value: `${assunto}`,
                        inline:false
                    },
                    {
                        name: `Descrição do Ticket:`,
                        value: `${descticket}`,
                        inline:false
                    },
                    {
                        name: `Motivo Finalização:`,
                        value: `${motivofinaliza}`,
                        inline:false
                    },
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.assunto`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalassunto_onoff`)
                    .setLabel(`Assunto do Ticket`)
                    .setEmoji(dbt.get(`${option}.modal.assunto`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.desc`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modaldesc_onoff`)
                    .setLabel(`Descrição do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.desc`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.finaliza`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalfinalization_onoff`)
                    .setLabel(`Finalização do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.finaliza`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_modaldesc_onoff")) {
                if (dbt.get(`${option}.modal.desc`) === "ON") {
                    dbt.set(`${option}.modal.desc`, "OFF")
                } else if (dbt.get(`${option}.modal.desc`) === "OFF") {
                    dbt.set(`${option}.modal.desc`, "ON")
                }
                let assunto = "`🔴 Desligado`"
                let descticket = "`🔴 Desligado`"
                let motivofinaliza = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modal.assunto`) === "ON") {
                    assunto = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.desc`) === "ON") {
                    descticket = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.finaliza`) === "ON") {
                    motivofinaliza = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Sistemas`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Assunto Ticket:`,
                        value: `${assunto}`,
                        inline:false
                    },
                    {
                        name: `Descrição do Ticket:`,
                        value: `${descticket}`,
                        inline:false
                    },
                    {
                        name: `Motivo Finalização:`,
                        value: `${motivofinaliza}`,
                        inline:false
                    },
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.assunto`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalassunto_onoff`)
                    .setLabel(`Assunto do Ticket`)
                    .setEmoji(dbt.get(`${option}.modal.assunto`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.desc`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modaldesc_onoff`)
                    .setLabel(`Descrição do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.desc`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.finaliza`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalfinalization_onoff`)
                    .setLabel(`Finalização do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.finaliza`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith("_modalfinalization_onoff")) {
                if (dbt.get(`${option}.modal.finaliza`) === "ON") {
                    dbt.set(`${option}.modal.finaliza`, "OFF")
                } else if (dbt.get(`${option}.modal.finaliza`) === "OFF") {
                    dbt.set(`${option}.modal.finaliza`, "ON")
                }
                let assunto = "`🔴 Desligado`"
                let descticket = "`🔴 Desligado`"
                let motivofinaliza = "`🔴 Desligado`"
                if (dbt.get(`${tabom}.modal.assunto`) === "ON") {
                    assunto = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.desc`) === "ON") {
                    descticket = "`🟢 Ligado`"
                }
                if (dbt.get(`${tabom}.modal.finaliza`) === "ON") {
                    motivofinaliza = "`🟢 Ligado`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Sistemas`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Assunto Ticket:`,
                        value: `${assunto}`,
                        inline:false
                    },
                    {
                        name: `Descrição do Ticket:`,
                        value: `${descticket}`,
                        inline:false
                    },
                    {
                        name: `Motivo Finalização:`,
                        value: `${motivofinaliza}`,
                        inline:false
                    },
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.assunto`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalassunto_onoff`)
                    .setLabel(`Assunto do Ticket`)
                    .setEmoji(dbt.get(`${option}.modal.assunto`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.desc`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modaldesc_onoff`)
                    .setLabel(`Descrição do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.desc`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(dbt.get(`${option}.modal.finaliza`) === "ON" ? 3 : 4)
                    .setCustomId(`${tabom}_modalfinalization_onoff`)
                    .setLabel(`Finalização do ticket`)
                    .setEmoji(dbt.get(`${option}.modal.finaliza`) === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row]})
            }
            if (customId.endsWith('_config_select')) {
                const embed = new EmbedBuilder()
                .setTitle(`Configurando Select.`)
                .setDescription(`Selecione a opção de criação do ticket que deseja configurar`)
                .setColor(dbc.get(`color`) || "Default")

                const actionrowselect = new StringSelectMenuBuilder()
                .setCustomId('select_config_options')
                .setPlaceholder("Selecione uma opção para configurar")
                
                const paineis = dbt.get(`${tabom}.select`);
        
                paineis.map((entry, index) => {
                    actionrowselect.addOptions(
                        {
                            label: `Texto: ${entry.text}`,
                            description: `ID: ${entry.id}`,
                            value: `${tabom}_${entry.id}`,
                            emoji: entry.emoji
                        }
                    )
                })
        
                const row = new ActionRowBuilder()
                .addComponents(actionrowselect)

                const rowb = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${tabom}_add_option_select`)
                    .setLabel(`Add Nova Opção`)
                    .setEmoji("<:emoji_8:1239446048125222912>"),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_sub_option_select`)
                    .setLabel(`Remover Opção`)
                    .setEmoji("<:emoji_9:1239446070774464532>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row, rowb]})
            }
            if (customId.endsWith("_add_option_select")) {
                const painel = dbt.get(`${tabom}`)
                if (painel.select.length >= 15) {
                    interaction.reply({content: `${dbe.get(`13`)} | Máximo de 15 opções de select!`, ephemeral:true})
                    return;
                }
                let id = await painel.select.length + 1
                await dbt.push(`${tabom}.select`, {
                    text: "Abrir Ticket",
                    desc: "Clique aqui para abrir",
                    emoji: `${dbe.get(`26`)}`,
                    id: id,
                    msg: {
                        mensagem: "",
                        sistema: "ON"
                    }
                });
                const embed = new EmbedBuilder()
                .setTitle(`Configurando Select.`)
                .setDescription(`Selecione a opção de criação do ticket que deseja configurar`)
                .setColor(dbc.get(`color`) || "Default")

                const actionrowselect = new StringSelectMenuBuilder()
                .setCustomId('select_config_options')
                .setPlaceholder("Selecione uma opção para configurar")
                
                const paineis = dbt.get(`${tabom}.select`);
        
                paineis.map((entry, index) => {
                    actionrowselect.addOptions(
                        {
                            label: `Texto: ${entry.text}`,
                            description: `ID: ${entry.id}`,
                            value: `${tabom}_${entry.id}`,
                            emoji: entry.emoji
                        }
                    )
                })
        
                const row = new ActionRowBuilder()
                .addComponents(actionrowselect)

                const rowb = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${tabom}_add_option_select`)
                    .setLabel(`Add Nova Opção`)
                    .setEmoji("<:emoji_8:1239446048125222912>"),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_sub_option_select`)
                    .setLabel(`Remover Opção`)
                    .setEmoji("<:emoji_9:1239446070774464532>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.message.edit({ embeds: [embed], components: [row, rowb]})
                interaction.reply(`${dbe.get(`6`)} | Nova opção adicionada com sucesso!`).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                });
            }
            
            if (customId.endsWith("_sub_option_select")) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o id da opção que será removida!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", async(message)=> {
                        const newt = message.content
                        message.delete();

                        const painel = dbt.get(`${tabom}`);

                        if (painel) {
                            if (painel.select && Array.isArray(painel.select)) {
                                if (painel.select.length <= 1) {
                                    msg12.edit(`${dbe.get(`13`)} | Tem que ter pelo menos uma opção!`);
                                    return;
                                }
                                // Encontra a opção no array 'select' pelo ID
                                const opcaoDeletarIndex = painel.select.findIndex(opcao => opcao.id === Number(newt));
                                if (opcaoDeletarIndex !== -1) {
                                    // Remove a opção do array 'select' pelo índice encontrado
                                    painel.select.splice(opcaoDeletarIndex, 1);
                                    // Salva as alterações de volta na base de dados
                                    let idd = 1
                                    await painel.select.map(entry => {
                                        entry.id = idd
                                        idd++;
                                    })
                                    await dbt.set(tabom, painel);
                                    msg12.edit(`${dbe.get(`6`)} | Opção deletado com sucesso!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                    const embed = new EmbedBuilder()
                                    .setTitle(`Configurando Select.`)
                                    .setDescription(`Selecione a opção de criação do ticket que deseja configurar`)
                                    .setColor(dbc.get(`color`) || "Default")
                    
                                    const actionrowselect = new StringSelectMenuBuilder()
                                    .setCustomId('select_config_options')
                                    .setPlaceholder("Selecione uma opção para configurar")
                                    
                                    const paineis = dbt.get(`${tabom}.select`);
                            
                                    paineis.map((entry, index) => {
                                        actionrowselect.addOptions(
                                            {
                                                label: `Texto: ${entry.text}`,
                                                description: `ID: ${entry.id}`,
                                                value: `${tabom}_${entry.id}`,
                                                emoji: entry.emoji
                                            }
                                        )
                                    })
                            
                                    const row = new ActionRowBuilder()
                                    .addComponents(actionrowselect)
                    
                                    const rowb = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setStyle(3)
                                        .setCustomId(`${tabom}_add_option_select`)
                                        .setLabel(`Add Nova Opção`)
                                        .setEmoji("<:emoji_8:1239446048125222912>"),
                                        new ButtonBuilder()
                                        .setStyle(4)
                                        .setCustomId(`${tabom}_sub_option_select`)
                                        .setLabel(`Remover Opção`)
                                        .setEmoji("<:emoji_9:1239446070774464532>"),
                                        new ButtonBuilder()
                                        .setStyle(1)
                                        .setCustomId(`${tabom}_config_voltar`)
                                        .setLabel(`Voltar`)
                                        .setEmoji("<:emoji_6:1239445960447361085>")
                                    )
                                    interaction.message.edit({ embeds: [embed], components: [row, rowb]})
                                } else {
                                    msg12.edit(`${dbe.get(`13`)} | Opção não encontrada!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                }
                            } else {
                                console.error("A propriedade 'select' não é um array válido.");
                            }
                        } else {
                            msg12.edit(`${dbe.get(`13`)} | Painel não encontrado!`).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                        }
                    })
                })
            }
            if (customId.endsWith('_config_button_voltar')) {
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Botões`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                .setColor(dbc.get(`color`) || "Default")

                const actionrowselect = new StringSelectMenuBuilder()
                .setCustomId('select_config_buttons')
                .setPlaceholder("Selecione uma opção para configurar")
                let paineis = []
                paineis = dbt.get(`${tabom}.buttons`);
        
                paineis.map((entry, index) => {
                    actionrowselect.addOptions(
                        {
                            label: `Texto: ${entry.text}`,
                            description: `ID: ${entry.id}`,
                            value: `${tabom}_${entry.id}`,
                            emoji: entry.emoji
                        }
                    )
                })
        
                const row = new ActionRowBuilder()
                .addComponents(actionrowselect)

                const rowb = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${tabom}_add_buttons`)
                    .setLabel(`Adicionar Botão`)
                    .setEmoji("<:emoji_8:1239446048125222912>"),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_sub_buttons`)
                    .setLabel(`Remover Botão`)
                    .setEmoji("<:emoji_9:1239446070774464532>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row, rowb]})
            }
            if (customId.endsWith("_add_buttons")) {
                let opc = []
                opc = dbt.get(`${tabom}.buttons`)
                if (opc.length >= 5) {
                    interaction.reply({ content: `${dbe.get(`13`)} | Não é possível criar mais botões!`, ephemeral:true})
                    return;
                }
                let idsn = opc.length + 1
                dbt.push(`${tabom}.buttons`, {
                        text: "Abrir Ticket",
                        style: 1,
                        emoji: `🎫`,
                        id: idsn,
                        msg: {
                            sistema: "OFF",
                            mensagem: ""
                        }
                });
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Botões`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                .setColor(dbc.get(`color`) || "Default")

                const actionrowselect = new StringSelectMenuBuilder()
                .setCustomId('select_config_buttons')
                .setPlaceholder("Selecione uma opção para configurar")
                let paineis = []
                paineis = dbt.get(`${tabom}.buttons`);
        
                paineis.map((entry, index) => {
                    actionrowselect.addOptions(
                        {
                            label: `Texto: ${entry.text}`,
                            description: `ID: ${entry.id}`,
                            value: `${tabom}_${entry.id}`,
                            emoji: entry.emoji
                        }
                    )
                })
        
        
                const row = new ActionRowBuilder()
                .addComponents(actionrowselect)

                const rowb = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${tabom}_add_buttons`)
                    .setLabel(`Adicionar Botão`)
                    .setEmoji("<:emoji_8:1239446048125222912>"),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_sub_buttons`)
                    .setLabel(`Remover Botão`)
                    .setEmoji("<:emoji_9:1239446070774464532>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.message.edit({ embeds: [embed], components: [row, rowb]})
                interaction.reply({ content: `${dbe.get(`6`)} | Botão adicionado com sucesso!`, ephemeral:true})
            }
            
            if (customId.endsWith("_sub_buttons")) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o id do botão que será removido!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        const newt = message.content
                        message.delete();

                        const painel = dbt.get(`${tabom}`);

                        if (painel) {
                            if (painel.buttons && Array.isArray(painel.buttons)) {
                                if (painel.buttons.length <= 1) {
                                    msg12.edit(`${dbe.get(`13`)} | Mínimo de opções atingida!`);
                                    return;
                                }
                                // Encontra a opção no array 'select' pelo ID
                                const opcaoDeletarIndex = painel.buttons.findIndex(opcao => opcao.id === Number(newt));
                                if (opcaoDeletarIndex !== -1) {
                                    // Remove a opção do array 'select' pelo índice encontrado
                                    painel.buttons.splice(opcaoDeletarIndex, 1);
                                    // Salva as alterações de volta na base de dados
                                    dbt.set(tabom, painel);
                                    msg12.edit(`${dbe.get(`6`)} | Botão deletado com sucesso!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                    let idd = 1
                                    let buttons = []
                                    buttons = painel.buttons
                                    buttons.map(entry => {
                                        entry.id = idd
                                        idd++;
                                    })
                                    dbt.set(`${option}.buttons`, buttons)
                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: `Configurando Botões`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                                    .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                                    .setColor(dbc.get(`color`) || "Default")
                    
                    
                                    const actionrowselect = new StringSelectMenuBuilder()
                                    .setCustomId('select_config_buttons')
                                    .setPlaceholder("Selecione uma opção para configurar")
                                    let paineis = []
                                    paineis = dbt.get(`${tabom}.buttons`);
                            
                                    paineis.map((entry, index) => {
                                        actionrowselect.addOptions(
                                            {
                                                label: `Texto: ${entry.text}`,
                                                description: `ID: ${entry.id}`,
                                                value: `${tabom}_${entry.id}`,
                                                emoji: entry.emoji
                                            }
                                        )
                                    })
                            
                            
                                    const row = new ActionRowBuilder()
                                    .addComponents(actionrowselect)
                    
                                    const rowb = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setStyle(3)
                                        .setCustomId(`${tabom}_add_buttons`)
                                        .setLabel(`Adicionar Botão`)
                                        .setEmoji("<:emoji_8:1239446048125222912>"),
                                        new ButtonBuilder()
                                        .setStyle(4)
                                        .setCustomId(`${tabom}_sub_buttons`)
                                        .setLabel(`Remover Botão`)
                                        .setEmoji("<:emoji_9:1239446070774464532>"),
                                        new ButtonBuilder()
                                        .setStyle(1)
                                        .setCustomId(`${tabom}_config_voltar`)
                                        .setLabel(`Voltar`)
                                        .setEmoji("<:emoji_6:1239445960447361085>")
                                    )
                                    interaction.message.edit({ embeds: [embed], components: [row, rowb]})
                                } else {
                                    msg12.edit(`${dbe.get(`13`)} | Botão não encontrado!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                }
                            } else {
                                console.error("A propriedade 'select' não é um array válido.");
                            }
                        } else {
                            msg12.edit(`${dbe.get(`13`)} | Painel não encontrado!`).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                        }
                    })
                })
            }

            if (customId.endsWith('_configbutton_categoria')) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Botão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Selecione abaixo a categoria que você quer para ser a de criação dos tickets.`)
                        .setColor(dbc.get(`color`) || "Default")
        
                        const select = new ActionRowBuilder()
                        .addComponents(
                            new Discord.ChannelSelectMenuBuilder()
                            .setChannelTypes(Discord.ChannelType.GuildCategory)
                            .setCustomId(`${tabom}_${entry.id}_button_category`)
                            .setMaxValues(1)
                            .setPlaceholder(`Selecione uma categoria...`),
                        )
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_voltar_config_button`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [select, row]})
                    }
                })
            }
            if (customId.endsWith("_voltar_config_button")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let style = "";
                        if (entry.style === 1) {
                            style = "\`🔵 Azul - 1\`"
                        }
                        if (entry.style === 2) {
                            style = "\`⚫ Cinza - 2\`"
                        }
                        if (entry.style === 3) {
                            style = "\`🟢 Verde - 3\`"
                        }
                        if (entry.style === 4) {
                            style = "\`🔴 Vermelho - 4\`"
                        }
                        const categoria = interaction.guild.channels.cache.get(entry.categoria)


                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Texto:`,
                                value: `${entry.text}`,
                                inline:true
                            },
                            {
                                name: `Emoji:`,
                                value: `${entry.emoji}`,
                                inline: true
                            },
                            {
                                name: `Cor:`,
                                value: `${style}`,
                                inline:true
                            },
                            {
                                name: `Categoria:`,
                                value: `${categoria || "\`Não Definido\`"}`,
                                inline:true
                            }
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                            .setLabel(`Mudar Texto`)
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                            .setLabel(`Mudar Emoji`)
                            .setEmoji("<:emoji_47:1240119456236048476>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                            .setLabel(`Mudar Cor`)
                            .setEmoji(`<:emoji_46:1240119442722127872>`),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                            .setLabel(`Mudar Categoria`)
                            .setEmoji("<:emoji_4:1239445904826695750>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Outras Opções`)
                            .setEmoji("<:1166960895201656852:1239447582464282674>")
                        )
                        const row2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_config_button_voltar`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.deferUpdate();
                        interaction.message.edit({ embeds: [embed], components: [row, row2]})
                    }
                })
            }
            
            if (customId.endsWith('_configbutton_text')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o novo texto do botão!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        const newt = message.content
                        message.delete();

                        const id = customId.split("_")[1]
                        let buttonss = dbt.get(`${tabom}.buttons`) || [];
                        let elementIndex = id - 1

                        buttonss[elementIndex].text = newt;
                        dbt.set(`${tabom}.buttons`, buttonss)
                        msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        })
                        
                        buttonss = dbt.get(`${tabom}.buttons`)
                        let entry = buttonss[elementIndex]
                        let style = "";
                        buttonss.map(entry => {
                            if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                                let style = "";
                                if (entry.style === 1) {
                                    style = "\`🔵 Azul - 1\`"
                                }
                                if (entry.style === 2) {
                                    style = "\`⚫ Cinza - 2\`"
                                }
                                if (entry.style === 3) {
                                    style = "\`🟢 Verde - 3\`"
                                }
                                if (entry.style === 4) {
                                    style = "\`🔴 Vermelho - 4\`"
                                }
                                const categoria = interaction.guild.channels.cache.get(entry.categoria)
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                                .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                                .setColor(dbc.get(`color`) || "Default")
                                .addFields(
                                    {
                                        name: `Texto:`,
                                        value: `${entry.text}`,
                                        inline:true
                                    },
                                    {
                                        name: `Emoji:`,
                                        value: `${entry.emoji}`,
                                        inline: true
                                    },
                                    {
                                        name: `Cor:`,
                                        value: `${style}`,
                                        inline:true
                                    },
                                    {
                                        name: `Categoria:`,
                                        value: `${categoria || "\`Não Definido\`"}`,
                                        inline:true
                                    }
                                )
                
                                const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                                    .setLabel(`Mudar Texto`)
                                    .setEmoji("<:prancheta:1243267310576341042>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                                    .setLabel(`Mudar Emoji`)
                                    .setEmoji("<:emoji_47:1240119456236048476>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                                    .setLabel(`Mudar Cor`)
                                    .setEmoji(`<:emoji_46:1240119442722127872>`),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                                    .setLabel(`Mudar Categoria`)
                                    .setEmoji("<:emoji_4:1239445904826695750>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                                    .setLabel(`Outras Opções`)
                                    .setEmoji("<:1166960895201656852:1239447582464282674>")
                                )
                                const row2 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`${tabom}_config_button_voltar`)
                                    .setLabel(`Voltar`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                interaction.message.edit({ embeds: [embed], components: [row, row2]})
                            }
                        })
                        
                    })
                })
            }

            if (customId.endsWith('_configbutton_cor')) {
                const id = customId.split("_")[0]
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande a nova cor com os seguintes IDS definindo a cor:\n\n\`Azul = 1\`\n\`Cinza = 2\`\n\`Verde = 3\`\n\`Vermelho = 4\``).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        const newt = message.content
                        message.delete();
                        const numero = parseInt(newt);

                        const id = customId.split("_")[1]
                        let buttonss = dbt.get(`${tabom}.buttons`) || [];
                        let elementIndex = id - 1

                        switch (numero) {
                            case 1:
                                if (elementIndex !== -1) {
                                    // Edita o elemento conforme necessário
                                    buttonss[elementIndex].style = numero;
                                }
                                dbt.set(`${tabom}.buttons`, buttonss)
                                msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                                break;
                            case 2:
                                if (elementIndex !== -1) {
                                    // Edita o elemento conforme necessário
                                    buttonss[elementIndex].style = numero;
                                }
                                dbt.set(`${tabom}.buttons`, buttonss)
                                msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                                break;
                            case 3:
                                if (elementIndex !== -1) {
                                    // Edita o elemento conforme necessário
                                    buttonss[elementIndex].style = numero;
                                }
                                dbt.set(`${tabom}.buttons`, buttonss)
                                msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                                break;
                            case 4:
                                if (elementIndex !== -1) {
                                    // Edita o elemento conforme necessário
                                    buttonss[elementIndex].style = numero;
                                }
                                dbt.set(`${tabom}.buttons`, buttonss)
                                msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                                break;
                            default:
                                msg12.edit(`${dbe.get(`13`)} | Coloque um número válido!`).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 5000);
                                })
                        }
                        const buttons = dbt.get(`${tabom}.buttons`)
                        let entry = buttons[id]
                        let style = "";
                        buttons.map(entry => {
                            if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                                let style = "";
                                if (entry.style === 1) {
                                    style = "\`🔵 Azul - 1\`"
                                }
                                if (entry.style === 2) {
                                    style = "\`⚫ Cinza - 2\`"
                                }
                                if (entry.style === 3) {
                                    style = "\`🟢 Verde - 3\`"
                                }
                                if (entry.style === 4) {
                                    style = "\`🔴 Vermelho - 4\`"
                                }
                                const categoria = interaction.guild.channels.cache.get(entry.categoria)
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                                .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                                .setColor(dbc.get(`color`) || "Default")
                                .addFields(
                                    {
                                        name: `Texto:`,
                                        value: `${entry.text}`,
                                        inline:true
                                    },
                                    {
                                        name: `Emoji:`,
                                        value: `${entry.emoji}`,
                                        inline: true
                                    },
                                    {
                                        name: `Cor:`,
                                        value: `${style}`,
                                        inline:true
                                    },
                                    {
                                        name: `Categoria:`,
                                        value: `${categoria || "\`Não Definido\`"}`,
                                        inline:true
                                    }
                                )
                
                                const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                                    .setLabel(`Mudar Texto`)
                                    .setEmoji("<:prancheta:1243267310576341042>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                                    .setLabel(`Mudar Emoji`)
                                    .setEmoji("<:emoji_47:1240119456236048476>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                                    .setLabel(`Mudar Cor`)
                                    .setEmoji(`<:emoji_46:1240119442722127872>`),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                                    .setLabel(`Mudar Categoria`)
                                    .setEmoji("<:emoji_4:1239445904826695750>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                                    .setLabel(`Outras Opções`)
                                    .setEmoji("<:1166960895201656852:1239447582464282674>")
                                )
                                const row2 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`${tabom}_config_button_voltar`)
                                    .setLabel(`Voltar`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                interaction.message.edit({ embeds: [embed], components: [row, row2]})
                            }
                        })
                    })
                })
            }

            if (customId.endsWith('_configbutton_emoji')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o novo emoji do botão!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        const newt = message.content
                        message.delete();
                        const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
                        const id = customId.split("_")[1]
                        let buttonss = dbt.get(`${tabom}.buttons`) || [];
                        let elementIndex = id - 1

                        dbt.set(`${tabom}.buttons`, buttonss)
                        if (newt.startsWith('<')) {
                            if (elementIndex !== -1) {
                                buttonss[elementIndex].emoji = newt;
                            }
                            buttonss[elementIndex].emoji = newt;
                            dbt.set(`${tabom}.buttons`, buttonss)
                            msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                        } else if (emojiRegex.test(newt)) {
                            if (elementIndex !== -1) {
                                buttonss[elementIndex].emoji = newt;
                            }
                            buttonss[elementIndex].emoji = newt;
                            dbt.set(`${tabom}.buttons`, buttonss)
                            msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                        } else {
                            msg12.edit(`${dbe.get(`13`)} | Emoji inválido!`).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                        }
                        const buttons = dbt.get(`${tabom}.buttons`)
                        let entry = buttons[id]
                        let style = "";
                        buttons.map(entry => {
                            if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                                let style = "";
                                if (entry.style === 1) {
                                    style = "\`🔵 Azul - 1\`"
                                }
                                if (entry.style === 2) {
                                    style = "\`⚫ Cinza - 2\`"
                                }
                                if (entry.style === 3) {
                                    style = "\`🟢 Verde - 3\`"
                                }
                                if (entry.style === 4) {
                                    style = "\`🔴 Vermelho - 4\`"
                                }
                                const categoria = interaction.guild.channels.cache.get(entry.categoria)
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                                .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                                .setColor(dbc.get(`color`) || "Default")
                                .addFields(
                                    {
                                        name: `Texto:`,
                                        value: `${entry.text}`,
                                        inline:true
                                    },
                                    {
                                        name: `Emoji:`,
                                        value: `${entry.emoji}`,
                                        inline: true
                                    },
                                    {
                                        name: `Cor:`,
                                        value: `${style}`,
                                        inline:true
                                    },
                                    {
                                        name: `Categoria:`,
                                        value: `${categoria || "\`Não Definido\`"}`,
                                        inline:true
                                    }
                                )
                
                                const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                                    .setLabel(`Mudar Texto`)
                                    .setEmoji("<:prancheta:1243267310576341042>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                                    .setLabel(`Mudar Emoji`)
                                    .setEmoji("<:emoji_47:1240119456236048476>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                                    .setLabel(`Mudar Cor`)
                                    .setEmoji(`<:emoji_46:1240119442722127872>`),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                                    .setLabel(`Mudar Categoria`)
                                    .setEmoji("<:emoji_4:1239445904826695750>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                                    .setLabel(`Outras Opções`)
                                    .setEmoji("<:1166960895201656852:1239447582464282674>")
                                )
                                const row2 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`${tabom}_config_button_voltar`)
                                    .setLabel(`Voltar`)
                                    .setEmoji("<:emoji_6:1239445960447361085>")
                                )
                                interaction.message.edit({ embeds: [embed], components: [row, row2]})
                            }
                        })
                    })
                })
            }
            if (customId.endsWith("_configbutton_outrasopc")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Outras Configurações`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Selecione abaixo as outras opções!`)
                        .addFields()
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modais`)
                            .setLabel("Configurar Modais")
                            .setEmoji("<:modal:1243284620779454534>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto`)
                            .setLabel("Mensagem Automática")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_voltar_config_button`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_modais")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_msgauto")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_msgauto_onoff")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.msg.sistema === "ON") {
                            buttons[id].msg.sistema = "OFF"
                        } else {
                            buttons[id].msg.sistema = "ON"
                        }
                        dbt.set(`${tabom}.buttons`, buttons)
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith(`_configbutton_msg_reset`)) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        buttons[id].msg.mensagem = ""
                        buttons[id].msg.sistema = "OFF"
                        dbt.set(`${tabom}.buttons`, buttons)
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_msgauto_alt")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const modal = new ModalBuilder()
                        .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_alt_modal`)
                        .setTitle("Alterar Mensagem Automática")

                        const text = new TextInputBuilder()
                        .setCustomId("text_modal")
                        .setLabel("Coloque a nova mensagem")
                        .setPlaceholder("Digite aqui ✏")
                        .setStyle(2)
                        .setValue(entry.msg.mensagem)
            
                        modal.addComponents(new ActionRowBuilder().addComponents(text))
                        
                        interaction.showModal(modal)
                    }
                })
            }
            if (customId.endsWith("_configbutton_modalfinalization")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.finaliza === "ON") {
                            buttons[id].finaliza = "OFF"
                            dbt.set(`${tabom}.buttons`, buttons)
                        } else {
                            buttons[id].finaliza = "ON"
                            dbt.set(`${tabom}.buttons`, buttons)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_modaldesc")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.desc === "ON") {
                            buttons[id].desc = "OFF"
                            dbt.set(`${tabom}.buttons`, buttons)
                        } else {
                            buttons[id].desc = "ON"
                            dbt.set(`${tabom}.buttons`, buttons)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configbutton_modalassunto")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.assunto === "ON") {
                            buttons[id].assunto = "OFF"
                            dbt.set(`${tabom}.buttons`, buttons)
                        } else {
                            buttons[id].assunto = "ON"
                            dbt.set(`${tabom}.buttons`, buttons)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith('_config_del')) {
                interaction.deferUpdate();
                dbt.delete(`${tabom}`)
                interaction.message.delete()
                interaction.channel.send(`${dbe.get(`6`)} | Deletado com sucesso!`).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            }

            if (customId.endsWith('_config_imagens')) {

                let banner = "";
                if (dbt.get(`${tabom}.banner`)) {
                    banner = `[Clique aqui para ver](${dbt.get(`${tabom}.banner`)})`
                } else {
                    banner = "\`Não Definido\`"
                }
                let thumb = "";
                if (dbt.get(`${tabom}.thumb`)) {
                    thumb = `[Clique aqui para ver](${dbt.get(`${tabom}.thumb`)})`
                } else {
                    thumb = "\`Não Definido\`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Imagens`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Envie o link das imagens para as modificações serem armazenadas.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Banner:`,
                        value: `${banner}`,
                        inline:true
                    },
                    {
                        name: `Thumbnail`,
                        value: `${thumb}`,
                        inline:true
                    }
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_config_banner`)
                    .setLabel(`Mudar Banner`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_config_thumb`)
                    .setLabel(`Mudar Thumbnaill`),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_configimg_reset`)
                    .setLabel(`Resetar`)
                    .setEmoji("<a:load:1241739159375188099>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )

                interaction.update({ embeds: [embed], components: [row]})
            }

            if (customId.endsWith('_configimg_reset')) {
                interaction.deferUpdate();
                
                if (dbt.get(`${tabom}.banner`)){
                    dbt.delete(`${tabom}.banner`)
                }
                if (dbt.get(`${tabom}.thumb`)) {
                    dbt.delete(`${tabom}.thumb`)
                }
                let banner = "";
                if (dbt.get(`${tabom}.banner`)) {
                    banner = `[Clique aqui para ver](${dbt.get(`${tabom}.banner`)})`
                } else {
                    banner = "\`Não Definido\`"
                }
                let thumb = "";
                if (dbt.get(`${tabom}.thumb`)) {
                    thumb = `[Clique aqui para ver](${dbt.get(`${tabom}.thumb`)})`
                } else {
                    thumb = "\`Não Definido\`"
                }
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Imagens`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Envie o link das imagens para as modificações serem armazenadas.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Banner:`,
                        value: `${banner}`,
                        inline:true
                    },
                    {
                        name: `Thumbnail`,
                        value: `${thumb}`,
                        inline:true
                    }
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_config_banner`)
                    .setLabel(`Mudar Banner`),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_config_thumb`)
                    .setLabel(`Mudar Thumbnaill`),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_configimg_reset`)
                    .setLabel(`Resetar`)
                    .setEmoji("<a:load:1241739159375188099>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_outrasconfig`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.message.edit({ embeds: [embed], components: [row]})
                
                interaction.channel.send(`${dbe.get(`6`)} | Resetado com sucesso!`).then((editedMessage) => {
                    setTimeout(() => {
                        editedMessage.delete().catch(console.error);
                    }, 5000); 
                });
            }
            if (customId.endsWith('_config_banner')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o link do banner aqui no chat!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        if (message.content.startsWith('https://')) {
                            dbt.set(`${tabom}.banner`, `${message.content}`)
                            
                            msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                            let banner = "";
                            if (dbt.get(`${tabom}.banner`)) {
                                banner = `[Clique aqui para ver](${dbt.get(`${tabom}.banner`)})`
                            } else {
                                banner = "\`Não Definido\`"
                            }
                            let thumb = "";
                            if (dbt.get(`${tabom}.thumb`)) {
                                thumb = `[Clique aqui para ver](${dbt.get(`${tabom}.thumb`)})`
                            } else {
                                thumb = "\`Não Definido\`"
                            }
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Imagens`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setDescription(`Envie o link das imagens para as modificações serem armazenadas.`)
                            .setColor(dbc.get(`color`) || "Default")
                            .addFields(
                                {
                                    name: `Banner:`,
                                    value: `${banner}`,
                                    inline:true
                                },
                                {
                                    name: `Thumbnail`,
                                    value: `${thumb}`,
                                    inline:true
                                }
                            )
            
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_config_banner`)
                                .setLabel(`Mudar Banner`),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_config_thumb`)
                                .setLabel(`Mudar Thumbnaill`),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${tabom}_configimg_reset`)
                                .setLabel(`Resetar`)
                                .setEmoji("<a:load:1241739159375188099>"),
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`${tabom}_config_outrasconfig`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>")
                            )
            
                            interaction.message.edit({ embeds: [embed], components: [row]})
                        } else {
                            msg12.edit(`${dbe.get(`13`)} | Envie um link válido!`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        }


                    })
                })
            }

            if (customId.endsWith('_config_thumb')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Mande o link da thumb aqui no chat!`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        if (message.content.startsWith('https://')) {
                            dbt.set(`${tabom}.thumb`, `${message.content}`)
                        
                            msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                            let banner = "";
                            if (dbt.get(`${tabom}.banner`)) {
                                banner = `[Clique aqui para ver](${dbt.get(`${tabom}.banner`)})`
                            } else {
                                banner = "\`Não Definido\`"
                            }
                            let thumb = "";
                            if (dbt.get(`${tabom}.thumb`)) {
                                thumb = `[Clique aqui para ver](${dbt.get(`${tabom}.thumb`)})`
                            } else {
                                thumb = "\`Não Definido\`"
                            }
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Imagens`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setDescription(`Envie o link das imagens para as modificações serem armazenadas.`)
                            .setColor(dbc.get(`color`) || "Default")
                            .addFields(
                                {
                                    name: `Banner:`,
                                    value: `${banner}`,
                                    inline:true
                                },
                                {
                                    name: `Thumbnail`,
                                    value: `${thumb}`,
                                    inline:true
                                }
                            )
            
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_config_banner`)
                                .setLabel(`Mudar Banner`),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_config_thumb`)
                                .setLabel(`Mudar Thumbnaill`),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${tabom}_configimg_reset`)
                                .setLabel(`Resetar`)
                                .setEmoji("<a:load:1241739159375188099>"),
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`${tabom}_config_outrasconfig`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row]})
                        } else {
                            msg12.edit(`${dbe.get(`13`)} | Envie um link válido!`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        }


                    })
                })
            }

            if (customId.endsWith('_config_voltar')) {
                if (dbt.get(`${option}.tipo`) === "button") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                    .setColor(dbc.get(`color`) || "Default")
                    .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                    .addFields(
                        {
                            name: `Nome do Painel:`,
                            value: `\`${option}\``,
                            inline:true
                        },
                        {
                            name: `Tipo do Painel:`,
                            value: `\`${dbt.get(`${option}.tipo`)}\``,
                            inline:true
                        },
                        {
                            name: `Categoria:`,
                            value: `${interaction.guild.channels.cache.get(dbt.get(`${option}.categoria`)) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                            inline:true
                        },
                        {name: ` `, value: ` `,inline:false},
                        {
                            name: `Título do Painel:`,
                            value: `${dbt.get(`${option}.title`)}`,
                            inline:false
                        },
                        {name: ` `,value: ` `,inline:false},
                        {
                            name: `Descrição do Painel:`,
                            value: `${dbt.get(`${option}.desc`)}`,
                            inline:false
                        }
                    )
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_title`)
                        .setLabel(`Mudar Título`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),  
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_button_voltar`)
                        .setLabel(`Configurar Botão`)
                        .setEmoji("<:gerenciar:1239447347055034421>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_outrasconfig`)
                        .setLabel(`Outras Configurações`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(3)
                        .setCustomId(`${option}_config_atualizar`)
                        .setLabel(`Atualizar Painel`)
                        .setEmoji("<a:load:1225477784743186472>"),
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltar_config`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                        new ButtonBuilder()
                        .setStyle(4)
                        .setCustomId(`${option}_config_del`)
                        .setEmoji("<:1166960963988230195:1239447625737048154>")
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})
                } else if (dbt.get(`${option}.tipo`) === "select") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                    .setColor(dbc.get(`color`) || "Default")
                    .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                    .addFields(
                        {
                            name: `Nome do Painel:`,
                            value: `\`${option}\``,
                            inline:true
                        },
                        {
                            name: `Tipo do Painel:`,
                            value: `\`${dbt.get(`${option}.tipo`)}\``,
                            inline:true
                        },
                        {
                            name: `Título do Painel:`,
                            value: `${dbt.get(`${option}.title`)}`,
                            inline:false
                        },
                        {name: ` `,value: ` `,inline:false},
                        {
                            name: `Descrição do Painel:`,
                            value: `${dbt.get(`${option}.desc`)}`,
                            inline:false
                        }
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_title`)
                        .setLabel(`Mudar Título`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),  
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_select`)
                        .setLabel(`Configurar Select`)
                        .setEmoji("<:gerenciar:1239447347055034421>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${option}_config_outrasconfig`)
                        .setLabel(`Outras Configurações`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(3)
                        .setCustomId(`${option}_config_atualizar`)
                        .setLabel(`Atualizar Painel`)
                        .setEmoji("<a:load:1225477784743186472>"),
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`voltar_config`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                        new ButtonBuilder()
                        .setStyle(4)
                        .setCustomId(`${option}_config_del`)
                        .setEmoji("<:1166960963988230195:1239447625737048154>")
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})
                }
            }

            if (customId.endsWith('_config_atualizar')) {
                interaction.deferUpdate()
                if (dbt.get(`${tabom}.tipo`) === "button") {

                    const embed = new EmbedBuilder()
                    .setTitle(`${dbt.get(`${tabom}.title`)}`)
                    .setDescription(`${dbt.get(`${tabom}.desc`)}`)
                    .setColor(dbc.get(`color`))

                    if (dbt.get(`${tabom}.banner`)) {
                        embed.setImage(dbt.get(`${tabom}.banner`))
                    }
                    if (dbt.get(`${tabom}.thumb`)) {
                        embed.setThumbnail(dbt.get(`${tabom}.thumb`))
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


                    const channel = interaction.guild.channels.cache.get(dbt.get(`${tabom}.idcanal`))
                    if (dbt.get(`${tabom}.modomsg`) === "ON") {
                        let options = {
                            embeds: [],
                            content: dbt.get(`${tabom}.desc`),
                            components: [row],
                            files: []
                        }
                        if (dbt.get(`${tabom}.banner`)) {
                            options.files = [dbt.get(`${tabom}.banner`)]
                        }
                        channel.messages.fetch(dbt.get(`${tabom}.idmsg`))
                        .then((message) => {
                            message.delete()
                            channel.send(options).then((msg) => {
                                dbt.set(`${tabom}.idmsg`, msg.id)
                                interaction.channel.send(`${dbe.get(`6`)} | Atualizado!!`).then((editedMessage) => {
                                    setTimeout(() => {
                                        editedMessage.delete().catch(console.error);
                                    }, 5000);
                                })
                           })
                        })
                        .catch(() => {
                            interaction.channel.send(`${dbe.get(`13`)} | Não foi possível atualizar a mensagem.`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        })
                    } else {
                        channel.messages.fetch(dbt.get(`${tabom}.idmsg`))
                        .then((message) => {
                            message.delete()
                            channel.send({ embeds: [embed], components: [row], files: [], content: ``}).then((msg) => {
                                dbt.set(`${tabom}.idmsg`, msg.id)
                                interaction.channel.send(`${dbe.get(`6`)} | Atualizado!!`).then((editedMessage) => {
                                    setTimeout(() => {
                                        editedMessage.delete().catch(console.error);
                                    }, 5000);
                                })
                            })
                        })
                        .catch(() => {
                            interaction.channel.send(`${dbe.get(`13`)} | Não foi possível atualizar a mensagem.`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        })
                    }
                } else if (dbt.get(`${tabom}.tipo`) === "select") {
                    const paineis = dbt.get(`${tabom}.select`);

                    if (!paineis || Object.keys(paineis).length === 0) {
                        interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Nenhum painel foi criado ainda!`})
                        return;
                    }
                    const embed = new EmbedBuilder()
                    .setTitle(`${dbt.get(`${tabom}.title`)}`)
                    .setDescription(`${dbt.get(`${tabom}.desc`)}`)
                    .setColor(dbc.get(`color`))

                    if (dbt.get(`${tabom}.banner`)) {
                        embed.setImage(dbt.get(`${tabom}.banner`))
                    }
                    if (dbt.get(`${tabom}.thumb`)) {
                        embed.setThumbnail(dbt.get(`${tabom}.thumb`))
                    }
        
                    const actionrowselect = new StringSelectMenuBuilder()
                    .setCustomId('select_ticket')
                    .setPlaceholder(dbt.get(`${tabom}.placeholder`))

                    
            
            
                    paineis.map((entry, index) => {
                        actionrowselect.addOptions(
                            {
                                label: `${entry.text}`,
                                description: `${entry.desc}`,
                                value: `${tabom}_${entry.id}`,
                                emoji: entry.emoji
                            }
                        )
                    })
            
                    const row = new ActionRowBuilder()
                    .addComponents(actionrowselect)
                    const channel = interaction.guild.channels.cache.get(dbt.get(`${tabom}.idcanal`))
                    
                    if (dbt.get(`${tabom}.modomsg`) === "ON") {
                        let options = {
                            embeds: [],
                            content: dbt.get(`${tabom}.desc`),
                            components: [row],
                            files: []
                        }
                        if (dbt.get(`${tabom}.banner`)) {
                            options.files = [dbt.get(`${tabom}.banner`)]
                        }
                        channel.messages.fetch(dbt.get(`${tabom}.idmsg`))
                        .then((message) => {
                            message.delete()
                            channel.send(options).then((msg) => {
                                dbt.set(`${tabom}.idmsg`, msg.id)
                                interaction.channel.send(`${dbe.get(`6`)} | Atualizado!!`).then((editedMessage) => {
                                    setTimeout(() => {
                                        editedMessage.delete().catch(console.error);
                                    }, 5000);
                                })
                           })
                        })
                        .catch(() => {
                            interaction.channel.send(`${dbe.get(`13`)} | Não foi possível atualizar a mensagem.`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        })
                    } else {
                        channel.messages.fetch(dbt.get(`${tabom}.idmsg`))
                        .then((message) => {
                            message.delete()
                            channel.send({ embeds: [embed], components: [row], files: [], content: ``}).then((msg) => {
                                dbt.set(`${tabom}.idmsg`, msg.id)
                                interaction.channel.send(`${dbe.get(`6`)} | Atualizado!!`).then((editedMessage) => {
                                    setTimeout(() => {
                                        editedMessage.delete().catch(console.error);
                                    }, 5000);
                                })
                            })
                        })
                        .catch(() => {
                            interaction.channel.send(`${dbe.get(`13`)} | Não foi possível atualizar a mensagem.`).then((editedMessage) => {
                                setTimeout(() => {
                                    editedMessage.delete().catch(console.error);
                                }, 5000); 
                            });
                        })
                    }
                }
            }

            if (customId.endsWith('_config_title')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Qual o novo título?`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        dbt.set(`${tabom}.title`, `${message.content}`)
                        msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                            setTimeout(() => {
                                editedMessage.delete().catch(console.error);
                            }, 5000); 
                        });
    
                        if (dbt.get(`${option}.tipo`) === "button") {
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Painel `, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setColor(dbc.get(`color`) || "Default")
                            .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                            .addFields(
                                {
                                    name: `Nome do Painel:`,
                                    value: `\`${option}\``,
                                    inline:true
                                },
                                {
                                    name: `Tipo do Painel:`,
                                    value: `\`${dbt.get(`${option}.tipo`)}\``,
                                    inline:true
                                },
                                {
                                    name: `Categoria:`,
                                    value: `${interaction.guild.channels.cache.get(dbt.get(`${option}.categoria`)) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                                    inline:true
                                },
                                {name: ` `, value: ` `,inline:false},
                                {
                                    name: `Título do Painel:`,
                                    value: `${dbt.get(`${option}.title`)}`,
                                    inline:false
                                },
                                {name: ` `,value: ` `,inline:false},
                                {
                                    name: `Descrição do Painel:`,
                                    value: `${dbt.get(`${option}.desc`)}`,
                                    inline:false
                                }
                            )
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_title`)
                                .setLabel(`Mudar Título`)
                                .setEmoji("<:prancheta:1243267310576341042>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_desc`)
                                .setLabel(`Mudar Descrição`)
                                .setEmoji("<:copy7:1225478184330596575>"),  
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_button_voltar`)
                                .setLabel(`Configurar Botão`)
                                .setEmoji("<:gerenciar:1239447347055034421>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_outrasconfig`)
                                .setLabel(`Outras Configurações`)
                                .setEmoji("<:1166960895201656852:1239447582464282674>"),
                                new ButtonBuilder()
                                .setStyle(3)
                                .setCustomId(`${option}_config_atualizar`)
                                .setLabel(`Atualizar Painel`)
                                .setEmoji("<a:load:1225477784743186472>"),
                            )
                            const row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`voltar_config`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>"),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${option}_config_del`)
                                .setEmoji("<:1166960963988230195:1239447625737048154>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row, row2]})
                        } else if (dbt.get(`${option}.tipo`) === "select") {
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setColor(dbc.get(`color`) || "Default")
                            .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                            .addFields(
                                {
                                    name: `Nome do Painel:`,
                                    value: `\`${option}\``,
                                    inline:true
                                },
                                {
                                    name: `Tipo do Painel:`,
                                    value: `\`${dbt.get(`${option}.tipo`)}\``,
                                    inline:true
                                },
                                {
                                    name: `Título do Painel:`,
                                    value: `${dbt.get(`${option}.title`)}`,
                                    inline:false
                                },
                                {name: ` `,value: ` `,inline:false},
                                {
                                    name: `Descrição do Painel:`,
                                    value: `${dbt.get(`${option}.desc`)}`,
                                    inline:false
                                }
                            )
        
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_title`)
                                .setLabel(`Mudar Título`)
                                .setEmoji("<:prancheta:1243267310576341042>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_desc`)
                                .setLabel(`Mudar Descrição`)
                                .setEmoji("<:copy7:1225478184330596575>"),  
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_select`)
                                .setLabel(`Configurar Select`)
                                .setEmoji("<:gerenciar:1239447347055034421>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_outrasconfig`)
                                .setLabel(`Outras Configurações`)
                                .setEmoji("<:1166960895201656852:1239447582464282674>"),
                                new ButtonBuilder()
                                .setStyle(3)
                                .setCustomId(`${option}_config_atualizar`)
                                .setLabel(`Atualizar Painel`)
                                .setEmoji("<a:load:1225477784743186472>"),
                            )
                            const row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`voltar_config`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>"),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${option}_config_del`)
                                .setEmoji("<:1166960963988230195:1239447625737048154>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row, row2]})
                        }
                    })
                })
            }
            if (customId.endsWith('_config_desc')) {
                interaction.deferUpdate();
                interaction.channel.send(`${dbe.get(`16`)} | Qual a nova descrição?`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        dbt.set(`${tabom}.desc`, `${message.content}`)
                        msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                            setTimeout(() => {
                                editedMessage.delete().catch(console.error);
                            }, 5000); 
                        });
    
                        if (dbt.get(`${option}.tipo`) === "button") {
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Painel `, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setColor(dbc.get(`color`) || "Default")
                            .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                            .addFields(
                                {
                                    name: `Nome do Painel:`,
                                    value: `\`${option}\``,
                                    inline:true
                                },
                                {
                                    name: `Tipo do Painel:`,
                                    value: `\`${dbt.get(`${option}.tipo`)}\``,
                                    inline:true
                                },
                                {
                                    name: `Categoria:`,
                                    value: `${interaction.guild.channels.cache.get(dbt.get(`${option}.categoria`)) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                                    inline:true
                                },
                                {name: ` `, value: ` `,inline:false},
                                {
                                    name: `Título do Painel:`,
                                    value: `${dbt.get(`${option}.title`)}`,
                                    inline:false
                                },
                                {name: ` `,value: ` `,inline:false},
                                {
                                    name: `Descrição do Painel:`,
                                    value: `${dbt.get(`${option}.desc`)}`,
                                    inline:false
                                }
                            )
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_title`)
                                .setLabel(`Mudar Título`)
                                .setEmoji("<:prancheta:1243267310576341042>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_desc`)
                                .setLabel(`Mudar Descrição`)
                                .setEmoji("<:copy7:1225478184330596575>"),  
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_button_voltar`)
                                .setLabel(`Configurar Botão`)
                                .setEmoji("<:gerenciar:1239447347055034421>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_outrasconfig`)
                                .setLabel(`Outras Configurações`)
                                .setEmoji("<:1166960895201656852:1239447582464282674>"),
                                new ButtonBuilder()
                                .setStyle(3)
                                .setCustomId(`${option}_config_atualizar`)
                                .setLabel(`Atualizar Painel`)
                                .setEmoji("<a:load:1225477784743186472>"),
                            )
                            const row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`voltar_config`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>"),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${option}_config_del`)
                                .setEmoji("<:1166960963988230195:1239447625737048154>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row, row2]})
                        } else if (dbt.get(`${option}.tipo`) === "select") {
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Painel`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setColor(dbc.get(`color`) || "Default")
                            .setDescription(`${dbe.get(`2`)} Selecione função que queira mudar com os botões logo abaixo.`)
                            .addFields(
                                {
                                    name: `Nome do Painel:`,
                                    value: `\`${option}\``,
                                    inline:true
                                },
                                {
                                    name: `Tipo do Painel:`,
                                    value: `\`${dbt.get(`${option}.tipo`)}\``,
                                    inline:true
                                },
                                {
                                    name: `Título do Painel:`,
                                    value: `${dbt.get(`${option}.title`)}`,
                                    inline:false
                                },
                                {name: ` `,value: ` `,inline:false},
                                {
                                    name: `Descrição do Painel:`,
                                    value: `${dbt.get(`${option}.desc`)}`,
                                    inline:false
                                }
                            )
        
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_title`)
                                .setLabel(`Mudar Título`)
                                .setEmoji("<:prancheta:1243267310576341042>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_desc`)
                                .setLabel(`Mudar Descrição`)
                                .setEmoji("<:copy7:1225478184330596575>"),  
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_select`)
                                .setLabel(`Configurar Select`)
                                .setEmoji("<:gerenciar:1239447347055034421>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${option}_config_outrasconfig`)
                                .setLabel(`Outras Configurações`)
                                .setEmoji("<:1166960895201656852:1239447582464282674>"),
                                new ButtonBuilder()
                                .setStyle(3)
                                .setCustomId(`${option}_config_atualizar`)
                                .setLabel(`Atualizar Painel`)
                                .setEmoji("<a:load:1225477784743186472>"),
                            )
                            const row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`voltar_config`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>"),
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`${option}_config_del`)
                                .setEmoji("<:1166960963988230195:1239447625737048154>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row, row2]})
                        }
                    })
                })
            }
            
        }

        if (interaction.isModalSubmit()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[0]
            const tabom2 = customId.split("_")[1]

            if (customId.endsWith("_configbutton_msgauto_alt_modal")) {
                const buttons = dbt.get(`${tabom}.buttons`)
                buttons.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const text = interaction.fields.getTextInputValue("text_modal");

                        const id = entry.id - 1
                        buttons[id].msg.mensagem = text

                        dbt.set(`${tabom}.buttons`, buttons)

                        interaction.reply({ content: `${dbe.get(`6`)} | Alterado!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete()
                            }, 5000);
                        })
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.message.edit({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_msgauto_alt_modal")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const text = interaction.fields.getTextInputValue("text_modal");

                        const id = entry.id - 1
                        select[id].msg.mensagem = text

                        dbt.set(`${tabom}.select`, select)

                        interaction.reply({ content: `${dbe.get(`6`)} | Alterado!`}).then(msg => {
                            setTimeout(() => {
                                msg.delete()
                            }, 5000);
                        })
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.message.edit({ embeds: [embed], components: [row]})
                    }
                })
            }
        }
        if (interaction.isChannelSelectMenu()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[0]
            const tabom2 = customId.split("_")[1]
            if (customId.endsWith("_button_category")) {
                const cargos = interaction.values
                cargos.map((cargos) => {
                    const id = customId.split("_")[1]
                    let buttonss = dbt.get(`${tabom}.buttons`) || [];
                    let elementIndex = id - 1

                    // Se o elemento for encontrado, edita-o
                    if (elementIndex !== -1) {
                        // Edita o elemento conforme necessário
                        buttonss[elementIndex].categoria = cargos;
                    }
                    dbt.set(`${tabom}.buttons`, buttonss)
                    interaction.reply({ content: `${dbe.get(`6`)} | Alterado com Sucesso!`, ephemeral:true})
                    
                    const buttons = dbt.get(`${tabom}.buttons`)
                    let entry = buttons[id]
                    let style = "";
                    buttons.map(entry => {
                        if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                            let style = "";
                            if (entry.style === 1) {
                                style = "\`🔵 Azul - 1\`"
                            }
                            if (entry.style === 2) {
                                style = "\`⚫ Cinza - 2\`"
                            }
                            if (entry.style === 3) {
                                style = "\`🟢 Verde - 3\`"
                            }
                            if (entry.style === 4) {
                                style = "\`🔴 Vermelho - 4\`"
                            }
                            const categoria = interaction.guild.channels.cache.get(entry.categoria)
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                            .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                            .setColor(dbc.get(`color`) || "Default")
                            .addFields(
                                {
                                    name: `Texto:`,
                                    value: `${entry.text}`,
                                    inline:true
                                },
                                {
                                    name: `Emoji:`,
                                    value: `${entry.emoji}`,
                                    inline: true
                                },
                                {
                                    name: `Cor:`,
                                    value: `${style}`,
                                    inline:true
                                },
                                {
                                    name: `Categoria:`,
                                    value: `${categoria || "\`Não Definido\`"}`,
                                    inline:true
                                }
                            )
            
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                                .setLabel(`Mudar Texto`)
                                .setEmoji("<:prancheta:1243267310576341042>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                                .setLabel(`Mudar Emoji`)
                                .setEmoji("<:emoji_47:1240119456236048476>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                                .setLabel(`Mudar Cor`)
                                .setEmoji(`<:emoji_46:1240119442722127872>`),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                                .setLabel(`Mudar Categoria`)
                                .setEmoji("<:emoji_4:1239445904826695750>"),
                                new ButtonBuilder()
                                .setStyle(2)
                                .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                                .setLabel(`Outras Opções`)
                                .setEmoji("<:1166960895201656852:1239447582464282674>")
                            )
                            const row2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(1)
                                .setCustomId(`${tabom}_config_button_voltar`)
                                .setLabel(`Voltar`)
                                .setEmoji("<:emoji_6:1239445960447361085>")
                            )
                            interaction.message.edit({ embeds: [embed], components: [row, row2]})
                        }
                    })
                })
            }
            if (customId.endsWith("_configsele_category")) {
                const cargos = interaction.values
                cargos.map((cargos) => {
                    let selectArray = dbt.get(`${tabom}.select`) || [];
                    const entry = selectArray.find(item => item.id === Number(tabom2));

                    // Encontra o elemento que deseja editar (por exemplo, pelo ID)
                    const elementIndex = selectArray.findIndex(element => element.id === Number(tabom2));

                    // Se o elemento for encontrado, edita-o
                    if (elementIndex !== -1) {
                        // Edita o elemento conforme necessário
                        selectArray[elementIndex].categoria = cargos;
                    }

                    // Define o array atualizado na base de dados
                    dbt.set(`${tabom}.select`, selectArray);
                    interaction.channel.send(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                        setTimeout(() => {
                            editedMessage.delete().catch(console.error);
                        }, 5000); 
                    });
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                    .setColor(dbc.get(`color`) || "Default")
                    .addFields(
                        {
                            name: `Texto:`,
                            value: `${entry.text}`,
                            inline:true
                        },
                        {
                            name: `Descrição:`,
                            value: `${entry.desc}`,
                            inline:true
                        },
                        {
                            name: `Emoji:`,
                            value: `${entry.emoji}`,
                            inline:true
                        },
                        {
                            name: `Categoria:`,
                            value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                            inline:true
                        },
                        {
                            name: `ID:`,
                            value: `${entry.id}`,
                            inline:true
                        },
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                        .setLabel(`Mudar Texto`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                        .setLabel(`Mudar Emoji`)
                        .setEmoji("<:emoji_47:1240119456236048476>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                        .setLabel(`Mudar Categoria`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                    )
                    interaction.update({ embeds: [embed], components: [row]})
                })
            }
        }
        if (interaction.isStringSelectMenu() && interaction.customId === "select_config_buttons") {
            const option = interaction.values[0];
            const tabom = option.split("_")[0];

            const buttons = dbt.get(`${tabom}.buttons`)

            buttons.map(entry => {
                if (option.endsWith(`_${entry.id}`)) {
                    let style = "";
                    if (entry.style === 1) {
                        style = "\`🔵 Azul - 1\`"
                    }
                    if (entry.style === 2) {
                        style = "\`⚫ Cinza - 2\`"
                    }
                    if (entry.style === 3) {
                        style = "\`🟢 Verde - 3\`"
                    }
                    if (entry.style === 4) {
                        style = "\`🔴 Vermelho - 4\`"
                    }
                    const categoria = interaction.guild.channels.cache.get(entry.categoria)
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Botão (${tabom})`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                    .setDescription(`Selecione abaixo qual botão você deseja configurar!`)
                    .setColor(dbc.get(`color`) || "Default")
                    .addFields(
                        {
                            name: `Texto:`,
                            value: `${entry.text}`,
                            inline:true
                        },
                        {
                            name: `Emoji:`,
                            value: `${entry.emoji}`,
                            inline: true
                        },
                        {
                            name: `Cor:`,
                            value: `${style}`,
                            inline:true
                        },
                        {
                            name: `Categoria:`,
                            value: `${categoria || "\`Não Definido\`"}`,
                            inline:true
                        }
                    )
    
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configbutton_text`)
                        .setLabel(`Mudar Texto`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configbutton_emoji`)
                        .setLabel(`Mudar Emoji`)
                        .setEmoji("<:emoji_47:1240119456236048476>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configbutton_cor`)
                        .setLabel(`Mudar Cor`)
                        .setEmoji(`<:emoji_46:1240119442722127872>`),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configbutton_categoria`)
                        .setLabel(`Mudar Categoria`)
                        .setEmoji("<:emoji_4:1239445904826695750>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configbutton_outrasopc`)
                        .setLabel(`Outras Opções`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>")
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`${tabom}_config_button_voltar`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>")
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})
                }
            })

        }
        if (interaction.isStringSelectMenu() && interaction.customId === "select_config_options") {
            const option = interaction.values[0];
            const tabom = option.split("_")[0];
            const paineis = dbt.get(`${tabom}.select`);

            paineis.map((entry, index) => {
                if (option.endsWith(`_${entry.id}`)) {

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                    .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                    .setColor(dbc.get(`color`) || "Default")
                    .addFields(
                        {
                            name: `Texto:`,
                            value: `${entry.text}`,
                            inline:true
                        },
                        {
                            name: `Descrição:`,
                            value: `${entry.desc}`,
                            inline:true
                        },
                        {
                            name: `Emoji:`,
                            value: `${entry.emoji}`,
                            inline:true
                        },
                        {
                            name: `Categoria:`,
                            value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                            inline:true
                        },
                        {
                            name: `ID:`,
                            value: `${entry.id}`,
                            inline:true
                        },
                    )

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                        .setLabel(`Mudar Texto`)
                        .setEmoji("<:prancheta:1243267310576341042>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                        .setLabel(`Mudar Descrição`)
                        .setEmoji("<:copy7:1225478184330596575>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                        .setLabel(`Mudar Emoji`)
                        .setEmoji("<:emoji_47:1240119456236048476>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                        .setLabel(`Mudar Categoria`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>"),
                        new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                        .setLabel(`Outras Opções`)
                        .setEmoji("<:1166960895201656852:1239447582464282674>")
                    )
                    const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(1)
                        .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                        .setLabel(`Voltar`)
                        .setEmoji("<:emoji_6:1239445960447361085>"),
                    )
                    interaction.update({ embeds: [embed], components: [row, row2]})

                }
            })

        }
        
        if (interaction.isButton()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[0];
            const tabom2 = customId.split("_")[1];

            if (customId.endsWith('_voltar_mapselect')) {
                const embed = new EmbedBuilder()
                .setTitle(`Configurando Select.`)
                .setDescription(`Selecione a opção de criação do ticket que deseja configurar`)
                .setColor(dbc.get(`color`) || "Default")

                const actionrowselect = new StringSelectMenuBuilder()
                .setCustomId('select_config_options')
                .setPlaceholder("Selecione uma opção para configurar")
                
                const paineis = dbt.get(`${tabom}.select`);
        
                paineis.map((entry, index) => {
                    actionrowselect.addOptions(
                        {
                            label: `Texto: ${entry.text}`,
                            description: `ID: ${entry.id}`,
                            value: `${tabom}_${entry.id}`,
                            emoji: entry.emoji
                        }
                    )
                })
        
                const row = new ActionRowBuilder()
                .addComponents(actionrowselect)

                const rowb = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(3)
                    .setCustomId(`${tabom}_add_option_select`)
                    .setLabel(`Add Nova Opção`)
                    .setEmoji("<:emoji_8:1239446048125222912>"),
                    new ButtonBuilder()
                    .setStyle(4)
                    .setCustomId(`${tabom}_sub_option_select`)
                    .setLabel(`Remover Opção`)
                    .setEmoji("<:emoji_9:1239446070774464532>"),
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_config_voltar`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [row, rowb]})
            }

            if (customId.endsWith('_configsele_text')) {
                interaction.deferUpdate()
                interaction.channel.send(`${dbe.get(`16`)} | Qual o novo texto?`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        // Obtém o array da base de dados
                        let selectArray = dbt.get(`${tabom}.select`) || [];

                        // Encontra o elemento que deseja editar (por exemplo, pelo ID)
                        const elementIndex = selectArray.findIndex(element => element.id === Number(tabom2));

                        // Se o elemento for encontrado, edita-o
                        if (elementIndex !== -1) {
                            // Edita o elemento conforme necessário
                            selectArray[elementIndex].text = message.content;
                        }

                        // Define o array atualizado na base de dados
                        dbt.set(`${tabom}.select`, selectArray);
                        msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                            setTimeout(() => {
                                editedMessage.delete().catch(console.error);
                            }, 5000); 
                        });
                        const entry = selectArray.find(item => item.id === Number(tabom2));

                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Texto:`,
                                value: `${entry.text}`,
                                inline:true
                            },
                            {
                                name: `Descrição:`,
                                value: `${entry.desc}`,
                                inline:true
                            },
                            {
                                name: `Emoji:`,
                                value: `${entry.emoji}`,
                                inline:true
                            },
                            {
                                name: `Categoria:`,
                                value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                                inline:true
                            },
                            {
                                name: `ID:`,
                                value: `${entry.id}`,
                                inline:true
                            },
                        )
    
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                            .setLabel(`Mudar Texto`)
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                            .setLabel(`Mudar Descrição`)
                            .setEmoji("<:copy7:1225478184330596575>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                            .setLabel(`Mudar Emoji`)
                            .setEmoji("<:emoji_47:1240119456236048476>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                            .setLabel(`Mudar Categoria`)
                            .setEmoji("<:1166960895201656852:1239447582464282674>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Outras Opções`)
                            .setEmoji("<:1166960895201656852:1239447582464282674>")
                        )
                        const row2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>"),
                        )
                        interaction.message.edit({ embeds: [embed], components: [row, row2]})
                    })
                })
            }
            if (customId.endsWith('_configsele_desc')) {
                interaction.deferUpdate()
                interaction.channel.send(`${dbe.get(`16`)} | Qual a nova descrição?`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        // Obtém o array da base de dados
                        let selectArray = dbt.get(`${tabom}.select`) || [];

                        // Encontra o elemento que deseja editar (por exemplo, pelo ID)
                        const elementIndex = selectArray.findIndex(element => element.id === Number(tabom2));

                        // Se o elemento for encontrado, edita-o
                        if (elementIndex !== -1) {
                            // Edita o elemento conforme necessário
                            selectArray[elementIndex].desc = message.content;
                        }

                        // Define o array atualizado na base de dados
                        dbt.set(`${tabom}.select`, selectArray);
                        msg12.edit(`${dbe.get(`6`)} | Alterado!`).then((editedMessage) => {
                            setTimeout(() => {
                                editedMessage.delete().catch(console.error);
                            }, 5000); 
                        });
                        const entry = selectArray.find(item => item.id === Number(tabom2));

                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Texto:`,
                                value: `${entry.text}`,
                                inline:true
                            },
                            {
                                name: `Descrição:`,
                                value: `${entry.desc}`,
                                inline:true
                            },
                            {
                                name: `Emoji:`,
                                value: `${entry.emoji}`,
                                inline:true
                            },
                            {
                                name: `Categoria:`,
                                value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                                inline:true
                            },
                            {
                                name: `ID:`,
                                value: `${entry.id}`,
                                inline:true
                            },
                        )
    
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                            .setLabel(`Mudar Texto`)
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                            .setLabel(`Mudar Descrição`)
                            .setEmoji("<:copy7:1225478184330596575>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                            .setLabel(`Mudar Emoji`)
                            .setEmoji("<:emoji_47:1240119456236048476>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                            .setLabel(`Mudar Categoria`)
                            .setEmoji("<:1166960895201656852:1239447582464282674>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Outras Opções`)
                            .setEmoji("<:1166960895201656852:1239447582464282674>")
                        )
                        const row2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>"),
                        )
                        interaction.message.edit({ embeds: [embed], components: [row, row2]})
                    })
                })
            }
            if (customId.endsWith("_configsele_voltarr")) {
                let selectArray = dbt.get(`${tabom}.select`) || [];
                const entry = selectArray.find(item => item.id === Number(tabom2));

                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                .setColor(dbc.get(`color`) || "Default")
                .addFields(
                    {
                        name: `Texto:`,
                        value: `${entry.text}`,
                        inline:true
                    },
                    {
                        name: `Descrição:`,
                        value: `${entry.desc}`,
                        inline:true
                    },
                    {
                        name: `Emoji:`,
                        value: `${entry.emoji}`,
                        inline:true
                    },
                    {
                        name: `Categoria:`,
                        value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                        inline:true
                    },
                    {
                        name: `ID:`,
                        value: `${entry.id}`,
                        inline:true
                    },
                )

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                    .setLabel(`Mudar Texto`)
                    .setEmoji("<:prancheta:1243267310576341042>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                    .setLabel(`Mudar Descrição`)
                    .setEmoji("<:copy7:1225478184330596575>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                    .setLabel(`Mudar Emoji`)
                    .setEmoji("<:emoji_47:1240119456236048476>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                    .setLabel(`Mudar Categoria`)
                    .setEmoji("<:1166960895201656852:1239447582464282674>"),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                    .setLabel(`Outras Opções`)
                    .setEmoji("<:1166960895201656852:1239447582464282674>")
                )
                const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                    .setLabel(`Voltar`)
                    .setEmoji("<:emoji_6:1239445960447361085>"),
                )
                interaction.update({ embeds: [embed], components: [row, row2]})
            }
            if (customId.endsWith('_configsele_emoji')) {
                interaction.deferUpdate()
                interaction.channel.send(`${dbe.get(`16`)} | Qual o novo emoji?`).then(msg12 => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        const newt = message.content
                        let selectArray = dbt.get(`${tabom}.select`) || [];
                        selectArray.map(entry => {
                            if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                                const id = entry.id - 1
                                
                                // Edita o elemento conforme necessário
                                const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    
    
                                if (newt.startsWith('<')) {
                                    selectArray[id].emoji = message.content;
                                    msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                } else if (emojiRegex.test(newt)) {
                                    selectArray[id].emoji = message.content;
                                    msg12.edit(`${dbe.get(`6`)} | Alterado com Sucesso!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                } else {
                                    msg12.edit(`${dbe.get(`13`)} | Emoji inválido!`).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 5000);
                                    })
                                }
                                dbt.set(`${tabom}.select`, selectArray);
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Configurando Select`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                                .setDescription(`Configure o seu select selecionando as opções abaixo.`)
                                .setColor(dbc.get(`color`) || "Default")
                                .addFields(
                                    {
                                        name: `Texto:`,
                                        value: `${entry.text}`,
                                        inline:true
                                    },
                                    {
                                        name: `Descrição:`,
                                        value: `${entry.desc}`,
                                        inline:true
                                    },
                                    {
                                        name: `Emoji:`,
                                        value: `${selectArray[id].emoji}`,
                                        inline:true
                                    },
                                    {
                                        name: `Categoria:`,
                                        value: `${interaction.guild.channels.cache.get(entry.categoria) || interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`)) || "\`Não Definido\`"}`,
                                        inline:true
                                    },
                                    {
                                        name: `ID:`,
                                        value: `${entry.id}`,
                                        inline:true
                                    },
                                )
            
                                const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configsele_text`)
                                    .setLabel(`Mudar Texto`)
                                    .setEmoji("<:prancheta:1243267310576341042>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configsele_desc`)
                                    .setLabel(`Mudar Descrição`)
                                    .setEmoji("<:copy7:1225478184330596575>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configsele_emoji`)
                                    .setLabel(`Mudar Emoji`)
                                    .setEmoji("<:emoji_47:1240119456236048476>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configsele_categoria`)
                                    .setLabel(`Mudar Categoria`)
                                    .setEmoji("<:1166960895201656852:1239447582464282674>"),
                                    new ButtonBuilder()
                                    .setStyle(2)
                                    .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                                    .setLabel(`Outras Opções`)
                                    .setEmoji("<:1166960895201656852:1239447582464282674>")
                                )
                                const row2 = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setStyle(1)
                                    .setCustomId(`${tabom}_${entry.id}_voltar_mapselect`)
                                    .setLabel(`Voltar`)
                                    .setEmoji("<:emoji_6:1239445960447361085>"),
                                )
                                interaction.message.edit({ embeds: [embed], components: [row, row2]})
                            }
                        })
                    })
                })
            }
            if (customId.endsWith("_configsele_outrasopc")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Outras Configurações`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Selecione abaixo as outras opções!`)
                        .addFields()
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modais`)
                            .setLabel("Configurar Modais")
                            .setEmoji("<:modal:1243284620779454534>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto`)
                            .setLabel("Mensagem Automática")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_voltarr`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_modais")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_modalfinalization")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.finaliza === "ON") {
                            select[id].finaliza = "OFF"
                            dbt.set(`${tabom}.select`, select)
                        } else {
                            select[id].finaliza = "ON"
                            dbt.set(`${tabom}.select`, select)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_modaldesc")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.desc === "ON") {
                            select[id].desc = "OFF"
                            dbt.set(`${tabom}.select`, select)
                        } else {
                            select[id].desc = "ON"
                            dbt.set(`${tabom}.select`, select)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_modalassunto")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.assunto === "ON") {
                            select[id].assunto = "OFF"
                            dbt.set(`${tabom}.select`, select)
                        } else {
                            select[id].assunto = "ON"
                            dbt.set(`${tabom}.select`, select)
                        }
                        let assunto = "`🔴 Desligado`"
                        let descticket = "`🔴 Desligado`"
                        let motivofinaliza = "`🔴 Desligado`"
                        if (entry.assunto === "ON") {
                            assunto = "`🟢 Ligado`"
                        }
                        if (entry.desc === "ON") {
                            descticket = "`🟢 Ligado`"
                        }
                        if (entry.finaliza === "ON") {
                            motivofinaliza = "`🟢 Ligado`"
                        }
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Configurando Modais`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure os sistemas de modais que serão perguntados nas criações dos Tickets!`)
                        .setColor(dbc.get(`color`) || "Default")
                        .addFields(
                            {
                                name: `Assunto Ticket:`,
                                value: `${assunto}`,
                                inline:false
                            },
                            {
                                name: `Descrição do Ticket:`,
                                value: `${descticket}`,
                                inline:false
                            },
                            {
                                name: `Motivo Finalização:`,
                                value: `${motivofinaliza}`,
                                inline:false
                            },
                        )
        
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.assunto === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalassunto`)
                            .setLabel(`Assunto do Ticket`)
                            .setEmoji(entry.assunto === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.desc === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modaldesc`)
                            .setLabel(`Descrição do ticket`)
                            .setEmoji(entry.desc === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(entry.finaliza === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_modalfinalization`)
                            .setLabel(`Finalização do ticket`)
                            .setEmoji(entry.finaliza === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_msgauto")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_msgauto_onoff")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        if (entry.msg.sistema === "ON") {
                            select[id].msg.sistema = "OFF"
                        } else {
                            select[id].msg.sistema = "ON"
                        }
                        dbt.set(`${tabom}.select`, select)
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith(`_configsele_msg_reset`)) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        let id = entry.id - 1
                        select[id].msg.mensagem = ""
                        select[id].msg.sistema = "ON"
                        dbt.set(`${tabom}.select`, select)
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Mensagem Automática`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                        .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                        .setDescription(`Configure a mensagem automática que será disparada após o usuário abrir o ticket.`)
                        .addFields(
                            {
                                name: `Mensagem:`,
                                value: `${entry.msg.mensagem || "`Mensagem Padrão`"}`,
                                inline:true
                            },
                            {
                                name: `Sistema:`,
                                value: `${entry.msg.sistema === "ON" ? "`🟢 Ligado`" : "`🔴 Desligado`"}`,
                                inline:true
                            }
                        )
                        .setColor(dbc.get(`color`) || "Default")

                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setStyle(entry.msg.sistema === "ON" ? 3 : 4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_onoff`)
                            .setLabel(entry.msg.sistema === "ON" ? "Sistema (Ligado)" : "Sistema (Desligado)")
                            .setEmoji(entry.msg.sistema === "ON" ? "<:on_mt:1232722645238288506>" : "<:off:1243274635748048937>"),
                            new ButtonBuilder()
                            .setStyle(2)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_alt`)
                            .setLabel("Mensagem ")
                            .setEmoji("<:prancheta:1243267310576341042>"),
                            new ButtonBuilder()
                            .setStyle(4)
                            .setCustomId(`${tabom}_${entry.id}_configsele_msg_reset`)
                            .setLabel("Resetar")
                            .setEmoji("<a:load:1225477784743186472>"),
                            new ButtonBuilder()
                            .setStyle(1)
                            .setCustomId(`${tabom}_${entry.id}_configsele_outrasopc`)
                            .setLabel(`Voltar`)
                            .setEmoji("<:emoji_6:1239445960447361085>")
                        )
                        interaction.update({ embeds: [embed], components: [row]})
                    }
                })
            }
            if (customId.endsWith("_configsele_msgauto_alt")) {
                const select = dbt.get(`${tabom}.select`)
                select.map(entry => {
                    if (customId.startsWith(`${tabom}_${entry.id}_`)) {
                        const modal = new ModalBuilder()
                        .setCustomId(`${tabom}_${entry.id}_configsele_msgauto_alt_modal`)
                        .setTitle("Alterar Mensagem Automática")

                        const text = new TextInputBuilder()
                        .setCustomId("text_modal")
                        .setLabel("Coloque a nova mensagem")
                        .setPlaceholder("Digite aqui ✏")
                        .setStyle(2)
                        .setValue(entry.msg.mensagem)
            
                        modal.addComponents(new ActionRowBuilder().addComponents(text))
                        
                        interaction.showModal(modal)
                    }
                })
            }
            if (customId.endsWith('_configsele_categoria')) {
                let selectArray = dbt.get(`${tabom}.select`) || [];
                const entry = selectArray.find(item => item.id === Number(tabom2));
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Configurando Botão`, iconURL: interaction.guild.iconURL({ dynamic: true})})
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic:true }))
                .setDescription(`Selecione abaixo a categoria que você quer para ser a de criação dos tickets.`)
                .setColor(dbc.get(`color`) || "Default")

                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.ChannelSelectMenuBuilder()
                    .setChannelTypes(Discord.ChannelType.GuildCategory)
                    .setCustomId(`${tabom}_${entry.id}_configsele_category`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione uma categoria...`),
                )
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(1)
                    .setCustomId(`${tabom}_${entry.id}_configsele_voltarr`)
                    .setEmoji("<:emoji_6:1239445960447361085>")
                )
                interaction.update({ embeds: [embed], components: [select, row]})
            }
        }
        
        if (interaction.customId === "voltar_config") {
            const paineis = dbt.all();

            if (!paineis || Object.keys(paineis).length === 0) {
                interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Nenhum painel foi criado ainda!`})
                return;
            }

            const actionrowselect = new StringSelectMenuBuilder()
            .setCustomId('select-config-painel')
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
            .setTitle(`Configurando Painel Ticket`)
            .setDescription(`Selecione abaixo qual painel você deseja configurar!`)
            .setColor(dbc.get(`color`) || "Default")
    
            interaction.update({ embeds: [embed], components: [selectMenu]})
        }
    }
}