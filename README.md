# Documentação - Bot de Discord para Polícia GTA RP (Gratuito)

[BOT versão DIP (Civil)](https://github.com/lksdgn/policia-dip-discord-bot-gtarp)

## Índice
1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Dependências e Bibliotecas](#dependências-e-bibliotecas)
6. [Configuração Inicial](#configuração-inicial)
7. [Outros Tokens](#outros-tokens)
8. [Configuração Detalhada por Arquivo](#configuração-detalhada-por-arquivo)
9. [Lista Completa de Comandos](#lista-completa-de-comandos)
10. [Como Executar o Bot](#como-executar-o-bot)
11. [Sistemas Especiais](#sistemas-especiais)
12. [Checklist de Configuração](#checklist-de-configuração)
13. [Solução de Problemas](#solução-de-problemas)

---

## Visão Geral

Este é um bot Discord completo e robusto desenvolvido para servidores de roleplay da Polícia Militar. O bot gerencia diversos sistemas integrados:

- **Sistema de Recrutamento** - Controle de novos membros e aprovações
- **Sistema de Treinamento** - Cursos MAP, CORE e especializações
- **Sistema de Unidades** - Gerenciamento de SAT, GTM, CORE, HEAT e MARSHAL
- **Sistema de Tickets** - Atendimento e suporte com transcrições
- **Sistema de Ranking** - Top 5 semanal automático
- **Sistema de Controle de Horas** - Registro e relatórios de tempo
- **Sistema de Advertências** - Controle disciplinar
- **Sistema de Provas** - Testes teóricos com 22 questões
- **Sistema de Medalhas** - Gerenciamento de condecorações
- **Sistema de Hierarquia** - Promoções e patentes

---

## Requisitos

### Requisitos de Sistema
- **Node.js** versão 16.x ou superior (recomendado: 18.x ou 20.x)
- **npm** versão 7.x ou superior
- **Memória RAM** mínima: 512MB
- **Espaço em disco**: ~100MB

### Requisitos do Discord
- Uma aplicação/bot criado no [Discord Developer Portal](https://discord.com/developers/applications)
- Token do bot
- Permissões de bot necessárias:
  - Administrator (recomendado) OU
  - Manage Roles, Manage Channels, Send Messages, Embed Links, Attach Files, Read Message History, Add Reactions, Use Slash Commands

### Opcional
- **PM2** para gerenciamento em produção (`npm install -g pm2`)

---

## Instalação

### Passo 1: Clonar/Baixar o Projeto
```bash
cd /caminho/para/bot-police
```

### Passo 2: Instalar Dependências
```bash
npm install
```

Este comando irá instalar todas as bibliotecas necessárias listadas em `package.json`.

---

## Estrutura do Projeto

```
bot-police/
├── index.js                    # Arquivo principal do bot (entry point)
├── package.json               # Dependências e configurações do npm
├── config.json                # Configuração do dono e senha admin
├── token.json                 # Token do bot (CONFIGURE!)
│
├── Comandos/                  # Todos os comandos do bot
│   ├── config/               # Comandos de configuração
│   │   ├── botconfig.js
│   │   ├── config.js
│   │   ├── criar.js
│   │   └── ping.js
│   │
│   ├── set/                  # Comandos de setup
│   │   ├── perms.js
│   │   ├── setdono.js
│   │   └── setpainel.js
│   │
│   └── utilidades/           # Comandos principais (22 arquivos)
│       ├── adv.js           # Sistema de advertências
│       ├── botinfo.js       # Informações do bot
│       ├── clear.js         # Limpar mensagens
│       ├── consultar.js     # Consultar requisitos
│       ├── criarembed.js    # Criar embeds customizados
│       ├── deletealltickets.js  # Deletar todos os tickets
│       ├── edital.js        # Publicar editais de recrutamento
│       ├── filtrar.js       # Filtrar membros sem requisitos
│       ├── hierarquia.js    # Mostrar hierarquia
│       ├── hora.js          # Calcular horas por cargo
│       ├── horas.js         # Calcular horas de todos
│       ├── lock.js          # Trancar canal
│       ├── medalhas.js      # Sistema de medalhas (reação)
│       ├── paineis.js       # Sistema de painéis
│       ├── perfil.js        # Perfil do usuário
│       ├── prova.js         # Prova teórica
│       ├── reiniciar.js     # Reiniciar o bot
│       ├── say.js           # Enviar mensagens
│       ├── solicitarset.js  # Solicitar sets de cargos
│       ├── top.js           # Top 5 semanal (automático)
│       └── unlock.js        # Destrancar canal
│
├── events/                    # Handlers de eventos
│   ├── abrir-ticket.js       # Abrir tickets
│   ├── assumir.js            # Assumir tickets
│   ├── botconfig.js          # Config do bot
│   ├── config.js             # Configurações
│   ├── logsSystem.js         # Sistema de logs
│   ├── paineis.js            # Painéis interativos
│   ├── setpainel.js          # Setup de painéis
│   ├── sistemaavalia.js      # Sistema de avaliação
│   ├── ticket-finalizar.js   # Finalizar tickets
│   └── ticket.js             # Sistema de tickets
│
├── handler/                   # Handlers de interações
│   ├── index.js              # Carregador de comandos
│   ├── interactionCreate.js  # Router de interações
│   └── buttons/              # Handlers de botões
│       ├── setcore.js
│       ├── setfox.js
│       ├── setmap.js
│       ├── setrec.js
│       └── setuni.js
│
├── json/                      # Banco de dados (arquivos JSON)
│   ├── bloqueados.json       # Cooldown de testes
│   ├── botconfig.json        # Config do bot
│   ├── cargos.json          # IDs de cargos/canais (CRÍTICO!)
│   ├── configbot.json        # Configurações adicionais
│   ├── data_ticket.json      # Dados de tickets
│   ├── emojis.json           # Referências de emojis
│   ├── filtros.json          # Grupos de cargos para filtros
│   ├── idmap.json            # Mapeamento de IDs
│   ├── perms.json            # Permissões
│   ├── setcargo.json         # Sets pendentes MAP
│   ├── setcargo_core.json    # Sets pendentes CORE
│   ├── setcargo_uni.json     # Sets pendentes Unidades
│   ├── tickets.json          # Config de tickets
│   └── ups.json              # Tracking de promoções
│
└── logs/                      # Arquivos de log
    ├── bot.log               # Logs gerais
    └── bot-error.log         # Logs de erro
```

---

## Dependências e Bibliotecas

O bot utiliza as seguintes bibliotecas (instaladas via `npm install`):

| Biblioteca | Versão | Descrição |
|-----------|---------|-----------|
| **discord.js** | ^14.14.1 | Framework principal para interagir com a API do Discord. Gerencia eventos, comandos, botões, modais, etc. |
| **wio.db** | ^4.0.22 | Banco de dados JSON simples para persistir dados localmente sem necessidade de SQL. |
| **discord-html-transcripts** | ^3.2.0 | Gera transcrições HTML dos tickets para arquivamento. |
| **axios** | ^1.6.7 | Cliente HTTP para fazer requisições web (usado em algumas integrações). |
| **dayjs** | ^1.11.13 | Biblioteca moderna para manipulação de datas e horas. |
| **moment** | ^2.30.1 | Biblioteca de datas (legado, redundante com dayjs - pode ser removido). |
| **node-cron** | ^4.2.1 | Agendador de tarefas automáticas (usado no sistema de Top 5 semanal). |
| **randomized-string** | ^2.0.1 | Geração de strings aleatórias (usado em IDs de tickets). |
| **mercadopago** | ^2.0.8 | Integração com MercadoPago (não está em uso, mas você pode usar). |

### Como Cada Biblioteca é Usada:

- **discord.js**: Base de tudo - eventos, comandos slash, botões, embeds
- **wio.db**: Salva configurações, tickets, permissões em arquivos JSON
- **discord-html-transcripts**: Cria arquivo HTML quando um ticket é finalizado
- **dayjs/moment**: Calcula horas trabalhadas, formata datas em logs e perfis
- **node-cron**: Executa automaticamente o comando de Top 5 toda sexta e sábado
- **axios**: Requisições HTTP (se houver integrações externas)
- **randomized-string**: Gera IDs únicos para tickets

---

## Configuração Inicial

### 1 Configurar Token do Bot

Edite o arquivo **`token.json`** na raiz do projeto:

```json
{
  "token": "SEU_TOKEN_DO_BOT_AQUI"
}
```

**Como obter o token:**
1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Selecione sua aplicação
3. Vá em "Bot" no menu lateral
4. Clique em "Reset Token" ou "Copy" para copiar o token
5. Cole no arquivo `token.json`

**NUNCA compartilhe seu token publicamente!**

---

### 2 Configurar Dono e Senha

Edite o arquivo **`config.json`** na raiz do projeto:

```json
{
  "dono": "SEU_ID_DE_USUARIO_DISCORD",
  "senha": "SUA_SENHA_ADMIN_SEGURA",
  "setdono": "setado"
}
```

**Como obter seu ID de usuário:**
1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com o botão direito no seu nome
3. Selecione "Copiar ID"

---

### 3 Configurar IDs de Cargos e Canais (CRÍTICO!)

Este é o arquivo **MAIS IMPORTANTE** para configurar. Edite **`json/cargos.json`**:

```json
{
  "canalLogId": "ID_DO_CANAL_DE_LOG_MAP",
  "cargoAprovadorId": [
    "ID_CARGO_APROVADOR_1",
    "ID_CARGO_APROVADOR_2"
  ],

  "canalLogCoreId": "ID_DO_CANAL_DE_LOG_CORE",
  "cargoAprovadorCoreId": [
    "ID_CARGO_APROVADOR_CORE_1",
    "ID_CARGO_APROVADOR_CORE_2"
  ],

  "canalLogUniId": "ID_DO_CANAL_DE_LOG_UNIDADES",
  "cargoAprovadorUniId": [
    "ID_CARGO_APROVADOR_UNI_1",
    "ID_CARGO_APROVADOR_UNI_2"
  ],

  "fox": "ID_CARGO_FOX",
  "canalLogFoxId": "ID_CANAL_LOG_FOX",

  "canalLogRecId": "ID_CANAL_LOG_RECRUTAMENTO",
  "cargoAprovadorRecId": [
    "ID_CARGO_APROVADOR_REC"
  ],

  "rec1": "ID_CARGO_RECRUTA",
  "rec2": "ID_CARGO_POLICIA",
  "rec3": "ID_CARGO_WHITELISTED",
  "rec4": "ID_CARGO_ASPIRANTE_PATENTE",
  "rec5": "ID_CARGO_DISCORD",

  "cargos": [
    { "id": "ID_CURSO_SISTEMA_PRISIONAL", "nome": "Sistema prisional" },
    { "id": "ID_CURSO_PERSEGUICAO", "nome": "Perseguição" },
    { "id": "ID_CURSO_ABORDAGEM", "nome": "Abordagem" },
    { "id": "ID_CURSO_MODULACAO", "nome": "Modulação na Central" },
    { "id": "ID_CURSO_NOCOES_BASICAS", "nome": "Noções Básicas" }
  ],

  "cargosUni": [
    { "id": "ID_CARGO_SAT", "nome": "SAT" },
    { "id": "ID_CARGO_GTM", "nome": "GTM" },
    { "id": "ID_CARGO_CORE", "nome": "CORE" },
    { "id": "ID_CARGO_HEAT", "nome": "HEAT" },
    { "id": "ID_CARGO_MARSHAL", "nome": "MARSHAL" }
  ],

  "cargosCore": [
    { "id": "ID_CURSO_NEGOCIACAO", "nome": "Negociação Geral" },
    { "id": "ID_CURSO_GERENCIAMENTO", "nome": "Gerenciamento de Crise" }
  ]
}
```

**Como obter IDs de cargos e canais:**
1. Ative o Modo Desenvolvedor no Discord
2. Para canais: Clique com botão direito no canal > "Copiar ID"
3. Para cargos: Configurações do Servidor > Cargos > Clique no cargo > Copiar ID

---

### 4 Configurar Filtros de Cargos

Edite **`json/filtros.json`**:

```json
{
  "ID_DO_CARGO_PERMITIDO": [
    "ID_CARGO_QUE_PODE_USAR_FILTRO_1",
    "ID_CARGO_QUE_PODE_USAR_FILTRO_2"
  ],
  "laudo_vacina": [
    "ID_CARGO_LAUDO"
  ],
  "map": [
    "ID_CURSO_SISTEMA_PRISIONAL",
    "ID_CURSO_PERSEGUICAO",
    "ID_CURSO_MODULACAO",
    "ID_CURSO_NOCOES_BASICAS",
    "ID_CURSO_ABORDAGEM"
  ],
  "core": [
    "ID_CURSO_NEGOCIACAO",
    "ID_CURSO_GERENCIAMENTO"
  ]
}
```

---

## Outros Tokens

### Tokens em "bots independentes"

**AVISO:** Dentro da **Comandos/utilidades** contém sistemas de horas, perfil e afins, cada arquivo (listado abaixo) possui a configuração de TOKEN separada, caso o processo principal caia (ou quebre com alguma alteração sua) essas funções podem ser iniciadas de forma independente - Você pode configurar para utilizar o **token.json** caso queira.

#### Arquivos com tokens:

| Arquivo | Linha | Arquivo |
|---------|-------|------------------|
| `Comandos/utilidades/hora.js` | Linha 8 |
| `Comandos/utilidades/top.js` | Linha 13 |
| `Comandos/utilidades/perfil.js` | Linha 10 |
| `Comandos/utilidades/reiniciar.js` | Linha 4 |
| `Comandos/utilidades/medalhas.js` | Linha 124 |
| `Comandos/utilidades/horas.js` | Linha 8 |
| `Comandos/utilidades/edital.js` | Linha 4 |

Após configurar o seu TOKEN nos arquivos indicados acima e iniciar o `index.js` na raiz, todos os módulos serão executados automaticamente no mesmo terminal — **não é preciso iniciar cada um separadamente.**

---

## Configuração Detalhada por Arquivo

### `Comandos/utilidades/adv.js` - Sistema de Advertências

**Comando:** `/adv` (Registrar advertências e punições)

**IDs que precisam ser configurados:**

```javascript
// Linha 16: Cargo de Alto Escalão (quem pode usar o comando)
const ALTO_ESCALAO_ID = '1302014768336470018'; // ALTERAR

// Linha 62: Canal onde as advertências serão registradas
const canalAdvId = '1302009973160804514'; // ALTERAR

// Linhas 68-71: IDs dos cargos de advertência
'Verbal': '1005182294878851132',         // ALTERAR
'Advertência 1': '1005181674776187012',  // ALTERAR
'Advertência 2': '1005181864241275050',  // ALTERAR
'Advertência 3': '1005182011020955688'   // ALTERAR
```

**Também configure em `handler/interactionCreate.js`:**
- Linhas 46, 121: Mesmo `ALTO_ESCALAO_ID`
- Linhas 70-75, 110: Mesmos IDs de cargos de advertência

---

### `Comandos/utilidades/hora.js` - Calcular Horas por Cargo

**Comando:** `!hora @cargo`

**IDs que precisam ser configurados:**

```javascript
const TOKEN = 'SEU_TOKEN'; // COLOQUE SEU TOKEN

// Linha 9: Canal de registro de ponto
const ID_CANAL_BATE_PONTO = '1303853664288641105'; // ALTERAR

// Linhas 10-11: Cargos autorizados
const CARGO1 = '1302014768336470018'; // Alto Escalão - ALTERAR
const CARGO2 = '1302009012249956352'; // Segundo Escalão - ALTERAR
```

---

### `Comandos/utilidades/top.js` - Top 5 Semanal Automático

**Comando:** Executa automaticamente (cron)

**IDs que precisam ser configurados:**

```javascript
const TOKEN = 'SEU_TOKEN'; // COLOQUE SEU TOKEN

// Linha 14: Canal de bate ponto
const CANAL_BATE_PONTO = '1303853664288641105'; // ALTERAR

// Linha 15: Canal onde será postado o ranking
const CANAL_LOGS = '1386235194360594492'; // ALTERAR

// Linha 16: Cargo dado ao Top 5
const CARGO_TOP5 = '1393070997489586286'; // ALTERAR

// Linhas 19-22: Cargos que participam do ranking
const CARGOS_AUTORIZADOS = [
  '1302014768336470018', // ALTERAR
  '1302009012249956352', // ALTERAR
  '1302009117755564032', // ALTERAR
  '1302009188962140241'  // ALTERAR
];
```

**Agendamento Automático:**
- Sexta-feira 23:59: Remove cargo Top 5 de todos
- Sábado 23:59: Gera novo Top 5 e atribui cargos

---

### `Comandos/utilidades/prova.js` - Sistema de Provas Teóricas

**Comando:** `!iniciarprova`

**IDs que precisam ser configurados:**

```javascript
// Linha 7: Cargo dado quando aprovado
const CARGO_APROVADO_ID = '1389099924943011932'; // ALTERAR

// Linha 8: Categoria onde os canais de prova serão criados
const CATEGORIA_PROVA_ID = '1368691563021992047'; // ALTERAR

// Linha 9: Canal onde o comando pode ser usado
const CANAL_COMANDO_ID = '1392174555518341160'; // ALTERAR

// Linha 10: Canal de logs das provas
const LOGS_CHANNEL_ID = '1392175626676605070'; // ALTERAR
```

**Perguntas da Prova:**
- Linhas 13-125: 22 questões de múltipla escolha
- Cada questão tem 4 alternativas (A, B, C, D)
- Você pode personalizar todas as perguntas!

**Como funciona:**
1. Usuário usa `!iniciarprova`
2. Bot cria um canal privado temporário
3. Apresenta 22 questões (uma por vez)
4. Corrige automaticamente (mínimo 15 acertos = aprovação)
5. Dá o cargo se aprovado
6. Deleta o canal após 5 segundos

---

### `Comandos/utilidades/hierarquia.js` - Mostrar Hierarquia

**Comando:** `!hierarquia`

**IDs que precisam ser configurados:**

```javascript
// Linha 5: Cargo autorizado a usar o comando
const CARGO_AUTORIZADO_ID = '1338951286145421312'; // ALTERAR

// Linhas 8-24: TODOS os 16 cargos da hierarquia (do maior ao menor)
const hierarquiaCargos = [
  { nome: 'Comando Geral', id: '1302013746138431549' },       // ALTERAR
  { nome: 'Comando', id: '1302013772208689273' },             // ALTERAR
  { nome: 'Sub-Comando', id: '1302013814659862551' },         // ALTERAR
  { nome: 'Coronel', id: '1302013864878010398' },             // ALTERAR
  { nome: 'Tenente-Coronel', id: '1302013931466326107' },     // ALTERAR
  { nome: 'Major', id: '1302013970947137617' },               // ALTERAR
  { nome: 'Capitão', id: '1302014009652793445' },             // ALTERAR
  { nome: 'Tenente', id: '1302014072563155037' },             // ALTERAR
  { nome: '1° Tenente', id: '1302014111914414103' },          // ALTERAR
  { nome: '2° Tenente', id: '1302014168822366279' },          // ALTERAR
  { nome: 'Aspirante a Oficial', id: '1302014210614263838' }, // ALTERAR
  { nome: '1° Sargento', id: '1302014274187137115' },         // ALTERAR
  { nome: '2° Sargento', id: '1302014334920106014' },         // ALTERAR
  { nome: '3° Sargento', id: '1302014388431032412' },         // ALTERAR
  { nome: 'Cabo', id: '1302014432437235713' },                // ALTERAR
  { nome: 'Soldado', id: '1302014485486866483' }              // ALTERAR
];
```

---

### `Comandos/utilidades/perfil.js` - Sistema de Perfil Completo

**Comando:** `!perfil @usuário`

**Este é o comando com MAIS IDs para configurar!**

**IDs que precisam ser configurados:**

```javascript
const TOKEN = 'SEU_TOKEN'; // COLOQUE SEU TOKEN

// Linha 11: Canal de bate ponto
const ID_CANAL_BATE_PONTO = '1303853664288641105'; // ALTERAR

// Linhas 14-30: TODOS os cargos de hierarquia (16 cargos)
const hierarquiaCargos = {
  'Comando Geral': '1302013746138431549',         // ALTERAR
  'Comando': '1302013772208689273',               // ALTERAR
  'Sub-Comando': '1302013814659862551',           // ALTERAR
  'Coronel': '1302013864878010398',               // ALTERAR
  'Tenente-Coronel': '1302013931466326107',       // ALTERAR
  'Major': '1302013970947137617',                 // ALTERAR
  'Capitão': '1302014009652793445',               // ALTERAR
  'Tenente': '1302014072563155037',               // ALTERAR
  '1° Tenente': '1302014111914414103',            // ALTERAR
  '2° Tenente': '1302014168822366279',            // ALTERAR
  'Aspirante a Oficial': '1302014210614263838',   // ALTERAR
  '1° Sargento': '1302014274187137115',           // ALTERAR
  '2° Sargento': '1302014334920106014',           // ALTERAR
  '3° Sargento': '1302014388431032412',           // ALTERAR
  'Cabo': '1302014432437235713',                  // ALTERAR
  'Soldado': '1302014485486866483'                // ALTERAR
};

// Linhas 33-38: Cargos de unidades
const unidadeCargos = {
  'HEAT': '1302009607346536559',    // ALTERAR
  'CORE': '1302009655182852126',    // ALTERAR
  'GTM': '1302009561158565958',     // ALTERAR
  'SAT': '1302009524051980412',     // ALTERAR
  'Marshal': '1302009683863007325'  // ALTERAR
};

// Linhas 42-48: Cargos de cursos (7 cursos)
const cursoCargos = {
  'Sistema prisional': '1302010168844361799',  // ALTERAR
  'Perseguição': '1302010215535005756',        // ALTERAR
  'Abordagem': '1302010244710432849',          // ALTERAR
  'Modulação na Central': '1302010277497536553', // ALTERAR
  'Noções Básicas': '1302010328726413373',     // ALTERAR
  'Negociação Geral': '1302010363245031604',   // ALTERAR
  'Gerenciamento de Crise': '1302010406660403291' // ALTERAR
};

// Linhas 51-55: Cargos de advertências
const advertenciaCargos = {
  'Verbal': '1005182294878851132',         // ALTERAR
  'Advertência 1': '1005181674776187012',  // ALTERAR
  'Advertência 2': '1005181864241275050',  // ALTERAR
  'Advertência 3': '1005182011020955688'   // ALTERAR
};

// Linha 80: ID do servidor
const guild = client.guilds.cache.get('997723713002815508'); // ALTERAR

// Linha 173: Canal onde o comando pode ser usado
if (message.channel.id !== '1382413095460143215') return; // ALTERAR

// Linha 228: Cargo de laudo
const laudoRoleId = '1118537019010846800'; // ALTERAR
```

---

### `Comandos/utilidades/reiniciar.js` - Reiniciar Bot

**Comando:** `!reiniciar`

**IDs que precisam ser configurados:**

```javascript

// Linha 24: IDs dos usuários autorizados a reiniciar o bot
const autorizadoIDs = [
  '480190903252680715',  // ALTERAR
  '520228168209137684'   // ALTERAR
];
```

**Nota:** Este comando usa PM2 para reiniciar. Certifique-se de ter o PM2 instalado:
```bash
npm install -g pm2
```

---

### `Comandos/utilidades/medalhas.js` - Sistema de Medalhas

**Comando:** Reage com medalha em mensagem

**IDs que precisam ser configurados:**

```javascript

// Linhas 14-72: TODOS os 58 cargos de medalhas
const cargosPermitidos = [
  '1389102080988004455', // ALTERAR
  '1389102098000687135', // ALTERAR
  '1389102113175810068', // ALTERAR
  // ... (total de 58 IDs de medalhas)
];

// Linha 76: Cargo extra necessário (divisão)
const CARGO_EXTRA = '1302013770519806063'; // ALTERAR

// Linha 79: Canal de solicitações
const ID_CANAL_SOLICITACAO = '1365829235637354606'; // ALTERAR
```

**Como funciona:**
1. Membro solicita as medalhas no canal configurado (marca o cargo da medalha)
2. O responsável por setar as medalha reage com ✅ na mensagem de quem solicitou
3. Dá o cargo de medalha ao autor da mensagem apos a reação do responsável 
4. Registra no canal de solicitações

Configure para somente quem puder entregar as medalhas poder reagir a mensagem no canal em questão.

---

### `Comandos/utilidades/horas.js` - Relatório de Horas

**Comando:** `!horas`

**IDs que precisam ser configurados:**

```javascript

// Linha 9: Canal de bate ponto
const ID_CANAL_BATE_PONTO = '1303853664288641105'; // ALTERAR
```

---

### `Comandos/utilidades/edital.js` - Sistema de Editais

**Comandos:** `!edital [unidade]` e `!fedital [unidade]`

**IDs que precisam ser configurados:**

```javascript

// Linhas 7-12: Canais de recrutamento de cada unidade
const CANAIS_EDITAL = {
  heat: '1362427401908260976',    // ALTERAR
  sat: '1362427349366214856',     // ALTERAR
  gtm: '1362427402512498869',     // ALTERAR
  marshal: '1362427403217145886'  // ALTERAR
};

// Linha 15: Cargo a ser mencionado no edital
const CARGO_ID = '1175612263273615461'; // ALTERAR
```

**Como usar:**
- `!edital heat` - Abre recrutamento da HEAT
- `!fedital heat` - Fecha recrutamento da HEAT

---

### `Comandos/utilidades/consultar.js` - Consultar Requisitos

**Comando:** `/consultar @usuário`

**IDs que precisam ser configurados:**

```javascript
// Linhas 27-35: Cargos de cursos para verificação
const cargosCursos = {
  'Sistema prisional': '1302010168844361799',      // ALTERAR
  'Perseguição': '1302010215535005756',            // ALTERAR
  'Abordagem': '1302010244710432849',              // ALTERAR
  'Modulação na Central': '1302010277497536553',   // ALTERAR
  'Noções Básicas': '1302010328726413373',         // ALTERAR
  'Negociação Geral': '1302010363245031604',       // ALTERAR
  'Gerenciamento de Crise': '1302010406660403291', // ALTERAR
  'Fox': '1302009760138219622'                     // ALTERAR
};
```

---

### `index.js` - Arquivo Principal

**IDs hardcoded que precisam ser configurados:**

```javascript
// Linhas 176-185: Canais observados para reações de clipboard
const OBSERVED_CHANNELS = [
  '1365890304473108602', // ALTERAR
  '1365890366700994680', // ALTERAR
  '1365890424278880337', // ALTERAR
  '1365890387488092200', // ALTERAR
  '1365890437923115088', // ALTERAR
  '1365890508915609650', // ALTERAR
  '1365890541471342604', // ALTERAR
  '1365890597490896958', // ALTERAR
  '1365890630269472890'  // ALTERAR
];

// Linha 191: Canal de confirmação
const confirmationChannelId = '1365890424278880337'; // ALTERAR

// Linha 201: Canal de laudo
const channelId = '1365827888259141712'; // ALTERAR

// Linha 202: Cargo de laudo
const roleId = '1118537019010846800'; // ALTERAR
```

---

## Lista Completa de Comandos

### Comandos de Configuração (`/Comandos/config/`)

| Comando | Descrição | Permissão |
|---------|-----------|-----------|
| `/ping` | Verifica a latência do bot | Todos |
| `/criar` | Cria algo (precisa revisão) | Admin |
| `/config` | Configurações do bot | Admin |
| `/botconfig` | Configurações avançadas | Admin |

---

### Comandos de Setup (`/Comandos/set/`)

| Comando | Descrição | Permissão |
|---------|-----------|-----------|
| `/perms` | Gerenciar permissões | Owner |
| `/setdono` | Definir dono do bot | Owner |
| `/setpainel` | Configurar painéis | Admin |

---

### Comandos de Utilidades (`/Comandos/utilidades/`)

| Comando | Tipo | Descrição | Config? |
|---------|------|-----------|---------|
| `/adv` | Slash | Registrar advertências e punições | ✅ SIM |
| `/botinfo` | Slash | Informações do bot | ❌ NÃO |
| `/clear` | Slash | Limpar mensagens do canal | ❌ NÃO |
| `/consultar` | Slash | Verificar requisitos de membro | ✅ SIM |
| `/criarembed` | Slash | Criar embeds customizados | ❌ NÃO |
| `/deletealltickets` | Slash | Deletar todos os tickets | ❌ NÃO |
| `/filtrar` | Slash | Filtrar membros sem requisitos | ✅ SIM (filtros.json) |
| `/lock` | Slash | Trancar canal atual | ❌ NÃO |
| `/unlock` | Slash | Destrancar canal atual | ❌ NÃO |
| `/paineis-ticket` | Slash | Gerenciar painéis de ticket | ❌ NÃO |
| `/say` | Slash | Enviar mensagem como bot | ❌ NÃO |
| `/solicitarset` | Slash | Solicitar set de cargos | ✅ SIM (cargos.json) |
| `!edital [uni]` | Prefix | Publicar edital de recrutamento | ✅ SIM |
| `!fedital [uni]` | Prefix | Fechar edital de recrutamento | ✅ SIM |
| `!hierarquia` | Prefix | Mostrar hierarquia do servidor | ✅ SIM |
| `!hora @cargo` | Prefix | Calcular horas de um cargo | ✅ SIM |
| `!horas` | Prefix | Relatório de horas de todos | ✅ SIM |
| `!iniciarprova` | Prefix | Iniciar prova teórica | ✅ SIM |
| `!perfil @user` | Prefix | Mostrar perfil completo | ✅ SIM |
| `!reiniciar` | Prefix | Reiniciar o bot (PM2) | ✅ SIM |
| `!relatorio` | Prefix | Relatório de horas (dup?) | ✅ SIM |
| Medalhas | Reação | Sistema de medalhas por reação | ✅ SIM |

---

### Sistemas Automáticos

| Sistema | Descrição | Agendamento |
|---------|-----------|-------------|
| **Top 5 Semanal** | Gera ranking e dá cargos | Sexta 23:59 (limpa), Sábado 23:59 (gera) |
| **Tickets** | Sistema completo de tickets | Eventos de interação |
| **Logs de Auditoria** | Registra promoções | Em tempo real |
| **Reações Automáticas** | Sugestões e laudo | Em tempo real |

---

## Como Executar o Bot

### Opção 1: Node.js Direto (Desenvolvimento)

```bash
node index.js
```

**Vantagens:**
- Simples e rápido para testar
- Logs aparecem diretamente no terminal

**Desvantagens:**
- Bot para se fechar o terminal
- Não reinicia automaticamente em caso de crash

---

### Opção 2: PM2 (Produção - Recomendado)

#### Instalar PM2:
```bash
npm install -g pm2
```

#### Iniciar o bot:
```bash
pm2 start index.js --name bot-policia
```

#### Comandos úteis do PM2:
```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs bot-policia

# Reiniciar
pm2 restart bot-policia

# Parar
pm2 stop bot-policia

# Remover do PM2
pm2 delete bot-policia

# Salvar configuração
pm2 save

# Iniciar automaticamente no boot
pm2 startup
```

**Vantagens:**
- Bot roda em segundo plano
- Reinicia automaticamente em caso de crash
- Pode iniciar automaticamente ao ligar o servidor
- Gerenciamento de logs

---

## Sistemas Especiais

### Sistema de Tickets

**Como funciona:**
1. Use `/setpainel` para criar um painel de tickets
2. Usuários clicam no botão para abrir tickets
3. Bot cria um canal privado para o atendimento
4. Staff pode "assumir" o ticket
5. Ao finalizar, gera transcrição HTML e arquiva

**Arquivos envolvidos:**
- `events/abrir-ticket.js` - Criação de tickets
- `events/assumir.js` - Staff assume ticket
- `events/ticket-finalizar.js` - Finalização e transcrição
- `json/tickets.json` - Configuração

---

### Sistema de Setagem

**Como funciona:**
1. Use `/solicitarset` para enviar o painel de Solicitar Set
2. Usuários clicam no botão correspondente para preencher as informações (umas são MODAL e outras apenas seleção)
3. Bot entrega os cargos configurados
4. As mensagens de confirmação são enviadas em um canal a parte, as de confirmação pro usuário é Ephemeral


**Arquivos envolvidos:**
- `json/cargos.json` - Cargos dos Cursos MAP/Core/Unidades/SET

**Configuração dos cargos e canais:**
- `canalLogId` = Canal onde será enviada a mensagem de aprovação de cursos MAP
- `cargoAprovadorId` = Cargos que podem aprovar/reprovar SET dos cursos MAP
- `canalLogCoreId` = Canal onde será enviada a mensagem de aprovação dos cursos CORE
- `cargoAprovadorCoreId` = Cargos que podem aprovar/reprovar SET dos cursos CORE
- `canalLogUniId` = Canal onde será enviada a mensagem de aprovação do SET das unidades
- `cargoAprovadorUniId` = Cargo "RESP UNIDADE" que pode aprovar/reprovar o SET da unidade
- `canalLogRecId` = Canal onde será enviada a mensagem de aprovação de SET
- `cargoAprovadorRecId`= Cargos que podem aprovar/reprovar SET de recrutamento
- `FOX` = Não é muito utilizado, mas serve para entregar o cargo FOX para mulheres, configure igual aos demais.
- Os demais são autoexplicativos.

---

### Sistema de Provas Teóricas

**Como funciona:**
1. Alto Escalão usa `!iniciarprova` no canal em que ele quer que fique o aviso da prova
2. Bot envia o EMBED com as informações e o botão para iniciar a prova
3. Bot cria um canal pro usuário que só ele e o Alto Escalão podem ver e apresenta 22 questões sequencialmente
4. Usuário responde com reações (🇦 🇧 🇨 🇩)
5. Correção automática (mínimo 15 acertos)
6. Se aprovado, recebe o cargo
7. Canal é deletado automaticamente

**Configuração:**
- 22 questões personalizáveis em `prova.js` (linhas 13-125)
- Taxa de aprovação: 68% (15/22 questões)
- Cooldown: 24 horas entre tentativas
- Texto do EMBED personalizável em `prova.js`

---

### Sistema de Top 5 Semanal

**Como funciona:**
1. Bot monitora canal de bate-ponto (`ID_CANAL_BATE_PONTO`)
2. Toda sexta às 23:59: Remove cargo Top 5 de todos
3. Todo sábado às 23:59:
   - Calcula horas de todos os membros autorizados
   - Gera ranking dos 5 com mais horas
   - Atribui cargo `CARGO_TOP5`
   - Posta ranking no canal de logs

**Configuração em `top.js`:**
- Agendamento via `node-cron`
- Cron expressions: `'59 23 * * 5'` (sexta) e `'59 23 * * 6'` (sábado)

---

### Sistema de Controle de Horas

**Como funciona:**
1. Bot monitora canal de bate-ponto
2. Lê mensagens embed com formato específico de tempo
3. Extrai data/hora de início e fim
4. Calcula duração
5. Associa ao membro

**Comandos relacionados:**
- `!hora @cargo` - Horas de um cargo específico
- `!horas` - Horas de todos os membros
- `!relatorio` - Relatório detalhado
- `!perfil @user` - Inclui total de horas

**Formato esperado do embed:**
- Título: "REGISTRO DE PONTO"
- Campos com "Início" e "Fim"
- Datas no formato parseável pelo `dayjs`

---

### Sistema de Advertências

**Como funciona:**
1. Alto Escalão usa `/adv`
2. Seleciona tipo de advertência (Verbal, ADV 1, 2 ou 3)
3. Fornece motivo
4. Bot:
   - Remove advertências anteriores (se houver)
   - Adiciona novo cargo de advertência
   - Registra no canal de logs
   - Notifica o usuário

**Hierarquia de advertências:**
1. Verbal (mais leve)
2. Advertência 1
3. Advertência 2
4. Advertência 3 (mais grave)

---

### Sistema de Medalhas

**Como funciona:**
1. Membro autorizado reage com emoji de medalha em mensagem
2. Bot verifica se o reagidor tem o cargo correspondente à medalha
3. Se sim, dá o cargo ao autor da mensagem
4. Registra no canal de solicitações

**Configuração:**
- 58 cargos de medalhas diferentes
- Requer cargo extra (divisão) para usar
- Sistema baseado em reações

---

### Sistema de Perfil

**Informações mostradas:**
- **Avatar** do usuário
- **Patente** (hierarquia)
- **Unidade** (SAT, GTM, CORE, HEAT, MARSHAL)
- **Cursos** concluídos (MAP e CORE)
- **Advertências** ativas
- **Tempo na PM** (desde quando entrou)
- **Total de horas** trabalhadas
- **Última promoção** (via audit log)
- **Laudo** (vacinação)

---

### Sistema de Recrutamento (Editais)

**Comandos:**
- `!edital heat` - Abre recrutamento HEAT
- `!fedital heat` - Fecha recrutamento HEAT
- Funciona para: heat, sat, gtm, marshal

**Como funciona:**
1. Comando `!edital` posta embed no canal da unidade
2. Menciona cargo específico
3. Embed personalizado por unidade
4. `!fedital` deleta o edital

---

## Checklist de Configuração

Use este checklist para garantir que configurou tudo corretamente:

### Configuração Básica
- [ ] Node.js instalado (v16+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Token do bot configurado em `token.json`
- [ ] ID do dono configurado em `config.json`
- [ ] Senha admin configurada em `config.json`

### Configuração de IDs - Arquivos JSON
- [ ] `json/cargos.json` - Todos os IDs de cargos MAP/CORE/Unidades
- [ ] `json/cargos.json` - Todos os canais de log configurados
- [ ] `json/cargos.json` - IDs de aprovadores configurados
- [ ] `json/filtros.json` - Grupos de cargos para filtros

### Configuração de IDs - Comandos
- [ ] `adv.js` - Alto escalão, canal de advertências, 4 cargos de ADV
- [ ] `handler/interactionCreate.js` - Mesmos IDs de advertências
- [ ] `hora.js` - Canal de bate-ponto, 2 cargos autorizados
- [ ] `top.js` - Canal ponto, canal logs, cargo top5, cargos autorizados
- [ ] `prova.js` - Cargo aprovado, categoria, canal comando, canal logs
- [ ] `hierarquia.js` - Cargo autorizado, 16 cargos de hierarquia
- [ ] `perfil.js` - Canal ponto, 16 hierarquias, 5 unidades, 7 cursos, 4 ADVs, guild ID, canal restrito, cargo laudo
- [ ] `reiniciar.js` - IDs de usuários autorizados
- [ ] `medalhas.js` - 58 cargos de medalhas, cargo extra, canal solicitação
- [ ] `horas.js` - Canal de bate-ponto
- [ ] `edital.js` - 4 canais de unidades, cargo a mencionar
- [ ] `consultar.js` - 8 cargos de cursos
- [ ] `index.js` - 9 canais observados, canal confirmação, canal laudo, cargo laudo

### Testes
- [ ] Bot conecta com sucesso
- [ ] Comandos slash aparecem no servidor
- [ ] Sistema de tickets funciona
- [ ] Sistema de advertências funciona
- [ ] Sistema de provas funciona
- [ ] Top 5 agendado corretamente

### Produção
- [ ] PM2 instalado (`npm install -g pm2`)
- [ ] Bot rodando com PM2
- [ ] Logs sendo gerados corretamente
- [ ] Sistema de reinicialização automática funcionando

---

## Solução de Problemas

### Bot não conecta

**Problema:** Bot não inicia ou dá erro de token

**Solução:**
1. Verifique se o token em `token.json` está correto
2. Certifique-se de que não há espaços extras ou quebras de linha
3. Gere um novo token no Discord Developer Portal se necessário
4. Verifique se todas as intents estão habilitadas

---

### Comandos não aparecem

**Problema:** Comandos slash não aparecem no Discord

**Solução:**
1. Aguarde até 1 hora (Discord pode demorar)
2. Saia e entre novamente no servidor
3. Verifique se o bot tem permissão "Use Slash Commands"
4. Recarregue os comandos usando `/config`

---

### Sistema de horas não funciona

**Problema:** Comandos `!hora` e `!horas` não calculam horas

**Solução:**
1. Verifique se `ID_CANAL_BATE_PONTO` está correto
2. Certifique-se de que o bot tem acesso ao canal
3. Verifique o formato das mensagens embed de ponto
4. O bot precisa conseguir ler o histórico do canal

---

### Erro "Cannot find module"

**Problema:** Bot não inicia e mostra erro de módulo não encontrado

**Solução:**
```bash
# Deletar node_modules e reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

---

### Top 5 não executa automaticamente

**Problema:** Sistema de Top 5 não roda nas sextas/sábados

**Solução:**
1. Certifique-se de que o servidor está no fuso correto
2. Verifique se `node-cron` está instalado
3. O bot precisa estar rodando na hora agendada
4. Verifique logs com `pm2 logs`
5. Teste manualmente: execute diretamente o código de cálculo

---

### Bot crasha frequentemente

**Problema:** Bot para de funcionar aleatoriamente

**Solução:**
1. Use PM2 para auto-restart: `pm2 start index.js --name bot-policia`
2. Verifique logs de erro: `pm2 logs bot-policia --err`
3. Aumente a memória disponível se necessário
4. Verifique se há erros não tratados no código

---

### Permissões negadas

**Problema:** Bot não consegue dar cargos ou gerenciar canais

**Solução:**
1. Verifique se o cargo do bot está ACIMA dos cargos que ele precisa gerenciar
2. Dê permissão "Administrator" ao bot (mais fácil) OU
3. Configure permissões específicas: Manage Roles, Manage Channels, etc.
4. Verifique permissões de canal individualmente

---

### Erro "Missing Permissions"

**Problema:** Bot dá erro ao executar comandos

**Solução:**
```javascript
// Adicione logs para debug
console.log('Permissões do bot:', message.guild.members.me.permissions.toArray());
```

Permissões necessárias:
- `ManageRoles` - Gerenciar cargos
- `ManageChannels` - Criar/modificar canais
- `SendMessages` - Enviar mensagens
- `EmbedLinks` - Enviar embeds
- `AttachFiles` - Anexar arquivos (transcrições)
- `ManageMessages` - Deletar mensagens
- `AddReactions` - Adicionar reações
- `ReadMessageHistory` - Ler histórico

---

## Suporte e Recursos Adicionais

### Documentação Oficial
- [Discord.js v14 Documentation](https://discord.js.org/#/docs/discord.js/14.14.1/general/welcome)
- [Discord Developer Portal](https://discord.com/developers/docs/intro)
- [Node.js Documentation](https://nodejs.org/docs/)

### Ferramentas Úteis
- **PM2 Docs:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Cron Expression Generator:** https://crontab.guru/
- **Discord Permissions Calculator:** https://discordapi.com/permissions.html

---

## Notas Finais

### Manutenção Regular
1. **Backups:** Faça backup regular da pasta `/json` (banco de dados)
2. **Logs:** Monitore os logs em `/logs` regularmente
3. **Atualizações:** Mantenha as dependências atualizadas
4. **Segurança:** Nunca compartilhe tokens ou senhas

### Melhorias Sugeridas
1. Migrar de JSON para banco SQL (PostgreSQL/MySQL) para melhor performance
2. Implementar sistema de backup automático
3. Adicionar rate limiting em comandos críticos
4. Criar dashboard web para administração
5. Implementar sistema de logs mais robusto
6. Adicionar testes automatizados

### Limitações Atuais
- Limite de 2 servidores (hardcoded em `index.js`)
- Banco de dados JSON (não ideal para grande volume)
- Sem sistema de permissões granular (usa IDs hardcoded)

---

## Licença e Créditos

- Este bot foi desenvolvido para uso em servidores de GTA V RP da Polícia. Pode ser adaptado para qualquer coisa, basta ter criatividade.
- A venda deste BOT é **proibida**, exceto se você o utilizar apenas como base para outro nicho ou desenvolver novas funcionalidades.

**Desenvolvedor**
 - Lukas (lksdgn) / "Krozz"

**Tecnologias principais:**
- Discord.js v14
- Node.js
- wio.db
- node-cron

---

**Data de criação desta documentação:** 02-11-2025

**Versão da documentação:** 1.2

---

## Conclusão

Este bot é uma solução completa e robusta para gerenciar servidores de roleplay policial no Discord. Com mais de 20 comandos, múltiplos sistemas integrados e automação avançada, ele oferece todas as ferramentas necessárias para administrar recrutamento, treinamento, unidades especiais, controle de horas e muito mais.

**Lembre-se:** Configure TODOS os IDs antes de usar em produção e sempre faça backups regulares!

Divirta-se.
