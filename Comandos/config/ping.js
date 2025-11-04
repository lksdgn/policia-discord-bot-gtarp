const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Responde com Pong! (Owner apenas)",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const allowedUserId = '520228168209137684'; // Seu ID

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({ content: 'Este comando é privado.', ephemeral: true });
        }

        interaction.reply({ content: 'Pong!', ephemeral: true });
    }
};