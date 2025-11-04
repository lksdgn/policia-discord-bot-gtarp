// prova.js
const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, Events } = require('discord.js');
const fs = require('fs');
const dayjs = require('dayjs');
const path = './json/bloqueados.json';

const CARGO_APROVADO_ID = '1389099924943011932'; 
const CATEGORIA_PROVA_ID = '1368691563021992047';
const CANAL_COMANDO_ID = '1392174555518341160';
const LOGS_CHANNEL_ID = '1392175626676605070'; 
const TEMPO_BLOQUEIO_HORAS = 24;

const perguntas = [
  {
  pergunta: 'Qual tipo de pessoa a Polícia busca para fazer parte do Departamento?\n\nA) Indivíduos dispostos a agir por conta própria, mesmo contrariando ordens.\nB) Pessoas que desejam obter poder e status com a farda.\nC) Apaixonados pela profissão, e que compreenda e tenha respeito pela importância da autoridade policial perante a sociedade.',
  opcoes: ['A', 'B', 'C'],
  correta: 2	
},
    
  {
  pergunta: 'Qual a conduta que um policial deverá ter?\n\nA) Usar do poder policial para impor medo e respeito na sociedade.\nB) Respeitar todos os cidadãos e agir conforme as normas da corporação, sem demonstrar desrespeito ou insubordinação perante seus companheiros.\nC) Tratar os companheiros com superioridade, desde que respeite os superiores.',
  opcoes: ['A', 'B', 'C'],
  correta: 1	
},
{
  pergunta: 'Como se deve prosseguir em uma revista de sexo oposto?\n\nA) Realizar a revista normalmente, desde que mantenha a descrição.\nB) Solicitar um policial do mesmo sexo do abordado(a) no chat policial (PD) para realizar a revista, caso não tenha disponível, a revista será realizando somente com solicitação do policial e consentimento do revistado(a).\nC) Não é permitido revistar pessoas do sexo oposto em nenhuma situação.',
  opcoes: ['A', 'B', 'C'],
  correta: 1
},
{
  pergunta: 'Qual o único caso em que se pode sair de uma QRU (ocorrência) para prestar apoio em outra?\n\nA) Quando a outra QRU for mais próxima da sua localização atual.\nB) Sempre que houver outra QRU em andamento, independentemente da situação.\nC) Apenas quando se tem uma prioridade (Código 5) e caso esteja numa abordagem, é OBRIGATÓRIO informar o motivo para o abordado(a).',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'O que é Hierarquia?\n\nA) É uma ordenação contínua de autoridades que estabelece os níveis de poder e importância.\nB) É uma cadeia de amizade entre os membros do departamento.\nC) É a forma como os policiais dividem as funções operacionais.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Como se deve utilizar a comunicação via rádio?\n\nA) Transmitindo apenas informações essenciais de forma clara, objetiva e direta, e utilizando o Código Q, Códigos de Patrulha e o Alfabeto Fonético.\nB) Comunicando-se com qualquer linguagem desde que os companheiros entendam.\nC) Usando frases curtas, sem a necessidade de códigos ou padrões.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Como se deve utilizar a comunicação via Chat Policial (PD)?\n\nA) Para qualquer mensagem que não se encaixe no padrão de comunicação via rádio, lembrando sempre que se deve se manter uma conduta na mensagem enviada.\nB) Para conversas informais e assuntos administrativos.\nC) Apenas para relatar falhas técnicas ou pedir ajuda pessoal.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Qual a conduta que se deve manter nas comunicações?\n\nA) Sempre manter a calma e o respeito, e ter uma comunicação breve e direta.\nB) Falar rapidamente para agilizar o atendimento.\nC) Demonstrar autoridade mesmo que com tom rude.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Interprete essa modulação: "QAP Central, QRR no QTH do Vermelho, 5 indivíduos armados e com vestimenta azuis, liberado Cód. 5!"\nA) Central, houve uma fuga no QTH do Azul com indivíduos armados.\nB) EM ALERTA Central, CÓDIGO DE PRISÃO na ZONA LESTE, suspeitos armados.\nC) NA ESCUTA Central, PRECISO DE REFORÇOS na LOCALIDADE do Vermelho, 5 indivíduos armados e com vestimenta azuis, liberado TIRO LETAL/NEUTRALIZANTE!',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'Como seria essa modulação na rádio: "Na escuta Central, a caminho da última ocorrência de Roubo a Residência na localidade próxima da Faculdade!"\nA) QAP Central, QRU de Furto Residencial no QTH da Escola.\nB) QAP Central, QTI da última QRU de Roubo a Residência no QTH próximo da Faculdade!\nC) Central, QRV da última QRU próximo da Universidade!',
  opcoes: ['A', 'B', 'C'],
  correta: 1
},
{
  pergunta: 'Como deve-se manter na perseguição?\n\nA) Acelerando ao máximo para alcançá-lo rapidamente.\nB) O mais próximo possível do suspeito para impedir fuga imediata.\nC) Com uma distância segura tanto com as viaturas, quanto ao veículo que está sendo acompanhado.',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'Quando ocorrer um acidente durante a perseguição, qual viatura deve prestar apoio?\n\nA) Nenhuma viatura deve parar para evitar dispersão.\nB) A última QSV tem a OBRIGAÇÃO de prestar o apoio.\nC) A primeira QSV deve retornar para prestar o socorro.',
  opcoes: ['A', 'B', 'C'],
  correta: 1
},
{
  pergunta: 'Caso você inicie uma QRU (Tráfico de Drogas com o veículo acompanhado sendo um R34 azul e com o QTH no Vermelho) e já se tem duas QRUs em andamento, como seria sua modulação?\n\nA) Central, QRV de Tráfico no Vermelho, veículo R34 azul, apoio liberado.\nB) QAP Central, código 3 no R34 azul, perseguição iniciada, sem vagas.\nC) QAP Central, iniciando um acompanhamento a um R34 azul, QRU Tráfico de Drogas, QTH Vermelho, vaga para 2 unidades e apoio aéreo. Essa QRU se chamará Charlie, QSL?',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'Quais são os Níveis de Perseguição e suas descrições?\n\nA) Cód. 1 (Baixo ou nulo risco), Cód. 2 (Médio risco), Cód. 3 (Alto risco) e Cód. 5 (Risco iminente).\nB) Nível 1 (Baixo), Nível 2 (Intermediário), Nível 3 (Alto), Nível 4 (Crítico).\nC) Cód. 1 (Atenção), Cód. 2 (Perigo), Cód. 3 (Fuga), Cód. 5 (Reforço total).',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Qual a quantidade de QSV em uma perseguição de Cód. 1?\n\nA) 2 QSV e sem apoio aéreo.\nB) 3 QSV com drone e viatura descaracterizada.\nC) 4 QSV com helicóptero.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Qual a quantidade de QSV em uma perseguição de Cód. 2 e 3?\n\nA) 3 QSV e com apoio aéreo.\nB) 4 QSV e sem comunicação via rádio.\nC) 2 QSV e com reforço tático.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Qual a quantidade de QSV em uma perseguição de Cód. 5?\n\nA) Sem limites de QSV!\nB) Apenas viaturas descaracterizadas são autorizadas.\nC) Máximo de 5 QSV.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'Qual a conduta que deve-se ter em uma abordagem?\n\nA) Ser firme com o abordado e evitar diálogo.\nB) Priorizar a rapidez, mesmo que comprometa a segurança.\nC) Sempre mantendo o respeito com o abordado e sempre atento ao redor para garantir a segurança tanto dos policiais quanto dos cidadãos envolvidos.',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'Quais são os tipos de abordagens?\n\nA) Patrimonial e Veicular.\nB) Civil e Militar.\nC) De Trânsito e Suspeita.',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
{
  pergunta: 'Quais são os passos iniciais em uma abordagem?\n\nA) A revista imediata e verificação de documentos.\n\nB) A ordem de parada tanto sonora quanto luminoso e a modulação via rádio.\nC) Imobilização do veículo e apreensão dos envolvidos.',
  opcoes: ['A', 'B', 'C'],
  correta: 1
},
{
  pergunta: 'Caso o indivíduo seja detido, o que deverá ser feito na hora de algemar?\n\n\nA) Ler a Lei de Miranda para o cidadão.\nB) Informar apenas que está sendo detido.\nC) Aguardar ordem superior para formalizar o motivo.',
  opcoes: ['A', 'B', 'C'],
  correta: 0
},
{
  pergunta: 'O que é a Lei de Miranda?\n\n\nA) É o código penal específico da corporação.\nB) É a regra de conduta em perseguições.\nC) É os direitos do cidadão que está sendo detido.',
  opcoes: ['A', 'B', 'C'],
  correta: 2
},
  
  // 0 = primeira opcao , 1 = segunda opcao, 2 = terceira opcao e afins
];

function carregarBloqueados() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path));
}

function salvarBloqueados(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function estaBloqueado(userId) {
  const dados = carregarBloqueados();
  const expira = dados[userId];
  if (!expira) return false;
  return dayjs().isBefore(dayjs(expira));
}

function registrarBloqueio(userId) {
  const dados = carregarBloqueados();
  dados[userId] = dayjs().add(TEMPO_BLOQUEIO_HORAS, 'hour').toISOString();
  salvarBloqueados(dados);
}

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.content === '!iniciarprova' && message.channel.id === CANAL_COMANDO_ID) {
      const embed = new EmbedBuilder()
        .setTitle('📝 Iniciar Prova Teórica dos Cursos Base (MAP)')
        .setDescription(
          `Bem-vindo à prova teórica obrigatória para ingresso nos **Cursos Base da Polícia Militar**.\n\n` +
          `📌 A prova consiste em **20 perguntas** e você terá **2 minutos para responder cada pergunta**.\n\n` +
          `✅ Para ser aprovado, você precisa acertar pelo menos **60% das respostas**.\n\n` +
		  `📋 Ao ser aprovado, você terá acesso ao canal para marcar a **prova prática**.\n\n` +
          `❌ Ao ser reprovado, você **só poderá tentar novamente após 24 horas**.\n\n` +
          `📂 A prova é feita em um canal temporário e será deletado automaticamente ao finalizar.\n\n` +
          `Clique no botão abaixo para iniciar a prova quando estiver pronto.`
        )
        .setColor('Blue')
        .setThumbnail('https://images-ext-1.discordapp.net/external/Ov5uBVcOPBYA11m36n-aDUUxHszn3ngmCZdgxRLpE2c/%3Fsize%3D2048/https/cdn.discordapp.com/icons/1368447843521531956/fb742f496cc054ad3020d9d94a9c36a6.png?format=webp&quality=lossless')
        .setFooter({ text: 'Boa sorte! Estude bem antes de começar.' });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('comecar_prova')
          .setLabel('📘 Começar Prova')
          .setStyle(ButtonStyle.Primary)
      );

      await message.channel.send({ embeds: [embed], components: [row] });
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'comecar_prova') return;

    const user = interaction.user;
    const membro = await interaction.guild.members.fetch(user.id);

    if (estaBloqueado(user.id)) {
      return interaction.reply({ content: '❌ Você reprovou recentemente. Tente novamente em 24 horas.', ephemeral: true });
    }

    const canal = await interaction.guild.channels.create({
      name: `prova-map-${user.username}`,
      type: ChannelType.GuildText,
      parent: CATEGORIA_PROVA_ID,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        },
        {
          id: client.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageMessages]
        }
      ]
    });

    interaction.reply({ content: `✅ Canal criado: ${canal}`, ephemeral: true });
    iniciarProva(canal, user, membro, client);
  });
};

async function iniciarProva(canal, user, membro, client) {
  let perguntaIndex = 0;
  let acertos = 0;

  const enviarProximaPergunta = async () => {
    if (perguntaIndex >= perguntas.length) {
      await finalizarProva();
      return;
    }

    const atual = perguntas[perguntaIndex];
    const row = new ActionRowBuilder().addComponents(
      atual.opcoes.map((texto, i) =>
        new ButtonBuilder()
          .setCustomId(`resposta_${i}`)
          .setLabel(texto)
          .setStyle(ButtonStyle.Secondary)
      )
    );

    const msg = await canal.send({
      embeds: [new EmbedBuilder().setTitle(`Pergunta ${perguntaIndex + 1}`).setDescription(atual.pergunta)],
      components: [row]
    });

    const coletor = canal.createMessageComponentCollector({
      time: 120000,
      max: 1,
      filter: i => i.user.id === user.id
    });

    coletor.on('collect', async (i) => {
      const escolhida = parseInt(i.customId.split('_')[1]);
      if (escolhida === atual.correta) acertos++;

      await i.deferUpdate();
      await msg.delete();
      perguntaIndex++;
      await enviarProximaPergunta();
    });

    coletor.on('end', async collected => {
      if (collected.size === 0) {
        await canal.send('⏰ Tempo esgotado. Prova encerrada.');
        registrarBloqueio(user.id);
        setTimeout(() => canal.delete().catch(() => {}), 5 * 60 * 1000);
      }
    });
  };

  const finalizarProva = async () => {
    const logsChannel = await client.channels.fetch(LOGS_CHANNEL_ID);
    const data = dayjs().format('DD/MM/YYYY HH:mm');
    const totalPerguntas = perguntas.length;
    const percentualAcerto = (acertos / totalPerguntas) * 100;
    let msgFinal;

    if (percentualAcerto >= 60) {
      await membro.roles.add(CARGO_APROVADO_ID);
      msgFinal = `✅ Parabéns, ${user}! Você foi **aprovado** com ${acertos} de ${totalPerguntas} acertos (${percentualAcerto.toFixed(0)}%)! Marque sua prova prática em <#1391088389780017243>.`;
      await logsChannel.send(`✅ ${user} foi **aprovado** na prova teórica MAP em ${data} com ${acertos}/${totalPerguntas} acertos (${percentualAcerto.toFixed(0)}%).`);
    } else {
      registrarBloqueio(user.id);
      msgFinal = `❌ Infelizmente, ${user}, você foi **reprovado** com ${acertos} de ${totalPerguntas} acertos (${percentualAcerto.toFixed(0)}%). Tente novamente em 24 horas.`;
      await logsChannel.send(`❌ ${user} foi **reprovado** na prova teórica MAP em ${data} com ${acertos}/${totalPerguntas} acertos (${percentualAcerto.toFixed(0)}%).`);
    }

    await canal.send(msgFinal);
    setTimeout(() => canal.delete().catch(() => {}), 5 * 60 * 1000);
  };

  await enviarProximaPergunta();
}
