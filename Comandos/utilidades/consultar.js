// comando.js (para /verificar cursos)
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
    .setName('consultar')
    .setDescription('Verifica se os membros de um cargo possuem outros cargos específicos.')
    .addSubcommand(subcommand =>
        subcommand
            .setName('cursos')
            .setDescription('Verifica os requisitos de cursos.')
            .addRoleOption(option =>
                option
                    .setName('cargo')
                    .setDescription('Selecione o cargo a ser verificado.')
                    .setRequired(true)
            )
    ),
async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const cargoVerificar = interaction.options.getRole('cargo');
    const membrosSemCargos = [];

    if (subcommand === 'cursos') {
        const cargosCursos = [
            // Substitua pelos IDs dos cargos
            '1302013353744531507',
            '1283249162753802303',
            '1283250015556599881',
            '1283247766272741509',
            '1283246784998674482',
            '1337101528456233021',
            '1337101585284730970',
            "1118537019010846800"
        ];

        for (const membro of cargoVerificar.members) {
            const membroUsuario = membro[1];
            let possuiTodosCargos = true;
            for (const idCargoCurso of cargosCursos) {
                if (!membroUsuario.roles.cache.has(idCargoCurso)) {
                    possuiTodosCargos = false;
                    break;
                }
            }
            if (!possuiTodosCargos) {
                membrosSemCargos.push({ nome: membroUsuario.user.username, id: membroUsuario.user.id });
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('Membros sem todos os requisitos de cursos')
            .setColor(0xff0000);

        if (membrosSemCargos.length === 0) {
            embed.setDescription('Todos os membros do cargo possuem os requisitos de cursos.');
        } else {
            let descricao = '';
            for (const membro of membrosSemCargos) {
                descricao += `- ${membro.nome} (ID: ${membro.id})
`;
            }
            embed.setDescription(descricao);
        }

        await interaction.reply({ embeds: [embed] });
    }
}
};
