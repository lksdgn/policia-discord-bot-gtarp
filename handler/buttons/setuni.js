const { ActionRowBuilder, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, UserSelectMenuBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');
const cargosConfig = require('../../json/cargos.json');
const canalLogId = cargosConfig.canalLogUniId;
const cargoAprovadorId = cargosConfig.cargoAprovadorUniId;
const setcargoPath = path.join(__dirname, '../../json/setcargo_uni.json');
const cargos = cargosConfig.cargosUni;

function salvarSetPendente(setId, data) {
    let setsPendentes = {};
    if (fs.existsSync(setcargoPath)) {
        setsPendentes = JSON.parse(fs.readFileSync(setcargoPath, 'utf8'));
    }
    setsPendentes[setId] = data;
    fs.writeFileSync(setcargoPath, JSON.stringify(setsPendentes, null, 2));
}

function buscarSetPendente(setId) {
    if (!fs.existsSync(setcargoPath)) return null;
    const setsPendentes = JSON.parse(fs.readFileSync(setcargoPath, 'utf8'));
    return setsPendentes[setId] || null;
}

function removerSetPendente(setId) {
    if (!fs.existsSync(setcargoPath)) return;
    const setsPendentes = JSON.parse(fs.readFileSync(setcargoPath, 'utf8'));
    delete setsPendentes[setId];
    fs.writeFileSync(setcargoPath, JSON.stringify(setsPendentes, null, 2));
}

module.exports = async (interaction, Client) => {
    if (interaction.customId === 'setuni') {
        let selecionados = Array(cargos.length).fill(false);

        function gerarBotoes() {
            const botoesCargo = cargos.map((cargo, idx) =>
                new ButtonBuilder()
                    .setCustomId(`unicargo_${idx}`)
                    .setLabel(`${selecionados[idx] ? '✅' : '☐'} ${cargo.nome}`)
                    .setStyle(ButtonStyle.Secondary)
            );

            const linhas = [];
            for (let i = 0; i < botoesCargo.length; i += 5) {
                linhas.push(new ActionRowBuilder().addComponents(botoesCargo.slice(i, i + 5)));
            }

            linhas.push(new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('unitodos')
                    .setLabel('Todos')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('unifinalizar')
                    .setLabel('Finalizar')
                    .setStyle(ButtonStyle.Success)
            ));

            return linhas;
        }

        function gerarDescricaoEmbed() {
            return (
                cargos.map((cargo, idx) =>
                    `${selecionados[idx] ? '(✅)' : '( )'} <@&${cargo.id}>`
                ).join('\n') +
                "\n\nReaja nos botões de acordo com os sets desejados. Se fez todos, clique em 'Todos'."
            );
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("SOLICITAR SET DE UNIDADE")
                    .setDescription(gerarDescricaoEmbed())
            ],
            components: gerarBotoes(),
            ephemeral: true
        });

        const interactionMsg = await interaction.fetchReply();
        const userCollector = interactionMsg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 600_000,
            filter: btn => btn.user.id === interaction.user.id
        });

        userCollector.on('collect', async btn => {
            if (btn.customId.startsWith('unicargo_')) {
                const idx = Number(btn.customId.split('_')[1]);
                selecionados[idx] = !selecionados[idx];
                await btn.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("SOLICITAR SET DE UNIDADE")
                            .setDescription(gerarDescricaoEmbed())
                    ],
                    components: gerarBotoes(),
                    ephemeral: true
                });
            } else if (btn.customId === 'unitodos') {
                selecionados = selecionados.map(() => true);
                await btn.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("SOLICITAR SET DE UNIDADE")
                            .setDescription(gerarDescricaoEmbed())
                    ],
                    components: gerarBotoes(),
                    ephemeral: true
                });
            } else if (btn.customId === 'unifinalizar') {
                userCollector.stop('finalizado');

                const selectMenu = new UserSelectMenuBuilder()
                    .setCustomId('uni_autorizador_select')
                    .setPlaceholder('Selecione quem autorizou você')
                    .setMinValues(1)
                    .setMaxValues(1);

                await btn.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("SOLICITAR SET DE UNIDADE")
                            .setDescription(
                                cargos.map((cargo, idx) =>
                                    `${selecionados[idx] ? '(✅)' : '( )'} <@&${cargo.id}>`
                                ).join('\n') +
                                "\n\nSelecione abaixo quem autorizou você a solicitar o SET."
                            )
                    ],
                    components: [new ActionRowBuilder().addComponents(selectMenu)],
                    ephemeral: true
                });

                const selectCollector = interactionMsg.createMessageComponentCollector({
                    componentType: ComponentType.UserSelect,
                    time: 120_000,
                    filter: sel => sel.user.id === interaction.user.id
                });

                selectCollector.on('collect', async select => {
                    const autorizadoId = select.values[0];
                    const cargosSelecionados = cargos
                        .filter((_, idx) => selecionados[idx])
                        .map(c => `<@&${c.id}>`)
                        .join(', ') || "Nenhum";

                    const setId = `${interaction.user.id}_${Date.now()}`;
                    salvarSetPendente(setId, {
                        userId: interaction.user.id,
                        cargos: cargos.filter((_, idx) => selecionados[idx]).map(c => c.id),
                        autorizadoId
                    });

                    const canalLog = Client.channels.cache.get(canalLogId);
                    if (canalLog) {
                        canalLog.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("SETAGEM RECEBIDA")
                                    .setDescription(
                                        `QRA: <@${interaction.user.id}>\n` +
                                        `Cursos: ${cargosSelecionados}\n` +
                                        `Autorizado: <@${autorizadoId}>`
                                    )
                                    .setColor("#00ff99")
                            ],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`aprovar_uni_${setId}`)
                                        .setLabel('Aprovar')
                                        .setStyle(ButtonStyle.Success)
                                )
                            ]
                        });
                    }
                    await select.update({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("SET de unidade registrado com sucesso!")
                                .setDescription(`Seu SET de unidade foi registrado e enviado para análise.`)
                                .setColor("#00ff99")
                        ],
                        components: [],
                        ephemeral: true
                    });
                    selectCollector.stop();
                });

                selectCollector.on('end', async (_, reason) => {
                    if (reason !== 'user') {
                        await interactionMsg.edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Tempo esgotado")
                                    .setDescription("Você não selecionou quem autorizou a tempo.")
                                    .setColor("#ff0000")
                            ],
                            components: [],
                            ephemeral: true
                        });
                    }
                });
            }
        });
    }
    else if (interaction.customId.startsWith('aprovar_uni_')) {
        // Suporte para múltiplos cargos aprovadores
        const aprovadorRoles = Array.isArray(cargoAprovadorId) ? cargoAprovadorId : [cargoAprovadorId];
        if (!aprovadorRoles.some(roleId => interaction.member.roles.cache.has(roleId))) {
            return interaction.reply({ content: "Você não tem permissão para aprovar sets de unidade.", ephemeral: true });
        }

        const setId = interaction.customId.replace('aprovar_uni_', '');
        const setInfo = buscarSetPendente(setId);
        if (!setInfo) {
            return interaction.reply({ content: "Esse set não foi encontrado ou já foi aprovado.", ephemeral: true });
        }
        const { userId, cargos: cargosIds, autorizadoId } = setInfo;

        const guildMember = await interaction.guild.members.fetch(userId).catch(() => null);
        if (!guildMember) {
            return interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });
        }

        await guildMember.roles.add(cargosIds).catch(() => null);
        removerSetPendente(setId);

        await interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle("SET de unidade aprovado")
                    .setDescription(
                        `QRA: <@${userId}>\n` +
                        `Cursos: ${cargosIds.map(id => `<@&${id}>`).join(', ')}\n` +
                        `Autorizado: <@${autorizadoId}>\n\n` +
                        `APROVADO POR: <@${interaction.user.id}>`
                    )
                    .setColor("#00ff99")
            ],
            components: []
        });
    }
};
