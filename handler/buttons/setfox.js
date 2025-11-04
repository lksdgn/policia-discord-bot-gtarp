const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const cargosConfig = require('../../json/cargos.json');
const foxRoleId = cargosConfig.fox;
const canalLogFoxId = cargosConfig.canalLogFoxId;

module.exports = async (interaction, Client) => {
    if (interaction.customId === 'setfox') {
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const temFox = member.roles.cache.has(foxRoleId);

        if (temFox) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Cargo Fox")
                        .setDescription("Você já possui o cargo Fox. Deseja remover?")
                        .setColor("#ff9900")
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('fox_remover_confirmar')
                            .setLabel('Remover')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('fox_remover_cancelar')
                            .setLabel('Cancelar')
                            .setStyle(ButtonStyle.Secondary)
                    )
                ],
                ephemeral: true
            });
        } else {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Cargo Fox")
                        .setDescription("Tem certeza que deseja receber o cargo Fox?")
                        .setColor("#ff9900")
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('fox_confirmar')
                            .setLabel('Confirmar')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('fox_cancelar')
                            .setLabel('Cancelar')
                            .setStyle(ButtonStyle.Secondary)
                    )
                ],
                ephemeral: true
            });
        }
    }

    // Confirmação para receber o cargo
    else if (interaction.customId === 'fox_confirmar') {
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (member.roles.cache.has(foxRoleId)) {
            return interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Cargo Fox")
                        .setDescription("Você já possui o cargo Fox.")
                        .setColor("#ff9900")
                ],
                components: [],
                ephemeral: true
            });
        }
        await member.roles.add(foxRoleId);

        // Envia log no canal específico
        const canalLog = Client.channels.cache.get(canalLogFoxId);
        if (canalLog) {
            canalLog.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("✅ SETAGEM APROVADA")
                        .setDescription(
                            `QRA: <@${interaction.user.id}>\n` +
                            `SET: <@&${foxRoleId}>`
                        )
                        .setColor("#00ff99")
                ]
            });
        }

        await interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Cargo Fox")
                    .setDescription("Cargo Fox atribuído com sucesso!")
                    .setColor("#00ff99")
            ],
            components: [],
            ephemeral: true
        });
    }

    // Cancelar recebimento do cargo
    else if (interaction.customId === 'fox_cancelar') {
        await interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Cargo Fox")
                    .setDescription("Operação cancelada.")
                    .setColor("#ff9900")
            ],
            components: [],
            ephemeral: true
        });
    }

    // Confirmação para remover o cargo
    else if (interaction.customId === 'fox_remover_confirmar') {
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (!member.roles.cache.has(foxRoleId)) {
            return interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Cargo Fox")
                        .setDescription("Você não possui o cargo Fox.")
                        .setColor("#ff9900")
                ],
                components: [],
                ephemeral: true
            });
        }
        await member.roles.remove(foxRoleId);

        // Log de remoção
        const canalLog = Client.channels.cache.get(canalLogFoxId);
        if (canalLog) {
            canalLog.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("❌ SETAGEM REMOVIDA")
                        .setDescription(
                            `QRA: <@${interaction.user.id}>\n` +
                            `SET REMOVIDO: <@&${foxRoleId}>`
                        )
                        .setColor("#ff0000")
                ]
            });
        }

        await interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Cargo Fox")
                    .setDescription("Cargo Fox removido com sucesso!")
                    .setColor("#00ff99")
            ],
            components: [],
            ephemeral: true
        });
    }

    // Cancelar remoção do cargo
    else if (interaction.customId === 'fox_remover_cancelar') {
        await interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Cargo Fox")
                    .setDescription("Operação cancelada.")
                    .setColor("#ff9900")
            ],
            components: [],
            ephemeral: true
        });
    }
};