const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  name: 'adv',
  description: 'Registrar uma advertência',
  type: 1, // CHAT_INPUT

  async run(interaction, Client) {
    // Verifica permissão (cargo ALTO ESCALÃO)
    const ALTO_ESCALAO_ID = '1302014768336470018';
    if (!interaction.member.roles.cache.has(ALTO_ESCALAO_ID)) {
      return interaction.reply({
        content: 'Você não tem permissão para usar este comando.',
        ephemeral: true,
      });
    }

    // Se for interação de modal submit
    if (interaction.isModalSubmit() && interaction.customId === 'adv_modal') {
      const qra = interaction.fields.getTextInputValue('qra_input');
      const idOficial = interaction.fields.getTextInputValue('id_input');
      const discordUser = interaction.fields.getTextInputValue('discord_input');
      const motivo = interaction.fields.getTextInputValue('motivo_input');
      const punicao = interaction.fields.getTextInputValue('punicao_input');

      // Extrai usuário mencionado
      let mentionedUser = null;
      const mentionMatch = discordUser.match(/<@!?(\d+)>/);
      if (mentionMatch) {
        const userId = mentionMatch[1];
        try {
          mentionedUser = await interaction.guild.members.fetch(userId);
        } catch {
          mentionedUser = null;
        }
      }

      // Cria embed no formato pedido
      const embed = new EmbedBuilder()
        .setTitle('Advertência Registrada')
        .setColor('#FF0000')
        .setDescription(
          `**QRA:**\n${qra}\n\n` +
          `**ID:**\n${idOficial}\n\n` +
          `**Discord:**\n${mentionedUser ? `<@${mentionedUser.id}>` : discordUser}\n\n` +
          `**Motivo:**\n${motivo || 'Não informado'}\n\n` +
          `**Punição:**\n${punicao || 'Não informado'}`
        )
        .setTimestamp()
        .setFooter({
          text: `Registrado por: ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      // Envia embed no canal de advertências
      const canalAdvId = '1302009973160804514';
      const canal = await Client.channels.fetch(canalAdvId);
      await canal.send({ embeds: [embed] });

      // Tenta aplicar cargo se punicao for um dos cargos de advertência
      const cargosAdvertencia = {
         'Verbal': '1005182294878851132',
         'Advertência 1': '1005181674776187012',
         'Advertência 2': '1005181864241275050',
         'Advertência 3': '1005182011020955688',
      };

      // Verifica se a punição bate com algum cargo
      const cargoId = cargosAdvertencia[punicao];
      if (mentionedUser && cargoId) {
        try {
          await mentionedUser.roles.add(cargoId);
        } catch (error) {
          console.error('Erro ao adicionar o cargo de advertência:', error);
          await interaction.followUp({
            content: 'Erro ao adicionar o cargo de advertência.',
            ephemeral: true,
          });
        }
      }

      // Tenta enviar DM para o usuário advertido
      if (mentionedUser) {
        try {
          await mentionedUser.send(
            `Você recebeu uma advertência.\nMotivo: ${motivo}\nPunição: ${punicao}`
          );
        } catch (error) {
          if (error.code === 50007) {
            console.log(
              `Não foi possível enviar DM para ${mentionedUser.user.tag}: DMs bloqueadas.`
            );
          } else {
            console.error('Erro ao enviar DM:', error);
          }
        }
      }

      await interaction.reply({
        content: 'Advertência registrada com sucesso.',
        ephemeral: true,
      });
      return;
    }

    // Se for comando de chat input, abre o modal
    if (interaction.isChatInputCommand() && interaction.commandName === 'adv') {
      const modal = new ModalBuilder()
        .setCustomId('adv_modal')
        .setTitle('Registrar Advertência');

      const qraInput = new TextInputBuilder()
        .setCustomId('qra_input')
        .setLabel('QRA do Oficial')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ex: Nome do Oficial')
        .setRequired(true);

      const idInput = new TextInputBuilder()
        .setCustomId('id_input')
        .setLabel('ID do Oficial')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ex: 10')
        .setRequired(true);

      const discordInput = new TextInputBuilder()
        .setCustomId('discord_input')
        .setLabel('Discord do Oficial (marcação)')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ex: <@123456789>')
        .setRequired(true);

      const motivoInput = new TextInputBuilder()
        .setCustomId('motivo_input')
        .setLabel('Motivo da Advertência')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Descreva o motivo da advertência')
        .setRequired(true);

      const punicaoInput = new TextInputBuilder()
        .setCustomId('punicao_input')
        .setLabel('Punição (texto ou cargo)')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ex: Prisão militar 150 meses ou Advertência 1')
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(qraInput),
        new ActionRowBuilder().addComponents(idInput),
        new ActionRowBuilder().addComponents(discordInput),
        new ActionRowBuilder().addComponents(motivoInput),
        new ActionRowBuilder().addComponents(punicaoInput)
      );

      await interaction.showModal(modal);
      return;
    }
  },
};
