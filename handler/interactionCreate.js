const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

module.exports = async (interaction, Client) => {

    // --- TRATAMENTO DE BOTÕES EXISTENTES ---
    if (interaction.isButton()) {
        if (interaction.customId === 'abrir_set' || interaction.customId.startsWith('aprovar_set_')) {
            const setmap = require('./buttons/setmap.js');
            await setmap(interaction, Client);
        }
        else if (interaction.customId === 'setcore' || interaction.customId.startsWith('aprovar_core_')) {
            const setcore = require('./buttons/setcore.js');
            await setcore(interaction, Client);
        }
        else if (interaction.customId === 'setuni' || interaction.customId.startsWith('aprovar_uni_')) {
            const setuni = require('./buttons/setuni.js');
            await setuni(interaction, Client);
        }
        else if (interaction.customId === 'setfox' || interaction.customId.startsWith('fox_')) {
            const setfox = require('./buttons/setfox.js');
            await setfox(interaction, Client);
        }
        else if (
            interaction.customId === 'setrec' ||
            interaction.customId.startsWith('aprovar_rec_') ||
            interaction.customId.startsWith('recusar_rec_')
        ) {
            const setrec = require('./buttons/setrec.js');
            await setrec(interaction, Client);
        }
    }

    // --- TRATAMENTO DE MODAIS EXISTENTES ---
    if (interaction.isModalSubmit()) {
        if (
            interaction.customId === 'rec_formulario' ||
            interaction.customId.startsWith('rec_motivo_')
        ) {
            const setrec = require('./buttons/setrec.js');
            await setrec(interaction, Client);
            return;
        }

        // Modal do /adv
        if (interaction.customId === 'adv_modal') {
            const ALTO_ESCALAO_ID = '1302014768336470018';
            if (!interaction.member.roles.cache.has(ALTO_ESCALAO_ID)) {
                return interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
            }

            const qra = interaction.fields.getTextInputValue('qra_input');
            const idOficial = interaction.fields.getTextInputValue('id_input');
            const discordUser = interaction.fields.getTextInputValue('discord_input');
            const motivo = interaction.fields.getTextInputValue('motivo_input');
            const punicao = interaction.fields.getTextInputValue('punicao_input');

            // Extrair usuário mencionado (espera <@123> ou <@!123>)
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

            // Mapeamento dos cargos de advertência (ajuste os IDs conforme seus cargos)
            const cargosAdvertencia = {
                'Verbal': '1005182294878851132',
                'Advertência 1': '1005181674776187012',
                'Advertência 2': '1005181864241275050',
                'Advertência 3': '1005182011020955688',
            };

            // Verifica se o campo punição corresponde a algum cargo para adicionar
            let cargoParaAdicionar = null;
            for (const [nome, id] of Object.entries(cargosAdvertencia)) {
                if (punicao.toLowerCase().includes(nome.toLowerCase())) {
                    cargoParaAdicionar = id;
                    break;
                }
            }

            // Adiciona o cargo se possível
            if (mentionedUser && cargoParaAdicionar) {
                try {
                    await mentionedUser.roles.add(cargoParaAdicionar, `Advertência aplicada por ${interaction.user.tag}`);
                } catch (error) {
                    console.error('Erro ao adicionar cargo:', error);
                    return interaction.reply({ content: 'Erro ao adicionar o cargo de advertência.', ephemeral: true });
                }
            }

            // Construir embed formatado com as infos em linhas separadas
            const embed = new EmbedBuilder()
                .setTitle('Advertência Registrada')
                .setColor('#FF0000')
                .addFields(
                    { name: 'QRA', value: qra || 'Não informado' },
                    { name: 'ID', value: idOficial || 'Não informado' },
                    { name: 'Discord', value: mentionedUser ? `<@${mentionedUser.id}>` : discordUser || 'Não informado' },
                    { name: 'Motivo', value: motivo || 'Não informado' },
                    { name: 'Punição', value: punicao || 'Não informado' },
                )
                .setTimestamp()
                .setFooter({ text: `Registrado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

            const canalAdvId = '1302009973160804514';
            const canal = await Client.channels.fetch(canalAdvId);
            await canal.send({ embeds: [embed] });
            await interaction.reply({ content: 'Advertência registrada com sucesso.', ephemeral: true });
            return;
        }
    }

    // --- TRATAMENTO DE COMANDOS ---
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'adv') {
            const ALTO_ESCALAO_ID = '1302014768336470018';
            if (!interaction.member.roles.cache.has(ALTO_ESCALAO_ID)) {
                return interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
            }

            const modal = new ModalBuilder()
                .setCustomId('adv_modal')
                .setTitle('Registrar Advertência');

            // Campos do modal
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
                new ActionRowBuilder().addComponents(punicaoInput),
            );

            await interaction.showModal(modal);
            return;
        }
    }
};
