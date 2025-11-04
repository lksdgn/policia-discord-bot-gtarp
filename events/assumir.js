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
    name: 'Assumir',
    run: async (interaction, client) => {
        if(interaction.customId === "ticket_assumir"){
            const tickets = await db.get(`${interaction.channel.id}`)
            const usuario = db.get(`${interaction.channel.id}.usuario`)
            const user = interaction.guild.members.cache.get(usuario)

            const user1 = interaction.guild.members.cache.get(interaction.user.id);
            const roleIdToCheck = dbc.get(`ticket.cargo_staff`);
            
            const hasRequiredRole = user1.roles.cache.has(roleIdToCheck);;
            
            if (!hasRequiredRole) {
                await interaction.reply({ content: 'Você não tem permissão para usar este botão.', ephemeral: true });
                return;
            }

            db.set(`${interaction.channel.id}.staff`, interaction.user.id)
            
            user.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    .setTitle(`Ticket | Assumido`)
                    .setDescription(`${dbe.get("31")} | Olá ${user}. O staff ${interaction.user} assumiu o seu ticket! Clique no botão abaixo para ir até ele.`)
                    .setColor(dbc.get(`color`) || "Green")
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
            })
            const embed = new EmbedBuilder()
            .setDescription(`Olá ${user}, seu ticket foi assumido por ${interaction.user}! Dê continuidade ao atendimento.`)
            .setColor(dbc.get(`color`))

            interaction.channel.send({content: `${user}`, embeds: [embed]})

            let desc = `${dbc.get(`painel.desc`)}`;
            desc = desc.replace(`{codigo}`, `${db.get(`${interaction.channel.id}.codigo`)}`);
            desc = desc.replace(`{motivo}`, `${db.get(`${interaction.channel.id}.motivo`)}`);
            desc = desc.replace(`{desc}`, `${db.get(`${interaction.channel.id}.desc`,)}`);
            desc = desc.replace(`{assumido}`, `<@${db.get(`${interaction.channel.id}.staff`,)}>`);
            desc = desc.replace(`{user}`, `<@${db.get(`${interaction.channel.id}.usuario`)}>`);
            desc = desc.replace(`{horario2}`, `<t:${db.get(`${interaction.channel.id}.horario2`)}:R>`);
            desc = desc.replace(`{horario1}`, `<t:${db.get(`${interaction.channel.id}.horario1`)}:f>`);


            const embeds = new Discord.EmbedBuilder()
            .setDescription(desc)

            interaction.update({
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
                        .setStyle(3)
                        .setDisabled(true),
                        new Discord.ButtonBuilder()
                        .setCustomId("ticket_finalizar")
                        .setLabel("Finalizar Ticket")
                        .setEmoji(dbc.get(`painel.button.finalizar`))
                        .setStyle(Discord.ButtonStyle.Danger),
                    )
                ]
            })
        }
    }
}