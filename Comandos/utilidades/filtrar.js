const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const filtros = require('../../json/filtros.json');

const nomesGrupos = {
    laudo_vacina: "📋・Laudos e Vacinas",
    map: "📋・Cursos M.A.P",
    core: "📋・Cursos CORE"
};

module.exports = {
    name: "filtrar",
    description: "Filtra membros de um cargo que não possuem todos os cargos de um grupo.",
    options: [
        {
            name: "grupo",
            description: "Escolha o grupo de cargos para filtrar.",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "📋・Laudos e Vacinas", value: "laudo_vacina" },
                { name: "📋・Cursos M.A.P", value: "map" },
                { name: "📋・Cursos CORE", value: "core" }
            ]
        },
        {
            name: "cargo",
            description: "Selecione o cargo base para filtrar.",
            type: ApplicationCommandOptionType.Role,
            required: true
        }
    ],
    run: async (Client, inter) => {
        // Permissão: só quem tem algum dos cargos permitidos pode usar
        const permitidos = filtros.ID_DO_CARGO_PERMITIDO || [];
        if (!permitidos.some(roleId => inter.member.roles.cache.has(roleId))) {
            return inter.reply({ ephemeral: true, content: "Você não tem permissão para usar este comando." });
        }

        const grupo = inter.options.getString("grupo");
        const cargo = inter.options.getRole("cargo");

        // Verifica se o grupo existe no filtros.json
        if (!filtros[grupo]) {
            return inter.reply({ ephemeral: true, content: "Grupo de filtro inválido." });
        }

        const cargosFiltro = filtros[grupo]; // Array de IDs dos cargos do grupo

        // Busca todos os membros do cargo selecionado
        await inter.guild.members.fetch(); // Garante que todos os membros estão em cache
        const membrosDoCargo = cargo.members.filter(member => !member.user.bot);

        // Filtra quem NÃO tem todos os cargos do grupo
        const membrosSemTodos = membrosDoCargo.filter(member =>
            !cargosFiltro.every(cargoId => member.roles.cache.has(cargoId))
        );

        if (membrosSemTodos.size === 0) {
            return inter.reply({ ephemeral: true, content: `Todos os membros do cargo ${cargo} possuem todos os cargos do grupo ${nomesGrupos[grupo] || grupo.replace("_", "/")}.` });
        }

        // Lista dos membros e quais cargos faltam (OBS só se tiver mais de um cargo no grupo)
        let obs = "";
        if (cargosFiltro.length > 1) {
            let obsArr = [];
            membrosSemTodos.forEach(member => {
                // Cargos que o membro possui do grupo
                const possui = cargosFiltro.filter(cargoId => member.roles.cache.has(cargoId));
                // Se não possui nenhum, não mostra na OBS
                if (possui.length === 0) return;
                // Cargos que faltam
                const faltando = cargosFiltro
                    .filter(cargoId => !member.roles.cache.has(cargoId))
                    .map(cargoId => `<@&${cargoId}>`)
                    .join(', ');
                obsArr.push(`<@${member.id}> sem o cargo ${faltando}`);
            });
            if (obsArr.length > 0) {
                obs = "OBS:\n" + obsArr.join('\n');
            }
        }

        // Limita para não ultrapassar o limite de caracteres do Discord
        const lista = membrosSemTodos.map(m => `<@${m.id}>`).join('\n');
        const embed = new EmbedBuilder()
            .setTitle(nomesGrupos[grupo] || "Resultado do Filtro")
            .setDescription(
                (lista.length > 4000 ? lista.slice(0, 4000) + "\n...lista cortada..." : lista) +
                (obs && obs.length > 0 ? "\n\n" + (obs.length > 1000 ? obs.slice(0, 1000) + "\n...OBS cortada..." : obs) : "")
            )
            .setColor("#ffb300");

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("copiar_lista")
                .setLabel("Copiar")
                .setStyle(ButtonStyle.Secondary)
        );

        await inter.reply({ ephemeral: true, embeds: [embed], components: [row] });

        // Coletor para o botão de copiar
        const msg = await inter.fetchReply();
        const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 120_000,
            filter: i => i.user.id === inter.user.id
        });

        collector.on('collect', async i => {
            if (i.customId === "copiar_lista") {
                const embedCopiar = new EmbedBuilder()
                    .setTitle(nomesGrupos[grupo] || "Lista para copiar e colar")
                    .setDescription(
                        "```" +
                        (lista.length > 1950 ? lista.slice(0, 1950) + "\n...lista cortada..." : lista) +
                        "```\n" +
                        (obs && obs.length > 0 ? (obs.length > 1000 ? obs.slice(0, 1000) + "\n...OBS cortada..." : obs) : "")
                    )
                    .setColor("#00bfff");
                await i.reply({
                    ephemeral: true,
                    embeds: [embedCopiar]
                });
            }
        });
    }
};