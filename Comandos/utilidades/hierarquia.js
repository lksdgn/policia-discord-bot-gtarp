// hierarquia.js
const { EmbedBuilder } = require('discord.js');
const dayjs = require('dayjs');

const CARGO_AUTORIZADO_ID = '1338951286145421312';

// ordem oficial de hierarquia (não mude os IDs nem a sequência)
const HIERARQUIA = [
  { id: '1004156164243738644', nome: 'Comando' },
  { id: '1276180887561568296', nome: 'Sub Comando' },
  { id: '1004156164919001138', nome: 'Coronel' },
  { id: '1004156165837553714', nome: 'Tenente Coronel' },
  { id: '1004156166575759472', nome: 'Major' },
  { id: '1181028239536304218', nome: 'Capitão' },
  { id: '1004156167880200335', nome: '1° Tenente' },
  { id: '1004156168677113896', nome: '2° Tenente' },
  { id: '1004156169364975716', nome: 'Aspirante' },
  { id: '1004156169960554597', nome: 'SubTenente' },
  { id: '1004156170652627027', nome: '1° Sargento' },
  { id: '1004156171181097031', nome: '2° Sargento' },
  { id: '1004156172057727057', nome: '3° Sargento' },
  { id: '1004156172586209290', nome: 'Cabo' },
  { id: '1004156173261488268', nome: 'Soldado' },
  { id: '1004156174628823082', nome: 'Recruta' }
];

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    // ignora bots e outras mensagens
    if (message.author.bot) return;
    if (message.content !== '!hierarquia') return;

    // verifica permissão
    if (!message.member.roles.cache.has(CARGO_AUTORIZADO_ID)) {
      return message.reply('❌ Você não tem permissão para usar este comando.');
    }

    // garante cache completo dos membros
    const guild = message.guild;
    await guild.members.fetch();

    const usados = new Set(); // evita duplicados
    const embed = new EmbedBuilder()
      .setTitle('👮‍♂️ Hierarquia Polícia Militar SUL')
      .setColor('Blue')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter({ text: `Atualizado em ${dayjs().format('DD/MM/YYYY HH:mm')}` });

    for (const nivel of HIERARQUIA) {
      const role = guild.roles.cache.get(nivel.id);
      if (!role) continue; // caso o cargo não exista no servidor

      // lista só quem ainda não apareceu (para evitar quem acumula cargos)
      const membros = role.members
        .filter(m => !usados.has(m.id))
        .sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'))
        .map(m => {
          usados.add(m.id);
          return `<@${m.id}>`;
        });

      // discord limita 1024 caracteres por field → chunk automático
      if (membros.length === 0) {
        embed.addFields({ name: `${nivel.nome} (0)`, value: '—', inline: false });
      } else {
        let bloco = '';
        membros.forEach((m, i) => {
          // 950 ~ margem de segurança
          if (bloco.length + m.length + 2 > 950) {
            embed.addFields({ name: `${nivel.nome} (${membros.length})`, value: bloco, inline: false });
            bloco = '';
          }
          bloco += m + '\n';
          if (i === membros.length - 1) {
            embed.addFields({ name: `${nivel.nome} (${membros.length})`, value: bloco, inline: false });
          }
        });
      }
    }

    await message.channel.send({ embeds: [embed] });
  });
};
