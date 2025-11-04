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
        if (interaction.isStringSelectMenu() && interaction.customId === "select_ticket") {
            const option = interaction.values[0];
            const tabom = option.split("_")[0];
            const tabom2 = option.split("_")[1];
            const paineis = dbt.get(`${tabom}.select`);

            paineis.map(async(entry, index) => {
                if (option.endsWith(`_${entry.id}`)) {
                    const palmito = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                    const de = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
                    const frango = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                    if (!palmito) {
                        interaction.reply({ embeds: [
                            new Discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setTitle(`${dbe.get(`13`)} | Categoria Inválida`)
                            .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Categoria Ticket\`, coloque um id de uma categoria válida!`)
                        ], ephemeral: true})
                        return;
                    }
                    if (!de) {
                        interaction.reply({ embeds: [
                            new Discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setTitle(`${dbe.get(`13`)} | Cargo Staff Inválido`)
                            .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Cargo Staff\` e coloque um id de um cargo válido!`)
                        ], ephemeral: true})
                        return;
                    }
                    if (!frango) {
                        interaction.reply({ embeds: [
                            new Discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setTitle(`${dbe.get(`13`)} | Canal logs Inválido`)
                            .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Canal Logs\` e coloque um id de um canal válido!`)
                        ], ephemeral: true})
                        return;
                    }

                    const cleanUsername = interaction.user.username
                    .toLowerCase()
                    .replace(/[\s._]/g, "・");
                
                    const channel = interaction.guild.channels.cache.find((c) => c.name === `🎫・${cleanUsername}` && c.topic === interaction.user.id);
          
                    if (channel)
                    return interaction.reply({
                        embeds: [
                        new Discord.EmbedBuilder()
                            .setDescription(
                            `${dbe.get(`13`)} | ${interaction.user} Você já possui um ticket aberto em ${channel}.`
                            ),
                        ],
                        components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Ir para o seu Ticket")
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL(channel.url)
                            ),
                        ],
                        ephemeral: true,
                    });
                    const select = dbt.get(`${tabom}.select`)
                    const id = Number(tabom2) - 1
                    if (select[id].assunto === "ON" || dbt.get(`${tabom}.modal.assunto`) === "ON") {
                        const modal = new Discord.ModalBuilder()
                        .setCustomId(`${tabom}_${entry.id}_modal_ticket`)
                        .setTitle("DESCREVA O SEU TICKET!")
        
                        const text = new Discord.TextInputBuilder()
                        .setCustomId("motivo")
                        .setLabel("Descreva o motivo do ticket")
                        .setPlaceholder("Digite aqui")
                        .setStyle(1)
                        modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                        if (select[id].desc === "ON" || dbt.get(`${tabom}.modal.desc`) === "ON") {
                            const text2 = new Discord.TextInputBuilder()
                            .setCustomId("desc")
                            .setLabel("Descreva os detalhes do ticket")
                            .setPlaceholder("Digite aqui")
                            .setStyle(2)
                            .setRequired(false)

                            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text2))
                        }
            
                        
                        
                        return interaction.showModal(modal)
                    } else {
                        const motivo = "Não Escrito"
                        const permissionOverwrites = [
                            {
                                id: interaction.guild.id,
                                deny: ["ViewChannel"],
                            },
                            {
                                id: interaction.user.id,
                                allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions"],
                            },
                            {
                                id: dbc.get(`ticket.cargo_staff`),
                                allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions"],
                            },
                        ];
            
            
                        const msggg = await interaction.reply({
                            content:`Seu Ticket está sendo aberto, aguarde...`,
                            ephemeral:true
                        })
                        
                
        
                        let categoria = "";
        
                        if (dbt.get(`${tabom}.tipo`) === "button") {
                            if (dbt.get(`${tabom}.categoria`)) {
                                categoria = dbt.get(`${tabom}.categoria`)
                            } else {
                                categoria = dbc.get(`ticket.categoria`)
                            }
                        }
                        if (dbt.get(`${tabom}.tipo`) === "select") {
                            // Obtém o array da base de dados
                            let selectArray = dbt.get(`${tabom}.select`) || [];
        
                            // Encontra o elemento que deseja editar (por exemplo, pelo ID)
                            const elementIndex = selectArray.findIndex(element => element.id === Number(tabom2));
        
                            // Se o elemento for encontrado, edita-o
                            if (elementIndex !== -1) {
                                // Edita o elemento conforme necessário
                                if (selectArray[elementIndex].categoria) {
                                    categoria = selectArray[elementIndex].categoria
                                } else {
                                    categoria = dbc.get(`ticket.categoria`)
                                }
                            }
                        }
                        const palmito = await interaction.guild.channels.cache.get(categoria)
                        if (!palmito) {
                            msggg.edit({ content: ``, embeds: [
                                new Discord.EmbedBuilder()
                                .setColor('#ff0000')
                                .setTitle(`${dbe.get(`13`)} | Categoria Inválida`)
                                .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Categoria Ticket\`, coloque um id de uma categoria válida!`)
                            ], ephemeral: true})
                            return;
                        }
                        const cargo_staff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
                        const channel = await interaction.guild.channels.create({
                            name: `🎫・${interaction.user.username}`,
                            type: 0,
                            parent: categoria,
                            topic: interaction.user.id,
                            permissionOverwrites: permissionOverwrites,
                          }).then((channels) => {
                            msggg.edit({
                                content:`${dbe.get(`6`)} | ${interaction.user} Seu Ticket foi aberto no canal: ${channels.url}`,
                                components:[
                                    new Discord.ActionRowBuilder()
                                    .addComponents(
                                        new Discord.ButtonBuilder()
                                        .setStyle(5)
                                        .setURL(channels.url)
                                        .setLabel("Ir para o ticket")
                                    )
                                ], ephemeral:true
                            })
                            const aaaaa = channels.id
                            const user = interaction.user
        
                            
            
                            db.set(`${channels.id}`, {
                                usuario: user.id,
                                motivo:motivo,
                                desc: "Não Escrito",
                                painel: tabom,
                                idPainel: tabom2,
                                users: [],
                                codigo:aaaaa,
                                category: categoria,
                                horario1: `${Math.floor(new Date() / 1000)}`,
                                horario2: `${~~(new Date() / 1000)}`,
                                staff:"Ninguem Assumiu",
                                canal: channels.id,
                                logs: [],
                                logsUsers: []
                            })
                            
                            let desc = `${dbc.get(`painel.desc`)}`;
                            desc = desc.replace(`{codigo}`, interaction.channel.id);
                            desc = desc.replace(`{motivo}`, `${db.get(`${channels.id}.motivo`,)}`);
                            desc = desc.replace(`{desc}`, `${db.get(`${channels.id}.desc`,)}`);
                            desc = desc.replace(`{assumido}`, `${db.get(`${channels.id}.staff`,)}`);
                            desc = desc.replace(`{user}`, `<@${db.get(`${channels.id}.usuario`)}>`);
                            desc = desc.replace(`{horario2}`, `<t:${db.get(`${channels.id}.horario2`)}:R>`);
                            desc = desc.replace(`{horario1}`, `<t:${db.get(`${channels.id}.horario1`)}:f>`);
            
            
                            const embeds = new Discord.EmbedBuilder()
                            .setDescription(desc)
            
                            channels.send({
                                content:`# TICKET - ${db.get(`${channels.id}.codigo`)}\n${user}`,
                                embeds:[
                                    embeds
                                ],
                                components:[
                                    new Discord.ActionRowBuilder()
                                    .addComponents(
                                        new Discord.ButtonBuilder()
                                        .setCustomId("sair_ticket")
                                        .setLabel("Sair do ticket")
                                        .setEmoji(dbc.get(`painel.button.sair`))
                                        .setStyle(Discord.ButtonStyle.Danger),
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
                                        new Discord.ButtonBuilder()
                                        .setCustomId("ticket_assumir")
                                        .setLabel("Assumir Ticket")
                                        .setEmoji(dbc.get(`painel.button.assumir`))
                                        .setStyle(3),
                                        new Discord.ButtonBuilder()
                                        .setCustomId("ticket_finalizar")
                                        .setLabel("Finalizar Ticket")
                                        .setEmoji(dbc.get(`painel.button.finalizar`))
                                        .setStyle(Discord.ButtonStyle.Danger),
                                    )
                                ]
                            })
                            const chanal = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                            if(!chanal) return;
                            chanal.send({
                                embeds:[
                                    new Discord.EmbedBuilder()
                                    .setDescription(`${dbe.get(`1`)} TICKET **${aaaaa}** aberto por **${user.displayName}**, para acessar **[CLIQUE AQUI](${channels.url})**`)
                                    .setColor(dbc.get(`color`))
                                ]
                            })
                            channels.send(`Olá ${interaction.user} 👋. Por favor, adiante o **ASSUNTO** que você gostaria de discutir no ticket. Caso você não relate o assunto nós **FECHAREMOS O TICKET** depois de algum tempo.`)
                        }) 
                    }

                }
            })

        }

        if (interaction.isButton()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[1]
            const tabom2 = Number(customId.split("_")[0])

            if (customId.endsWith(`${dbt.get(`${tabom}.idpainel`)}`)) {
                const palmito = interaction.guild.channels.cache.get(dbc.get(`ticket.categoria`))
                const de = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
                const frango = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                if (!palmito) {
                  interaction.reply({ embeds: [
                    new Discord.EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(`${dbe.get(`13`)} | Categoria Inválida`)
                    .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Categoria Ticket\`, coloque um id de uma categoria válida!`)
                  ], ephemeral: true})
                  return;
                }
                if (!de) {
                  interaction.reply({ embeds: [
                    new Discord.EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(`${dbe.get(`13`)} | Cargo Staff Inválido`)
                    .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Cargo Staff\` e coloque um id de um cargo válido!`)
                  ], ephemeral: true})
                  return;
                }
                if (!frango) {
                  interaction.reply({ embeds: [
                    new Discord.EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(`${dbe.get(`13`)} | Canal logs Inválido`)
                    .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Canal Logs\` e coloque um id de um canal válido!`)
                  ], ephemeral: true})
                  return;
                }
                const cleanUsername = interaction.user.username
                .toLowerCase()
                .replace(/[\s._]/g, "・");
            
                const channel = interaction.guild.channels.cache.find(
                (c) => c.name === `🎫・${cleanUsername}`
                );
      
                if (channel)
                return interaction.reply({
                    embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(
                        `${dbe.get(`13`)} | ${interaction.user} Você já possui um ticket aberto em ${channel}.`
                        ),
                    ],
                    components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Ir para o seu Ticket")
                            .setStyle(Discord.ButtonStyle.Link)
                            .setURL(channel.url)
                        ),
                    ],
                    ephemeral: true,
                });
                const buttons = dbt.get(`${tabom}.buttons`)
                const id = Number(tabom2) - 1

                if (buttons[id].assunto === "ON" || dbt.get(`${tabom}.modal.assunto`) === "ON") {
    
                    const modal = new Discord.ModalBuilder().setCustomId(`${tabom}_${tabom2}_modal_ticket`).setTitle("Descreva o motivo do ticket")
        
                    const text = new Discord.TextInputBuilder()
                    .setCustomId("motivo")
                    .setLabel("Descreva o motivo do ticket")
                    .setPlaceholder("Digite aqui")
                    .setStyle(1)
        
                    modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                    if (buttons[id].desc === "ON" || dbt.get(`${tabom}.modal.desc`) === "ON") {
                        const text2 = new Discord.TextInputBuilder()
                        .setCustomId("desc")
                        .setLabel("Descreva os detalhes do ticket")
                        .setPlaceholder("Digite aqui")
                        .setStyle(2)
                        .setRequired(false)

                        modal.addComponents(new Discord.ActionRowBuilder().addComponents(text2))
                    }
        
                    
                    
                    return interaction.showModal(modal)
                } else {
                    const motivo = "Não Escrito"
                    const permissionOverwrites = [
                        {
                            id: interaction.guild.id,
                            deny: ["ViewChannel"],
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions"],
                        },
                        {
                            id: dbc.get(`ticket.cargo_staff`),
                            allow: ["ViewChannel", "SendMessages", "AttachFiles", "AddReactions"],
                        },
                    ];
        
        
                    const msggg = await interaction.reply({
                        content:`Seu Ticket está sendo aberto, aguarde...`,
                        ephemeral:true
                    })
                    
            
    
                    let categoria = "";
    
                    if (dbt.get(`${tabom}.tipo`) === "button") {
                        let buttons = []
                        const id = await Number(tabom2) - 1
                        buttons = dbt.get(`${tabom}.buttons`)[id]
    
                        if (await buttons.categoria) {
                            categoria = await buttons.categoria
                            
                        } else {
                            categoria = await dbc.get(`ticket.categoria`)
                        }
                    }
                    const palmito = await interaction.guild.channels.cache.get(categoria)
                    if (!palmito) {
                        msggg.edit({ content: ``, embeds: [
                            new Discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setTitle(`${dbe.get(`13`)} | Categoria Inválida`)
                            .setDescription(`Configure o bot direito! Dê o comando \`/botconfig\` e vá em \`Principais\` e selecione a opção \`Categoria Ticket\`, coloque um id de uma categoria válida!`)
                        ], ephemeral: true})
                        return;
                    }
                    const cargo_staff = interaction.guild.roles.cache.get(dbc.get(`ticket.cargo_staff`))
                    const channel = await interaction.guild.channels.create({
                        name: `🎫・${interaction.user.username}`,
                        type: 0,
                        parent: categoria,
                        topic: interaction.user.id,
                        permissionOverwrites: permissionOverwrites,
                      }).then((channels) => {
                        msggg.edit({
                            content:`${dbe.get(`6`)} | ${interaction.user} Seu Ticket foi aberto no canal: ${channels.url}`,
                            components:[
                                new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                    .setStyle(5)
                                    .setURL(channels.url)
                                    .setLabel("Ir para o ticket")
                                )
                            ], ephemeral:true
                        })
                  
                        const aaaaa = channels.id
                        const user = interaction.user
    
                        
        
                        db.set(`${channels.id}`, {
                            usuario: user.id,
                            motivo:motivo,
                            desc: "Não Escrito",
                            painel: tabom,
                            idPainel: tabom2,
                            codigo:aaaaa,
                            users: [],
                            category: categoria,
                            idbutton: Number(tabom2),
                            horario1: `${Math.floor(new Date() / 1000)}`,
                            horario2: `${~~(new Date() / 1000)}`,
                            staff:"Ninguem Assumiu",
                            canal: channels.id,
                            logs: [],
                            logsUsers: []
                        })
                        
                        let desc = `${dbc.get(`painel.desc`)}`;
                        desc = desc.replace(`{codigo}`, aaaaa);
                        desc = desc.replace(`{motivo}`, `${db.get(`${channels.id}.motivo`,)}`);
                        desc = desc.replace(`{desc}`, `${db.get(`${channels.id}.desc`,)}`);
                        desc = desc.replace(`{assumido}`, `${db.get(`${channels.id}.staff`,)}`);
                        desc = desc.replace(`{user}`, `<@${db.get(`${channels.id}.usuario`)}>`);
                        desc = desc.replace(`{horario2}`, `<t:${db.get(`${channels.id}.horario2`)}:R>`);
                        desc = desc.replace(`{horario1}`, `<t:${db.get(`${channels.id}.horario1`)}:f>`);
        
        
                        const embeds = new Discord.EmbedBuilder()
                        .setDescription(desc)
        
                        channels.send({
                            content:`# TICKET - ${db.get(`${channels.id}.codigo`)}\n${user}`,
                            embeds:[
                                embeds
                            ],
                            components:[
                                new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                    .setCustomId("sair_ticket")
                                    .setLabel("Sair do ticket")
                                    .setEmoji(dbc.get(`painel.button.sair`))
                                    .setStyle(Discord.ButtonStyle.Danger),
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
                                    new Discord.ButtonBuilder()
                                    .setCustomId("ticket_assumir")
                                    .setLabel("Assumir Ticket")
                                    .setEmoji(dbc.get(`painel.button.assumir`))
                                    .setStyle(3),
                                    new Discord.ButtonBuilder()
                                    .setCustomId("ticket_finalizar")
                                    .setLabel("Finalizar Ticket")
                                    .setEmoji(dbc.get(`painel.button.finalizar`))
                                    .setStyle(Discord.ButtonStyle.Danger),
                                )
                            ]
                        })
                        const chanal = interaction.guild.channels.cache.get(dbc.get(`ticket.canal_logs`))
                        if(!chanal) return;
                        chanal.send({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get(`1`)} TICKET **${aaaaa}** aberto por **${user.displayName}**, para acessar **[CLIQUE AQUI](${channels.url})**`)
                                .setColor(dbc.get(`color`))
                            ]
                        })
                        
                        if (dbt.get(`${tabom}.tipo`) === "button") {
                            const buttons = dbt.get(`${tabom}.buttons`)
                            const id = Number(tabom2) - 1
    
                            if (buttons[id].msg.sistema === "ON") {
                                let desc = `${buttons[id].msg.mensagem}`;
                                desc = desc.replace(`{codigo}`, interaction.channel.id);
                                desc = desc.replace(`{motivo}`, `${db.get(`${channels.id}.motivo`,)}`);
                                desc = desc.replace(`{desc}`, `${db.get(`${channels.id}.desc`,)}`);
                                desc = desc.replace(`{assumido}`, `${db.get(`${channels.id}.staff`,)}`);
                                desc = desc.replace(`{user}`, `<@${db.get(`${channels.id}.usuario`)}>`);
                                desc = desc.replace(`{horario2}`, `<t:${db.get(`${channels.id}.horario2`)}:R>`);
                                desc = desc.replace(`{horario1}`, `<t:${db.get(`${channels.id}.horario1`)}:f>`);
                                channels.send(`${desc || `Olá ${interaction.user} 👋. Por favor, adiante o **ASSUNTO** que você gostaria de discutir no ticket. Caso você não relate o assunto nós **FECHAREMOS O TICKET** depois de algum tempo.`}`)
                            }
                        } else {
                            channels.send(`Olá ${interaction.user} 👋. Por favor, adiante o **ASSUNTO** que você gostaria de discutir no ticket. Caso você não relate o assunto nós **FECHAREMOS O TICKET** depois de algum tempo.`)
                        }
                    })    
                }
            }
        }
    }
}