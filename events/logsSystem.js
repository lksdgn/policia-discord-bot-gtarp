const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, WebhookClient} = require("discord.js")
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
        if(interaction.isButton()) {
            const customId = interaction.customId;
            const channelId = customId.split("_")[0]
            if (customId.endsWith("_logsTicket")) {
            
                const channel = interaction.guild.channels.cache.find((c) => c.name === `📂・logs-${channelId}` && c.topic === interaction.user.id);
      
                if (channel)
                return interaction.reply({
                    content: `${dbe.get(`13`)} | ${interaction.user} Você já tem uma logs aberta! Veja em ${channel}.`,
                    components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Ir para as Logs")
                            .setStyle(Discord.ButtonStyle.Link)
                            .setURL(channel.url)
                        ),
                    ],
                    ephemeral: true,
                });
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
                const msg = await interaction.reply({ content: `${dbe.get(`16`)} | Aguarde...`, ephemeral:true})
                await interaction.guild.channels.create({
                    name: `📂・logs-${channelId}`,
                    type: 0,
                    topic: interaction.user.id,
                    permissionOverwrites: permissionOverwrites,
                }).then(async(channels) => {
                    let users = db.get(`${channelId}.logsUsers`)
                    let messages = db.get(`${channelId}.logs`)
                    const embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `Gerando Mensagens do Ticket!`, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
                    .setColor(dbc.get("color"))
                    
                    await channels.send({embeds: [embed]})
                    await channels.createWebhook({
                        name: "Logs ZendApplications",
                        avatar: "https://cdn.discordapp.com/avatars/1225483899258536057/bbe49bc10870beee5bd985643339baa7.webp",
                    }).then(async(webhook) => {
                        const webhookUrl = `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`;
                        for (const entry of messages) {
                            if (entry.resp === true) {
                                const webzin = new WebhookClient({ id: webhook.id, token: webhook.token });
                                const userIndex = users.findIndex(element => element.id === entry.id);
                                const timestamp = Math.floor(new Date(entry.date).getTime() / 1000);
                                const mensagens = await channels.messages.fetch();
                                for (const [_, mensagem] of mensagens) {
                                    // Verificar se o conteúdo da mensagem corresponde ao texto procurado
                                    if (mensagem.content.includes(entry.respContent)) {
                                        await webzin.send({
                                            content: `<t:${timestamp}:f>: (${mensagem.url}) ${entry.msg}`,
                                            username: users[userIndex].name,
                                            avatarURL: users[userIndex].avatar,
                                            messageReference: mensagem.id
                                        });
                                        break;
                                    }
                                }
                            } else {
                                const webzin = new WebhookClient({ id: webhook.id, token: webhook.token });
                                const userIndex = users.findIndex(element => element.id === entry.id);
                                const timestamp = Math.floor(new Date(entry.date).getTime() / 1000);
                        
                                await webzin.send({
                                    content: `<t:${timestamp}:f>: ${entry.msg}`,
                                    username: users[userIndex].name,
                                    avatarURL: users[userIndex].avatar
                                });
                            }
                        }
                        await channels.send({ components: [
                            new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(4)
                                .setCustomId(`fechar_canal`)
                                .setLabel(`Fechar Canal`)
                                .setEmoji("<:1166960963988230195:1239447625737048154>")
                            )
                        ]}).then(msg2 => {
                            const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(5)
                                .setURL(msg2.url)
                                .setLabel(`Ir para o canal`)
                            )
                            msg.edit({ content: `${dbe.get(`6`)} | Canal de Logs criado com sucesso!`, components: [row], ephemeral:true})
                        })
                        
                    }).catch((err) => {
                        msg.edit(`${dbe.get(`13`)} | Não foi possível criar o histórico de mensagens!`)
                        console.log(err)
                    })
                }).catch((err) => {
                    msg.edit(`${dbe.get(`13`)} | Não foi possível criar o histórico de mensagens!`)
                    console.log(err)
                })
            }
        }
        if (interaction.customId === "fechar_canal") {
            interaction.channel.delete()
        }
    }
}