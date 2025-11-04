const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const dbt = new JsonDatabase({ databasePath: "./json/tickets.json"})
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const Discord = require("discord.js")


module.exports = {
    name: "criar", 
    description: "Crie um novo painel de ticket.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name:"id",
            description:"Qual será o id do painel",
            type:Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name:"tipo",
            description:"Qual será o tipo do painel",
            type:Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Botão",
                    value: "button",
                },
                {
                    name: "Select Menu",
                    value: "select",
                },
            ]
        },
    ],

    run: async (client, interaction) => {
        const id = interaction.options.getString("id");
        const tipo = interaction.options.getString("tipo");

        if (interaction.user.id !== dbp.get(`${interaction.user.id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Você não tem permissão para usar este comando!`})
            return;
        }

        if (dbt.get(`${id}`)) {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Este id ja existe! Coloque outro id.`})
            return;
        }

        if (tipo === "button") {
            dbt.set(`${id}`, {
                idpainel: id,
                tipo: tipo,
                desc: "Clique no botão de abrir ticket para obter ajuda de um **STAFF**",
                title: `${interaction.guild.name} | Suporte`
            })
            const embed = new EmbedBuilder()
            .setTitle(`${dbt.get(`${id}.title`)}`)
            .setDescription(`${dbt.get(`${id}.desc`)}`)
            .setColor(dbc.get(`color`) || "Default")

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(`${id}`)
                .setEmoji("🎫")
                .setLabel(`Abrir Ticket`)
                .setStyle(1)
            )
            interaction.channel.send({ embeds: [embed], components: [row]}).then(msg => {
                dbt.set(`${id}.idmsg`, `${msg.id}`)
                dbt.set(`${id}.idcanal`, `${interaction.channel.id}`)
                dbt.set(`${id}.modal.assunto`, "ON")
                dbt.set(`${id}.modal.desc`, "OFF")
                dbt.set(`${id}.modal.finaliza`, "ON")
                dbt.set(`${id}.buttons`, [
                    {
                        id: 1,
                        style: 1,
                        text: "Abrir Ticket",
                        emoji: `🎫`,
                        msg: {
                            mensagem: "",
                            sistema: "ON"
                        }
                    }
                ])
            })
            interaction.reply({ ephemeral:true, content: `${dbe.get(`6`)} | Painel criado e enviado com sucesso!`})
        } else if (tipo === "select") {
            dbt.set(`${id}`, {
                idpainel: id,
                tipo: tipo,
                desc: "Clique na seleção abaixo para abrir ticket e obter ajuda de um **STAFF**",
                title: `${interaction.guild.name} | Atendimento`,
                placeholder: "Selecione uma opção...",
                select: [
                    {
                        text: "Abrir Ticket",
                        desc: "Clique aqui para abrir",
                        emoji: `${dbe.get(`26`)}`,
                        categoria: "",
                        id: 1,
                        msg: {
                            mensagem: "",
                            sistema: "ON"
                        }
                    }
                ]
            })
            const embed = new EmbedBuilder()
            .setTitle(`${dbt.get(`${id}.title`)}`)
            .setDescription(`${dbt.get(`${id}.desc`)}`)
            .setColor(dbc.get(`color`) || "Default")

            const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`select_ticket`)
                .setPlaceholder(`Selecione uma opção...`)
                .addOptions(
                    {
                        label: "Abrir Ticket",
                        description: "Clique aqui para abrir",
                        emoji: `${dbe.get(`26`)}`,
                        value: `${id}_primeiropainel`
                    }
                )
            )
            interaction.channel.send({ embeds: [embed], components: [row]}).then(msg => {
                dbt.set(`${id}.idmsg`, `${msg.id}`)
                dbt.set(`${id}.idcanal`, `${interaction.channel.id}`)
                dbt.set(`${id}.modal.assunto`, "ON")
                dbt.set(`${id}.modal.desc`, "OFF")
                dbt.set(`${id}.modal.finaliza`, "ON")
            })
            interaction.reply({ ephemeral:true, content: `${dbe.get(`6`)} | Painel criado e enviado com sucesso!`})
        } else {
            interaction.reply({ ephemeral:true, content: `${dbe.get(`13`)} | Coloque um tipo de painel válido!`})
            return;
        }
    }
}