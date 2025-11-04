const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});

// IDs das medalhas permitidas
const cargosPermitidos = [
  '1302013852870774845',
  '1302013855395741818',
  '1302013857815859200',
  '1302013860601135124',
  '1302013862291181678',
  '1302013863692075058',
  '1302013864443121706',
  '1302013866061992096',
  '1302014150213636221',
  '1302014149735485550',
  '1302014151572328509',
  '1302014151782174770',
  '1302014152512110633',
  '1302014153254244362',
  '1302014155435282534',
  '1302014606025166981',
  '1302014609141661758',
  '1302014611482218537',
  '1302014613143027822',
  '1302014770731552848',
  '1302014769401954466',
  '1302014769988898958',
  '1302014771452842094',
  '1302014771838844989',
  '1302014773407518780',
  '1302014773067513867',
  '1302015029293486145',
  '1302015658191618099',
  '1302015711132254310',
  '1302015738344767578',
  '1302015779826307104',
  '1302015788429086822',
  '1340853638939279411',
  '1302016021669875752',
  '1302015784993951744',
  '1302015791318827008',
  '1340853638939279411',
  '1302016022194294784',
  '1302016022915711086',
  '1302016023825879110',
  '1302016024400363641',
  '1302016025348542574',
  '1302016026011238431',
  '1302016026623348756',
  '1302016027223392406',
  '1302016028175368222',
  '1302016029605761035',
  '1302016030155083796',
  '1302016488135458856',
  '1302016036408922153',
  '1302016469621805187',
  '1302016472121348116',
  '1302016475120406652',
  '1302016478014345218',
  '1302016482322157649',
  '1302016485266292858',
  '1302016491520262144',
  '1302016698639060992'
];

// Cargo extra a ser adicionado sempre (divisão medalhas)
const CARGO_EXTRA = '1302013770519806063';

// ID do canal onde as mensagens com pedidos de medalha serão enviadas
const ID_CANAL_SOLICITACAO = '1365829235637354606';

client.on('ready', () => {
  console.log(`sistema de medalhas carregado (krozz lindo)`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    const message = reaction.message;

    if (reaction.emoji.name !== '✅') return;
    if (!message.guild || message.channel.id !== ID_CANAL_SOLICITACAO) return;

    const membro = await message.guild.members.fetch(message.author.id).catch(() => null);
    if (!membro) return;

    const cargosParaAdicionar = message.mentions.roles.filter(role => cargosPermitidos.includes(role.id));

    // Se nenhum cargo válido foi mencionado
    if (cargosParaAdicionar.size === 0) {
      const aviso = await message.reply('⚠️ O cargo mencionado não está autorizado a ser setado por mim.');
      setTimeout(() => aviso.delete().catch(() => {}), 10000);
      return;
    }

    // Adiciona os cargos mencionados autorizados
    for (const [_, cargo] of cargosParaAdicionar) {
      await membro.roles.add(cargo).catch(() => {});
    }

    // Adiciona o cargo extra fixo
    await membro.roles.add(CARGO_EXTRA).catch(() => {});

    const confirmacao = await message.reply('✅ Medalhas setadas com sucesso! (essa mensagem será deletada em 10 segundos)');
    setTimeout(() => confirmacao.delete().catch(() => {}), 10000);
  } catch (err) {
    console.error('Erro ao aplicar cargos por reação:', err);
  }
});

client.login('SEU_TOKEN_AQUI'); 
