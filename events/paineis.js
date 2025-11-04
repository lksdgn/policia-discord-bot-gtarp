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
    name: 'interactionCreate',

    run: async (interaction, client) => {
        if (interaction.customId === "painel_staff"){
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
          
            const hasRequiredRole = user1.roles.cache.has(dbc.get(`ticket.cargo_staff`));
          
            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            interaction.reply({
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId(`painel_stafff`)
                        .setPlaceholder(`Selecione uma opção...`)
                        .addOptions(
                            {
                                label: `Chamar Usuário`,
                                description: `O BOT envia uma notificação para o usuário que abriu o ticket.`,
                                value: `chamar_userrr`,
                                emoji: "📋"
                            },
                            {
                                label: `Adicionar um usuario`,
                                description: `O BOT adiciona um usuário de sua escolha no ticket.`,
                                value: `add_userrr`,
                                emoji: "📋"
                            },
                            {
                                label: `Remover um usuario`,
                                description: `O BOT remove um usuário de sua escolha do ticket.`,
                                value: `remove_userrr`,
                                emoji: "📋"
                            },
                            {
                                label: `Mudar nome do Canal`,
                                description: `Mude o nome do canal do ticket.`,
                                value: `mudar_name_channel`,
                                emoji: "📋"
                            },
                            {
                                label: `Criar canal de voz`,
                                description: `Crie um canal de voz para conversar com o usuário do ticket.`,
                                value: `create_call`,
                                emoji: "📋"
                            },
                        )
                    )
                ], ephemeral:true
            })
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "painel_stafff") {
            const option = interaction.values[0];

            if (option === "create_call") {
                const tickets = await db.get(`${interaction.channel.id}`)
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
                const options = [
                    {
                        id: interaction.guild.id,
                        deny: [
                            PermissionsBitField.Flags.ViewChannel,
                        ],
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Connect
                        ],
                    },
                    {
                        id: user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Connect
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Connect
                        ],
                    },
                ]
                let users = db.get(`${interaction.channel.id}.users`)
                if (users.length >= 1) {
                    users.map(users => {
                        options.push(
                            {
                                id: users,
                                allow: [
                                    PermissionsBitField.Flags.ViewChannel,
                                    PermissionsBitField.Flags.Connect
                                ],
                            }
                        )
                    })
                }
                const channel = await interaction.guild.channels.create({
                    name: `📞・${user.displayName}`,
                    type: 2,
                    parent: db.get(`${interaction.channel.id}.category`),
                    permissionOverwrites: options
                }).then(async(channel) => {
                    const embed = new EmbedBuilder()
                    .setTitle(`📞 Canal de Voz Criado!`)
                    .setDescription(`- Acesse o canal de voz em ${channel.url}! Convese e resolva os seus problemas.`)
                    .setColor(dbc.get(`color`))
                    .setTimestamp()
                    
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setStyle(5)
                        .setLabel(`Acessar Canal de Voz`)
                        .setEmoji("📋")
                        .setURL(channel.url),
                        new ButtonBuilder()
                        .setStyle(4)
                        .setCustomId("delete_call")
                        .setLabel(`Deletar Canal de Voz`)
                    )
                    interaction.channel.send({ embeds: [embed], components: [row]}).then(async() => {
                        interaction.reply({ content: `${dbe.get(`6`)} | Canal de voz criado com sucesso!`, ephemeral:true})
                        db.set(`${interaction.channel.id}.call`, channel.id)
                    }).catch(async(err) => {
                        console.log(err)
                        interaction.reply({ content: `${dbe.get(`13`)} | Canal de voz não foi criado! Peça suporte para a **Hex Community** para saber o motivo.`, ephemeral:true})
                    })
                    
                }).catch(async(err) => {
                    console.log(err)
                    interaction.reply({ content: `${dbe.get(`13`)} | Canal de voz não foi criado! Peça suporte para a **Hex Community** para saber o motivo.`, ephemeral:true})
                })
            }
            if (option === "mudar_name_channel") {
                const modal = new Discord.ModalBuilder()
                .setCustomId(`modal_mudarnamechannel`)
                .setTitle("novo nome ticket")
            
                const text = new Discord.TextInputBuilder()
                .setCustomId("p1")
                .setLabel("Coloque o novo nome")
                .setValue(`🎫・`)
                .setPlaceholder("Digite aqui")
                .setStyle(1)
    
                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                
                return interaction.showModal(modal)
            }

            if (option === "chamar_userrr") {
                const tickets = await db.get(`${interaction.channel.id}`)
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
                if (user){
                    user.send({
                        embeds:[
                            new Discord.EmbedBuilder()
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setTitle(`Ticket | Notificação`)
                            .setDescription(`${dbe.get("31")} | Olá ${user}, Seu ticket foi respondido por ${interaction.user}, para ir até ele, clique no botão abaixo!`)
                            .setColor(dbc.get(`color`))
                        ],
                        components:[
                            new Discord.ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setLabel(`Ir para o Ticket`)
                                .setStyle(5)
                                .setURL(interaction.channel.url)
                            )
                        ]
                    }).then(async() => {
                        await interaction.channel.send({
                            content: `${user}`,
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get("32")} | ${user}, o staff ${interaction.user} quer uma resposta de você!`)
                                .setColor(dbc.get(`color`))
                            ],
                        })
                        await interaction.update({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get("6")} | ${interaction.user}, menssagem enviada com sucesso!`)
                                .setColor("Green")
                            ],
                            components: [],
                            ephemeral:true
                        })
                        return;
                    }).catch(async() => {
                        await interaction.update({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get("13")} | ${interaction.user}, Ocorreu um erro ao notificar o usuário na DM!`)
                                .setColor("Red")
                            ],
                            components: [],
                            ephemeral:true
                        })
                        return;
                    })
                } else {
                    interaction.reply({
                        content:`${dbe.get(`13`)} | Ocorreu um erro ao utilizar essa função!`,
                        ephemeral:true
                    })
                }
            }
            if (option === "add_userrr") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.UserSelectMenuBuilder()
                    .setCustomId(`add_user__`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um usuário...`),
                )
                interaction.update({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${dbe.get(`34`)}  Gerenciando Usuários no Ticket`)
                        .setDescription(`${dbe.get(`29`)} Selecione abaixo no SELECT MENU quem você deseja adicionar ao ticket\n\n${dbe.get(`2`)} Lembre-se, ao adicionar o membro, ele terá permissão de visualizar o ticket e será avisado no privado\n\n${dbe.get(`1`)} Caso queira REMOVER do canal, use a opção REMOVER USUÁRIO`)
                        .setColor(dbc.get(`color`))
                    ],
                    components: [select],
                    ephemeral:true
                })
            }
    
            if (option === "remove_userrr") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.UserSelectMenuBuilder()
                    .setCustomId(`remove_user__`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um usuário...`),
                )
                interaction.update({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${dbe.get(`34`)}  Gerenciando Usuários no Ticket`)
                        .setDescription(`${dbe.get(`29`)} Selecione abaixo no SELECT MENU quem você deseja remover ao ticket\n\n${dbe.get(`2`)} Lembre-se, ao remover o membro, ele perderá permissão de visualizar o ticket e será avisado no privado\n\n${dbe.get(`1`)} Caso queira ADICIONAR novamente ao canal, use a opção ADICIONAR USUÁRIO`)
                        .setColor(dbc.get(`color`))
                    ],
                    components: [select],
                    ephemeral:true
                })
            }
        }
        if (interaction.customId === "delete_call") {
            const user1 = interaction.guild.members.cache.get(interaction.user.id);
          
            const hasRequiredRole = user1.roles.cache.has(dbc.get(`ticket.cargo_staff`));
          
            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }
            const canal = interaction.guild.channels.cache.get(db.get(`${interaction.channel.id}.call`))
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setStyle(4)
                .setCustomId(`${interaction.message.id}_delete_call2`)
                .setLabel(`Deletar Canal de Voz`)
            )
            interaction.reply({ content: `${dbe.get(`1`)} Tem certeza em apagar o canal de voz ${canal.url}?`, components:[row], ephemeral:true})
        }
        if (interaction.isButton()) {
            const customId = interaction.customId;
            const msgId = customId.split("_")[0]
            if (customId.endsWith("_delete_call2")) {
                const canal = interaction.guild.channels.cache.get(db.get(`${interaction.channel.id}.call`))
                canal.delete().then(async() => {
                    const embed = new EmbedBuilder()
                    .setTitle(`📞 Canal de Voz Apagado!`)
                    .setDescription(`- Canal de voz **${canal.name}** apagado com sucesso!`)
                    .setColor(dbc.get(`color`))
                    .setTimestamp()
                    
                    interaction.channel.send({ embeds: [embed]}).then(async() => {
                        interaction.update({ content: `${dbe.get(`6`)} | Canal de voz apagado com sucesso!`, components:[], ephemeral:true})
                        interaction.channel.messages.fetch(msgId).then(msg => {
                            msg.delete()
                        })
                        db.delete(`${interaction.channel.id}.call`)
                    }).catch(async() => {
                        console.error()
                        interaction.reply({ content: `${dbe.get(`6`)} | Canal de voz não foi apagado! Peça suporte para a **Hex Community** para saber o motivo.`, ephemeral:true})
                    })
                }).catch(async() => {
                    console.error()
                    interaction.reply({ content: `${dbe.get(`6`)} | Canal de voz não foi apagado! Peça suporte para a **Hex Community** para saber o motivo.`, ephemeral:true})
                })
            }
        }

        if (interaction.isModalSubmit() && interaction.customId === "modal_mudarnamechannel") {
            const nome = interaction.fields.getTextInputValue("p1");

            interaction.channel.edit({ name: nome}).then(async() => {
                interaction.reply({ content: `${dbe.get(`6`)} | Nome do canal alterado!`, embeds: [], ephemeral:true, components: []})
                interaction.channel.send({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(`${dbe.get(`2`)} | Nome do canal alterado para \`${nome}\`!`),
                    ],
                    components: [],
                    ephemeral: true,
                });
            }).catch(async() => {
                interaction.update({ content: `${dbe.get(`13`)} | Não foi possível alterar o nome do canal. Tente novamente mais tarde.`, ephemeral:true, components: [], embeds: []})
            })
        }

        if (interaction.isUserSelectMenu() && interaction.customId === "add_user__") {
            const tickets = await db.get(`${interaction.channel.id}`) 
            const usuario = tickets.usuario
            const user = interaction.guild.members.cache.get(usuario)
            const motivo = tickets.motivo
            const codigo = tickets.codigo
            const staff = interaction.guild.members.cache.get(tickets.staff)
            const cargos = interaction.values
            cargos.map((cargos) => {
                const user_content = cargos
                const user_collected = interaction.guild.members.cache.get(user_content);
                if (user_collected.id === usuario) return interaction.update({
                    content: `${dbe.get(`13`)} | Não é possível remover o dono do ticket!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
                if (!user_collected)
                  return interaction.update({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(
                            `${dbe.get(`13`)} | Não foi possível encontrar o usuário \`${user_content}\`, tente novamente!`
                        ),
                    ],
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
      
                if (interaction.channel.permissionsFor(user_collected.id).has("ViewChannel"))  return interaction.update({content: `${dbe.get(`2`)} | O usuário ${user_collected}(\`${user_collected.id}\`) já possui acesso ao ticket!`,components: [],ephemeral: true,});
                db.push(`${interaction.channel.id}.users`, user_collected.id)
                const permissionOverwrites = [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: user.id,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                ];
                const users = db.get(`${interaction.channel.id}.users`)
                if (users.length >= 1) {
                    users.map(users => {
                        permissionOverwrites.push(
                            {
                                id: users,
                                allow: [
                                    "ViewChannel",
                                    "SendMessages",
                                    "AttachFiles",
                                    "AddReactions",
                                    "ReadMessageHistory",
                                ],
                            }
                        )
                    })
                }

                interaction.channel.edit({permissionOverwrites: permissionOverwrites,});
      
                interaction.update({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(`${dbe.get(`6`)} | O usuário ${user_collected}(\`${user_collected.id}\`) foi adicionado com sucesso!`),
                    ],
                    components: [],
                    ephemeral: true,
                });
                interaction.channel.send({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(`${dbe.get(`2`)} | O usuário ${user_collected}(\`${user_collected.id}\`) foi adicionado ao ticket!`),
                    ],
                    components: [],
                });
            })
        }

        if (interaction.isUserSelectMenu() && interaction.customId === "remove_user__") {
            const tickets = await db.get(`${interaction.channel.id}`) 
            const usuario = tickets.usuario
            const user = interaction.guild.members.cache.get(usuario)
            const motivo = tickets.motivo
            const codigo = tickets.codigo
            const staff = interaction.guild.members.cache.get(tickets.staff)
            const cargos = interaction.values
            cargos.map((cargos) => {
                const user_content = cargos
                const user_collected = interaction.guild.members.cache.get(user_content);
                if (user_collected.id === usuario) return interaction.update({
                    content: `${dbe.get(`13`)} | Não é possível remover o dono do ticket!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
                if (!user_collected) return interaction.update({
                    content: `${dbe.get(`13`)} | Não foi possível encontrar o usuário \`${user_content}\`, tente novamente!`,
                    components: [],
                    ephemeral: true,
                });
      
                if (!interaction.channel.permissionsFor(user_collected.id).has("ViewChannel"))return interaction.update({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(
                            `${dbe.get(`13`)} | O usuário ${user_collected} (\`${user_collected.id}\`) não possui acesso ao ticket!`
                        ),
                    ],
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });

                const users = db.get(`${interaction.channel.id}.users`)

                const usersId = users.findIndex(user => user === user_collected.id);

                users.splice(usersId, 1);
                db.set(`${interaction.channel.id}.users`, users)
                

                const cargoIDs = dbc.get(`ticket.cargo_staff`);
                const permissionOverwrites = [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: user_collected.id,
                        denny: ["ViewChannel"],
                    },
                    {
                        id: user.id,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                    {
                        id: cargoIDs,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                ];
                if (users.length >= 1) {
                    users.map(users => {
                        permissionOverwrites.push(
                            {
                                id: users,
                                allow: [
                                    "ViewChannel",
                                    "SendMessages",
                                    "AttachFiles",
                                    "AddReactions",
                                    "ReadMessageHistory",
                                ],
                            }
                        )
                    })
                }
              
                interaction.channel.edit({permissionOverwrites: permissionOverwrites,});

                interaction.update({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(`${dbe.get(`6`)} | O usuário ${user_collected} (\`${user_collected.id}\`) foi removido com sucesso!`),
                    ],
                    components: [],
                    ephemeral: true,
                });
                interaction.channel.send({
                    embeds: [
                        new Discord.EmbedBuilder().setDescription(`${dbe.get(`2`)} | O usuário ${user_collected}(\`${user_collected.id}\`) foi removido do ticket!`),
                    ],
                    components: [],
                });
            })
        }
        if (interaction.customId === "painel_member"){
            interaction.reply({
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId(`painel_usuario`)
                        .setPlaceholder(`Selecione uma opção...`)
                        .addOptions(
                            {
                                label: `Chamar Staff`,
                                description: `É enviada uma notificação para o staff que ASSUMIU o ticket.`,
                                value: `chamar_staff`,
                                emoji: "📋"
                            },
                            {
                                label: `Adicionar um usuario`,
                                description: `O BOT adiciona um usuário de sua escolha no ticket.`,
                                value: `add_user_usuario`,
                                emoji: "📋"
                            },
                            {
                                label: `Remover um usuario`,
                                description: `O BOT remove um usuário de sua escolha do ticket.`,
                                value: `remove_user_usuario`,
                                emoji: "📋"
                            },
                        ),
                    )
                ], ephemeral:true
            })
        }

        if (interaction.isUserSelectMenu() && interaction.customId === "add_user_usuariok") {
            const cargos = interaction.values
            cargos.map((cargos) => {
                const embed = new EmbedBuilder()
                .setTitle(`${dbe.get(`1`)} Requisição Adicionar Membro`)
                .setDescription(`${dbe.get(`34`)} O Usuário ${interaction.user} está querendo adicionar o MEMBRO <@${cargos}> ao TICKET`)
                .setColor(dbc.get(`color`) || `Default`)

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${cargos}_add_user_aceitar`)
                    .setLabel(`Aceitar Adição`)
                    .setEmoji(dbe.get(`6`)),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`_user_negar`)
                    .setLabel(`Negar`)
                    .setEmoji(dbe.get(`13`))
                )

                interaction.update({ content: `${dbe.get(`6`)} | Requisição enviada com sucesso!`, embeds: [], components: [], ephemeral:true})

                interaction.channel.send({ embeds: [embed], components: [row]})
            })
        }

        if (interaction.isUserSelectMenu() && interaction.customId === "remove_user_usuariok") {
            const cargos = interaction.values
            cargos.map((cargos) => {
                const embed = new EmbedBuilder()
                .setTitle(`${dbe.get(`1`)} Requisição Adicionar Membro`)
                .setDescription(`${dbe.get(`34`)} O Usuário ${interaction.user} está querendo remover o MEMBRO <@${cargos}> do TICKET`)
                .setColor(dbc.get(`color`) || `Default`)

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`${cargos}_sub_user_aceitar`)
                    .setLabel(`Aceitar Adição`)
                    .setEmoji(dbe.get(`6`)),
                    new ButtonBuilder()
                    .setStyle(2)
                    .setCustomId(`_user_negar`)
                    .setLabel(`Negar`)
                    .setEmoji(dbe.get(`13`))
                )

                interaction.update({ content: `${dbe.get(`6`)} | Requisição enviada com sucesso!`, embeds: [], components: [], ephemeral:true})

                interaction.channel.send({ embeds: [embed], components: [row]})
            })
        }

        if (interaction.isButton()) {
            const customId = interaction.customId;
            const tabom = customId.split("_")[0];

            if (customId === "_user_negar") {
                const tickets = await db.get(`${interaction.channel.id}`) 
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
                const user1 = interaction.guild.members.cache.get(interaction.user.id);
          
                const hasRequiredRole = user1.roles.cache.has(dbc.get(`ticket.cargo_staff`));
              
                if (!hasRequiredRole) {
                    await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                    return;
                }
                interaction.update({ content: `${dbe.get(`6`)} | A requisição foi negada!`})
            }

            if (customId.endsWith('_sub_user_aceitar')) {
                const tickets = await db.get(`${interaction.channel.id}`) 
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
                const user1 = interaction.guild.members.cache.get(interaction.user.id);
          
                const hasRequiredRole = user1.roles.cache.has(dbc.get(`ticket.cargo_staff`));
              
                if (!hasRequiredRole) {
                    await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                    return;
                }
                const user_content = tabom
                const user_collected = interaction.guild.members.cache.get(user_content);
      
                if (user_collected.id === usuario) return interaction.update({
                    content: `${dbe.get(`13`)} | Não é possível remover o dono do ticket!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });

                if (!user_collected) return interaction.update({
                    content: `${dbe.get(`13`)} | Não foi possível encontrar o usuário <@${user_collected}> \`(${user_content})\`, tente novamente!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
      
                if (!interaction.channel.permissionsFor(user_collected.id).has("ViewChannel"))return interaction.update({
                    content: `${dbe.get(`13`)} | O usuário ${user_collected} (\`${user_collected.id}\`) não possui acesso ao ticket!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
                const users = db.get(`${interaction.channel.id}.users`)

                const usersId = users.findIndex(user => user === user_collected.id);

                users.splice(usersId, 1);
                db.set(`${interaction.channel.id}.users`, users)
                const cargoIDs = dbc.get(`ticket.cargo_staff`);
                const permissionOverwrites = [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: user_collected.id,
                        denny: ["ViewChannel"],
                    },
                    {
                        id: user.id,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                    {
                        id: cargoIDs,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                ];
                if (users.length >= 1) {
                    users.map(users => {
                        permissionOverwrites.push(
                            {
                                id: users,
                                allow: [
                                    "ViewChannel",
                                    "SendMessages",
                                    "AttachFiles",
                                    "AddReactions",
                                    "ReadMessageHistory",
                                ],
                            }
                        )
                    })
                }

                await interaction.channel.edit({permissionOverwrites: permissionOverwrites,});
      
                interaction.update({
                    content: `${dbe.get(`6`)} | O usuário ${user_collected} (\`${user_collected.id}\`) foi removido com sucesso!`,
                    components: [],
                    ephemeral: true,
                });
            }

            if (customId.endsWith('_add_user_aceitar')) {
                const tickets = await db.get(`${interaction.channel.id}`) 
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
                const user1 = interaction.guild.members.cache.get(interaction.user.id);
          
                const hasRequiredRole = user1.roles.cache.has(dbc.get(`ticket.cargo_staff`));
              
                if (!hasRequiredRole) {
                    await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                    return;
                }
                const user_collected = interaction.guild.members.cache.get(tabom);
                if (user_collected.id === usuario) return interaction.update({
                    content: `${dbe.get(`13`)} | Não é possível remover o dono do ticket!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
                if (!user_collected)
                  return interaction.update({
                    content: `${dbe.get(`13`)} | Não foi possível encontrar o usuário ${user_collected}, tente novamente!`,
                    components: [],
                    embeds: [],
                    ephemeral: true,
                });
      
                if (interaction.channel.permissionsFor(user_collected.id).has("ViewChannel")) 
                return interaction.update({content: `${dbe.get(`2`)} | O usuário ${user_collected}(\`${user_collected.id}\`) já possui acesso ao ticket!`,components: [],ephemeral: true,});
      
      
                db.push(`${interaction.channel.id}.users`, user_collected.id)
                const permissionOverwrites = [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"],
                    },
                    {
                        id: user.id,
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                    {
                        id: dbc.get(`ticket.cargo_staff`),
                        allow: [
                            "ViewChannel",
                            "SendMessages",
                            "AttachFiles",
                            "AddReactions",
                            "ReadMessageHistory",
                        ],
                    },
                ];

                const users = db.get(`${interaction.channel.id}.users`)
                if (users.length >= 1) {
                    users.map(users => {
                        permissionOverwrites.push(
                            {
                                id: users,
                                allow: [
                                    "ViewChannel",
                                    "SendMessages",
                                    "AttachFiles",
                                    "AddReactions",
                                    "ReadMessageHistory",
                                ],
                            }
                        )
                    })
                }

                await interaction.channel.edit({permissionOverwrites: permissionOverwrites,});
      
                interaction.update({
                    content: `${dbe.get(`6`)} | O usuário ${user_collected} (\`${user_collected.id}\`) foi adicionado com sucesso!`,
                    components: [],
                    ephemeral: true,
                });
            }
        }
        if (interaction.isStringSelectMenu() && interaction.customId === "painel_usuario") {
            const option = interaction.values[0];

            if (option === "chamar_staff") {
                const tickets = await db.get(`${interaction.channel.id}`)
                const usuario = tickets.usuario
                const user = interaction.guild.members.cache.get(usuario)
                const motivo = tickets.motivo
                const codigo = tickets.codigo
                const staff = interaction.guild.members.cache.get(tickets.staff)
    
                if (interaction.user.id !== user.id) {
                    interaction.reply({
                        content:`Só o usuario: ${user}, pode usar esta função`
                    })
                }
                if (staff){
                    staff.send({
                        embeds:[
                            new Discord.EmbedBuilder()
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setTitle(`Ticket | Notificação`)
                            .setDescription(`${dbe.get("31")} | Olá ${staff}. O usuário ${interaction.user} quer uma resposta sua! para ir até ele, clique no botão abaixo!`)
                            .setColor(dbc.get(`color`))
                        ],
                        components:[
                            new Discord.ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setLabel(`Ir para o Ticket`)
                                .setStyle(5)
                                .setURL(interaction.channel.url)
                            )
                        ]
                    }).then(async() => {
                        await interaction.update({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get("6")} | ${interaction.user}. Menssagem enviada com sucesso!`)
                                .setColor("Green")
                            ],
                            components: [],
                            ephemeral:true
                        })
                        return;
                    }).catch(async() => {
                        await interaction.update({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setDescription(`${dbe.get("13")} | ${interaction.user}. Ocorreu um erro ao notificar o staff na DM!`)
                                .setColor("Red")
                            ],
                            components: [],
                            ephemeral:true
                        })
                        return;
                    })
                } else {
                    interaction.reply({
                        content:`${dbe.get(`13`)} | Ninguem assumiu seu ticket ainda!`,
                        ephemeral:true
                    })
                }
            }
            if (option === "add_user_usuario") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.UserSelectMenuBuilder()
                    .setCustomId(`add_user_usuariok`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um usuário...`),
                )
                interaction.update({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${dbe.get(`34`)}  Gerenciando Usuários no Ticket`)
                        .setDescription(`${dbe.get(`29`)} Selecione abaixo no SELECT MENU quem você deseja adicionar ao ticket\n\n${dbe.get(`2`)} Lembre-se, ao adicionar o membro, ele terá permissão de visualizar o ticket e será avisado no privado\n\n${dbe.get(`1`)} Caso queira REMOVER do canal, use a opção REMOVER USUÁRIO`)
                        .setColor(dbc.get(`color`))
                    ],
                    components: [select],
                    ephemeral:true
                })
            }
    
            if (option === "remove_user_usuario") {
                const select = new ActionRowBuilder()
                .addComponents(
                    new Discord.UserSelectMenuBuilder()
                    .setCustomId(`remove_user_usuariok`)
                    .setMaxValues(1)
                    .setPlaceholder(`Selecione um usuário...`),
                )
                interaction.update({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${dbe.get(`34`)}  Gerenciando Usuários no Ticket`)
                        .setDescription(`${dbe.get(`29`)} Selecione abaixo no SELECT MENU quem você deseja remover ao ticket\n\n${dbe.get(`2`)} Lembre-se, ao remover o membro, ele perderá permissão de visualizar o ticket e será avisado no privado\n\n${dbe.get(`1`)} Caso queira ADICIONAR novamente ao canal, use a opção ADICIONAR USUÁRIO`)
                        .setColor(dbc.get(`color`))
                    ],
                    components: [select],
                    ephemeral:true
                })
            }
        }

    }
}