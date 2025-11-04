const Discord = require("discord.js")
const { JsonDatabase } = require("wio.db")
const dbp = new JsonDatabase({ databasePath: "./json/perms.json"})
const dbe = new JsonDatabase({ databasePath: "./json/emojis.json"})
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js")
const dbc = new JsonDatabase({ databasePath: "./json/botconfig.json"})
const dono = new JsonDatabase({ databasePath: "./config.json"})

module.exports = {
    name: "setdono", // Coloque o nome do comando
    description: "Seta a pessoa que usou como dono do BOT.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!dono.get(`setdono`)) {
            const collectorFilter = i => {
                return i.user.id === interaction.user.id && i.customId == "senharecupera";
            };
            const modal = new ModalBuilder()
            .setCustomId(`senharecupera`)
            .setTitle('SENHA DE RECUPERAÇÃO')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('text')
                            .setLabel("COLOQUE UMA SENHA")
                            .setMinLength(4)
                            .setPlaceholder(`Coloque a senha que você possa redefinir o dono!`)
                            .setStyle(1)
                    )
            )
            interaction.showModal(modal)
            interaction.awaitModalSubmit({ time: 600_000, filter: collectorFilter })
            .then(interaction => {
                dono.set(`dono`, interaction.user.id)
                dono.set(`senha`, interaction.fields.getTextInputValue('text'))
                dono.set(`setdono`, "setado")
                dbp.set(`${interaction.user.id}`, interaction.user.id)
                interaction.reply(`${dbe.get(`6`)} | Dono ${interaction.user} setado com sucesso!.`).then(msg => {
                    interaction.user.send(`# Senha\nA senha para recuperar a posse do seu bot é **${interaction.fields.getTextInputValue('text')}**!`)
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
            })
        } else {
            const collectorFilter = i => {
                return i.user.id === interaction.user.id && i.customId == "recuperarbot";
            };
            const modal = new ModalBuilder()
            .setCustomId(`recuperarbot`)
            .setTitle('SENHA DE RECUPERAÇÃO')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId('text')
                            .setLabel("COLOQUE A SENHA")
                            .setMinLength(4)
                            .setPlaceholder(`Coloque a senha que você definiu de recuperação!`)
                            .setStyle(1)
                    )
            )
            interaction.showModal(modal)
            interaction.awaitModalSubmit({ time: 600_000, filter: collectorFilter })
            .then(interaction => {
                if (interaction.fields.getTextInputValue('text') === dono.get(`senha`)) {
                    dono.delete(`dono`)
                    dono.delete(`senha`)
                    dono.delete(`setdono`)
                    dbp.deleteAll()
                    dbp.set(`${interaction.user.id}`, interaction.user.id)
                    interaction.reply(`${dbe.get(`6`)} | Dono e senha removidos! Adicione uma nova senha agora mesmo.`).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000);
                    })
                } else {
                    interaction.reply(`${dbe.get(`13`)} | Cai fora intruso! Caso você insista demais em roubar a posse do bot nós avisaremos o dono.`).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000);
                    })
                }
            })
        }
    }
}