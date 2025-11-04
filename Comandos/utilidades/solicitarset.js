const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'solicitarset',
    description: "Solicite seu set de cargos.",
    options: [],
    default_member_permissions: PermissionFlagsBits.Administrator, // Apenas administradores podem usar
    run: async (Client, inter) => {
        // Checagem extra para garantir que só admin use, mesmo se o Discord não filtrar
        if (!inter.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return inter.reply({ content: "Apenas administradores podem usar este comando.", ephemeral: true });
        }

        await inter.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Solicitar Set")
                    .setDescription("🟢 Use os botões abaixo para iniciar a solicitação do set desejado.")
                    .setImage("https://cdn.discordapp.com/attachments/1054753141263962133/1374123937109377095/setagem.png?ex=682ce824&is=682b96a4&hm=e007d47405e50319384de1625770a79c28142ac2fc6b6380fc885d35f8cd4819&")
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('abrir_set')
                        .setLabel('CURSOS MAP')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('setcore')
                        .setLabel('CURSOS CORE')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('setuni')
                        .setLabel('SET UNIDADES')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('setfox')
                        .setLabel('SET FOX')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('setrec')
                        .setLabel('SET RECRUTAMENTO')
                        .setStyle(ButtonStyle.Primary)
                )
            ]
        });
    }
}