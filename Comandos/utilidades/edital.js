const { Client, GatewayIntentBits } = require('discord.js');
const dayjs = require('dayjs');

const TOKEN = 'SEU_TOKEN_AQUI';

// canais unidade
const CANAIS_EDITAL = {
  heat: '1362427401908260976',
  sat: '1362427349366214856',
  gtm: '1362427402512498869',
  marshal: '1362427403217145886',
};

// ID do cargo para menção
const CARGO_ID = '1175612263273615461';

// textos formatados
const MENSAGENS_EDITAL = {
  heat: (data, link) => 
    `**EDITAL – UNIDADE HEAT**

Se você manda bem no volante e sonha em pilotar os veículos mais agressivos da cidade em nome da segurança dos cidadãos da One, essa é a sua chance: o edital da HEAT está oficialmente aberto!

Requisitos:

- Excelente habilidade no P1;
- Boa modulação de rádio;
- Conhecimento dos principais pontos de referência da cidade;
- Ser RECRUTA ou superior;
- Ter pleno domínio de procedimentos de acompanhamento.

Para participar do processo seletivo, acesse o formulário: ${link}

O edital ficará aberto até o dia **${data}**.

Boa sorte a todos!`,

  sat: (data, link) =>
    `**EDITAL – UNIDADE SAT**

Se você gosta de pilotar e/ou atirar e sonha em operar os helicópteros mais ágeis e agressivos da cidade em nome da segurança dos cidadãos da One, essa é a sua chance: o edital da SAT está oficialmente aberto!

Requisitos:

- Excelente habilidade no P1 do helicóptero (para Piloto);
- Excelente precisão em disparos em movimento (para Atirador);
- Boa modulação de rádio;
- Conhecimento dos principais pontos de referência da cidade;
- Ser RECRUTA ou superior;
- Pleno domínio dos procedimentos de acompanhamento.

Para participar do processo seletivo, acesse o formulário: ${link}

O edital ficará aberto até o dia **${data}**.

Boa sorte a todos!`,

  gtm: (data, link) =>
    `**EDITAL – UNIDADE GTM**

Se você gosta de pilotar as motos mais ágeis e agressivas da cidade em nome da segurança dos cidadãos da One, essa é a sua chance: o edital da GTM está oficialmente aberto!

Requisitos:

- Excelente habilidade no P1;
- Boa modulação de rádio;
- Conhecimento dos principais pontos de referência da cidade;
- Ser RECRUTA ou superior;
- Pleno domínio dos procedimentos de acompanhamento.

Para participar do processo seletivo, acesse o formulário: ${link}

O edital ficará aberto até o dia **${data}**.

Boa sorte a todos!`,

  marshal: (data, link) =>
    `Senhores Oficiais,

A Polícia Militar da One tem o prazer de convidá-los a fazer parte da Marshal, nossa unidade oficial de instrução, formação e aperfeiçoamento. Esta unidade é responsável por ministrar cursos, treinamentos e capacitações que fortalecem a excelência e a disciplina dentro da corporação.

Se você deseja compartilhar conhecimento, contribuir com a formação de novos policiais ou se aperfeiçoar ainda mais na área tática e operacional, a Marshall é o seu lugar.

👮‍♂️ **Na Marshal, você pode:**

- Ministrar e participar de cursos oficiais
- Auxiliar na formação de recrutas e soldados
- Desenvolver e aplicar estratégias de ensino
- Crescer como referência dentro da PM
- Não é apenas uma unidade. É uma missão.

**REQUISITOS MÍNIMOS:**
- Patente:  SD+
- Disponibilidade
- Compromisso com a unidade
- Ter todos os cursos aplicados pela Marshal

**BENEFÍCIOS DA UNIDADE**
- Viatura Audi Q7
- Armamento: Bullpull MK2
- Salário da unidade

Acesse o servidor e se inscreva: https://discord.gg/Jnb2WTMY7a`
};

// texto do edital fechado
const TEXTOS_FECHAMENTO = {
  heat: `**EDITAL – UNIDADE HEAT**

Informamos que o processo seletivo da unidade HEAT foi oficialmente encerrado.

Agradecemos a todos os interessados e desejamos sucesso a quem participou.

Entraremos em contato com os aprovados.

Fiquem atentos aos próximos editais e oportunidades!`,

  sat: `**EDITAL – UNIDADE SAT**

Informamos que o processo seletivo da unidade SAT foi oficialmente encerrado.

Agradecemos a todos os interessados e desejamos sucesso a quem participou.

Entraremos em contato com os aprovados.

Fiquem atentos aos próximos editais e oportunidades!`,

  gtm: `**EDITAL – UNIDADE GTM**

Informamos que o processo seletivo da unidade GTM foi oficialmente encerrado.

Agradecemos a todos os interessados e desejamos sucesso a quem participou.

Entraremos em contato com os aprovados.

Fiquem atentos aos próximos editais e oportunidades!`,

  marshal: `**Edital Marshal**

O processo seletivo da unidade Marshal foi oficialmente encerrado.

Entraremos em contato com os aprovados.

Agradecemos a todos os interessados e fiquem atentos às próximas oportunidades.`
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('sistema de edital carregado (krozz lindo)!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  const cmd = args[0].toLowerCase();

  if (cmd === '!edital') {
    await message.delete().catch(() => {});

    if (args.length < 4) {
      const reply = await message.channel.send('❌ Formato inválido. Use: `!edital <unidade> <data> <link>`');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    const unidade = args[1].toLowerCase();
    const data = args[2];
    const link = args.slice(3).join(' ');

    if (!CANAIS_EDITAL[unidade]) {
      const reply = await message.channel.send('❌ Unidade inválida. Use: `heat`, `sat`, `gtm`, `marshal`');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    const canalEdital = await client.channels.fetch(CANAIS_EDITAL[unidade]).catch(() => null);
    if (!canalEdital) {
      const reply = await message.channel.send('❌ Canal da unidade não encontrado.');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    // envia o edital no canal da unidade
    await canalEdital.send(MENSAGENS_EDITAL[unidade](data, link));

    // envia a menção do cargo abaixo da mensagem
    await canalEdital.send(`<@&${CARGO_ID}>`);

    const confirmMsg = await message.channel.send('✅ Edital enviado com sucesso!');
    setTimeout(() => {
      confirmMsg.delete().catch(() => {});
    }, 10000);
  }

  else if (cmd === '!fedital') {
    await message.delete().catch(() => {});

    if (args.length < 2) {
      const reply = await message.channel.send('❌ Formato inválido. Use: `!fedital <unidade>`');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    const unidade = args[1].toLowerCase();

    if (!CANAIS_EDITAL[unidade]) {
      const reply = await message.channel.send('❌ Unidade inválida. Use: `heat`, `sat`, `gtm`, `marshal`');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    const canalEdital = await client.channels.fetch(CANAIS_EDITAL[unidade]).catch(() => null);
    if (!canalEdital) {
      const reply = await message.channel.send('❌ Canal da unidade não encontrado.');
      setTimeout(() => reply.delete().catch(() => {}), 10000);
      return;
    }

    // envia o texto de edital fechado no canal da unidade
    await canalEdital.send(TEXTOS_FECHAMENTO[unidade]);

    // envia a menção do cargo policia abaixo da mensagem
    await canalEdital.send(`<@&${CARGO_ID}>`);

    const confirmMsg = await message.channel.send('✅ Edital fechado com sucesso!');
    setTimeout(() => {
      confirmMsg.delete().catch(() => {});
    }, 10000);
  }
});

client.login(TOKEN);
