import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="bg-layer"></div>
  <div class="phone-shell">
    <header class="app-header">
      <div>
        <p class="kicker"><span class="material-symbols-rounded icon icon-inline">public</span> Rede social local mobile</p>
        <h1><span class="material-symbols-rounded icon icon-inline">location_on</span> SPOTLY</h1>
      </div>
      <span id="loginStatus" class="status-pill">Offline</span>
    </header>

    <main id="content" class="content">
      <section class="panel" id="sec-auth">
        <h2><span class="material-symbols-rounded icon">badge</span> 1. Cadastro de usuarios</h2>
        <p class="muted">Login social + cadastro classico para manter controle da identidade.</p>
        <div class="social-grid">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

          <button class="social-btn" data-provider="google" type="button">
            <i class="fa-brands fa-google icon icon-inline"></i> Google
          </button>

          <button class="social-btn" data-provider="instagram" type="button">
            <i class="fa-brands fa-instagram icon icon-inline"></i> Instagram
          </button>
        </div>
        <form id="signupForm" class="stack-form">
          <input id="nameInput" name="name" type="text" placeholder="Nome completo" required />
          <input id="handleInput" name="handle" type="text" placeholder="@usuario" required />
          <input id="emailInput" name="email" type="email" placeholder="Email" required />
          <input id="birthInput" name="birth" type="date" required />
          <input id="passwordInput" name="password" type="password" placeholder="Senha" required />
          <button class="primary-btn" type="submit">Criar conta Spotly</button>
        </form>
        <p id="signupFeedback" class="feedback"></p>
      </section>

      <section class="panel" id="sec-profile">
        <div class="section-head">
          <h2><span class="material-symbols-rounded icon">person</span> 2. Perfil</h2>
          <span id="privacyChip" class="chip">Publico</span>
        </div>
        <div class="profile-card">
          <div id="avatarInitial" class="avatar">A</div>
          <div>
            <strong id="profileName">Anderson Soares</strong>
            <p id="profileHandle">@anderson.soares.si</p>
          </div>
        </div>
        <label class="inline-label" for="photoInput">Foto do perfil</label>
        <input id="photoInput" type="file" accept="image/*" />
        <textarea id="bioInput" rows="2" placeholder="Descricao do perfil"></textarea>
        <label class="inline-label" for="privacySelect">Privacidade do perfil</label>
        <select id="privacySelect">
          <option value="publico">Publico</option>
          <option value="amigos">Somente amigos</option>
          <option value="privado">Privado</option>
        </select>

        <h3><span class="material-symbols-rounded icon">construction</span> Oficina de identidade (efeito IKEA)</h3>
        <p class="muted">Escolha tags de interesse para moldar seu feed local e grupos sugeridos.</p>
        <div id="tagPicker" class="tags-wrap"></div>
        <p id="tagCount" class="muted"></p>

        <form id="postForm" class="stack-form">
          <textarea id="postInput" rows="3" placeholder="Compartilhe algo da sua regiao..."></textarea>
          <button type="submit" class="primary-btn">Postar no perfil</button>
        </form>
        <ul id="postsList" class="post-list"></ul>
      </section>

      <section class="panel" id="sec-connections">
        <h2><span class="material-symbols-rounded icon">groups</span> 3. Conexoes</h2>
        <h3><span class="material-symbols-rounded icon">person_add</span> Solicitacoes pendentes</h3>
        <ul id="requestsList" class="list"></ul>
        <h3><span class="material-symbols-rounded icon">diversity_3</span> Amizades</h3>
        <ul id="friendsList" class="list"></ul>
        <div id="friendProfileCard" class="friend-profile"></div>

        <form id="dmForm" class="inline-form">
          <select id="dmFriendSelect"></select>
          <input id="dmMessage" type="text" placeholder="Mensagem direta" required />
          <button type="submit" class="secondary-btn">Enviar DM</button>
        </form>
        <ul id="dmLog" class="dm-log"></ul>
      </section>

      <section class="panel" id="sec-bubbles">
        <h2><span class="material-symbols-rounded icon">map</span> 4. Bolhas</h2>
        <p class="muted">Visualizacao de bolhas no mapa e notificacao ao entrar em uma regiao.</p>
        <div id="bubbleMap" class="map"></div>
        <p id="bubbleStatus" class="muted"></p>
        <button id="joinBubbleBtn" class="primary-btn" type="button"><span class="material-symbols-rounded icon icon-inline">pin_drop</span> Entrar na bolha selecionada</button>
        <p id="bubbleNotif" class="feedback"></p>
        <h3><span class="material-symbols-rounded icon">location_searching</span> Amigos visiveis no mapa</h3>
        <ul id="bubbleUsers" class="list compact"></ul>
        <div class="shorts-cta">
          <h3><span class="material-symbols-rounded icon">smart_display</span> Videos curtos da regiao</h3>
          <p class="muted">Assista conteudo rapido dos locais ativos e descubra grupos em alta.</p>
          <button id="openShortsBtn" class="secondary-btn" type="button"><span class="material-symbols-rounded icon icon-inline">play_circle</span> Abrir area de videos curtos</button>
        </div>
      </section>

      <section class="panel" id="sec-groups">
        <div class="section-head">
          <h2><span class="material-symbols-rounded icon">forum</span> 5. Grupos por bolha</h2>
          <span id="groupBubbleChip" class="chip">Boa Viagem</span>
        </div>
        <p id="groupGuide" class="muted"></p>
        <div class="groups-toolbar">
          <input id="groupSearch" type="search" placeholder="Buscar grupos por nome ou tag" />
          <button id="toggleCreateGroupBtn" class="ghost-btn" type="button">
            <span class="material-symbols-rounded icon icon-inline">add_circle</span>
            Novo grupo
          </button>
        </div>

        <form id="groupForm" class="stack-form group-create hidden">
          <input id="groupNameInput" type="text" placeholder="Nome do grupo" required />
          <textarea id="groupDescInput" rows="2" placeholder="Descricao"></textarea>
          <input id="groupTagsInput" type="text" placeholder="tags separadas por virgula" />
          <button class="primary-btn" type="submit">Criar grupo na bolha atual</button>
        </form>
        <p id="groupFeedback" class="feedback"></p>

        <h3><span class="material-symbols-rounded icon">travel_explore</span> Grupos disponiveis</h3>
        <div class="active-group">
          <div class="section-head">
            <h3 id="activeGroupName"><span class="material-symbols-rounded icon">chat</span> Selecione um grupo</h3>
            <span id="inactivityBadge" class="chip">0h</span>
          </div>
          <p id="activeGroupMeta" class="muted">Escolha um grupo para abrir o chat.</p>
          <ul id="groupsList" class="group-list"></ul>

          <div class="group-tabs">
            <button id="groupChatTabBtn" class="group-tab active" type="button" data-tab="chat">
              <span class="material-symbols-rounded icon icon-inline">chat</span>
              Chat
            </button>
            <button id="groupSettingsTabBtn" class="group-tab" type="button" data-tab="settings">
              <span class="material-symbols-rounded icon icon-inline">settings</span>
              Config
            </button>
          </div>

          <div id="groupChatPane" class="group-pane active">
            <div id="chatMessages" class="chat-box"></div>
            <form id="chatForm" class="inline-form">
              <input id="chatInput" type="text" placeholder="Mensagem no chat" required />
              <button class="secondary-btn" type="submit">Enviar</button>
            </form>
          </div>

          <div id="groupSettingsPane" class="group-pane">
            <textarea id="groupDescEdit" rows="2" placeholder="Descricao do grupo"></textarea>
            <input id="groupTagsEdit" type="text" placeholder="tags" />
            <div class="button-row">
              <button id="saveGroupMetaBtn" class="ghost-btn" type="button">Salvar descricao/tags</button>
              <button id="simulateInactivityBtn" class="ghost-btn" type="button">Simular +24h</button>
            </div>
            <button id="closeGroupBtn" class="danger-btn" type="button">Encerrar grupo (24h sem atividade)</button>
          </div>
        </div>
      </section>

      <section class="panel" id="sec-shorts">
        <h2><span class="material-symbols-rounded icon">movie</span> 6. Videos curtos</h2>
        <p class="muted">Feed vertical de micro-videos por bolha para descoberta rapida de pessoas e eventos.</p>
        <div class="inline-form">
          <label class="inline-label" for="shortsFilter">Filtrar por bolha</label>
          <select id="shortsFilter">
            <option value="all">Todas as bolhas</option>
            <option value="boa-viagem">Boa Viagem</option>
            <option value="recife-antigo">Recife Antigo</option>
            <option value="ufpe">UFPE</option>
            <option value="olinda">Olinda</option>
          </select>
          <button id="publishShortBtn" class="primary-btn" type="button"><span class="material-symbols-rounded icon icon-inline">upload</span> Publicar video curto</button>
        </div>
        <div class="short-metrics">
          <article>
            <span id="shortViewsTotal">0</span>
            <small>Views totais</small>
          </article>
          <article>
            <span id="shortPlaysSession">0</span>
            <small>Plays na sessao</small>
          </article>
        </div>
        <ul id="shortsList" class="shorts-list"></ul>
        <p id="shortsStatus" class="feedback"></p>
      </section>

      <section class="panel" id="sec-ikea">
        <h2><span class="material-symbols-rounded icon">trending_up</span> 7. Loop IKEA + growth.design</h2>
        <p class="muted">A plataforma estimula investimento pessoal e mede o impacto em grupos ativos.</p>
        <div class="progress-shell">
          <div id="ikeaProgressBar" class="progress-bar"></div>
        </div>
        <ul id="ikeaChecklist" class="checklist"></ul>
        <div class="button-row">
          <button id="ikeaPostBtn" class="secondary-btn" type="button">Gerar post do desafio</button>
          <button id="sendInvitesBtn" class="secondary-btn" type="button">Convidar 2 amigos</button>
          <button id="ikeaGroupBtn" class="secondary-btn" type="button">Criar grupo guiado</button>
          <button id="boostGroupBtn" class="secondary-btn" type="button">Simular grupo ativo</button>
        </div>
        <div class="metrics">
          <article class="metric">
            <span id="metricPosts">0</span>
            <small>Posts no perfil</small>
          </article>
          <article class="metric">
            <span id="metricMsgs">0</span>
            <small>Msgs enviadas</small>
          </article>
          <article class="metric">
            <span id="metricActiveGroups">0/0</span>
            <small>Grupos ativos criados</small>
          </article>
          <article class="metric">
            <span id="metricLift">0%</span>
            <small>Lift de engajamento IKEA</small>
          </article>
        </div>
        <div class="insights">
          <article>
            <h3>Endowed progress</h3>
            <p>Comeca com progresso inicial para reduzir friccao e aumentar chance de completar o ciclo.</p>
          </article>
          <article>
            <h3>Goal-gradient</h3>
            <p>Barra de progresso e proximidade da meta aumentam frequencia de posts e mensagens.</p>
          </article>
          <article>
            <h3>Social proof</h3>
            <p>Notificacao de entrada na bolha e presenca dos amigos criam efeito de prova social.</p>
          </article>
          <article>
            <h3>Commitment</h3>
            <p>Tags escolhidas pelo proprio usuario elevam senso de autoria e recorrencia no uso.</p>
          </article>
        </div>
      </section>
    </main>

    <nav class="bottom-nav">
      <button data-target="sec-auth" type="button"><span class="material-symbols-rounded icon">badge</span><span>Conta</span></button>
      <button data-target="sec-profile" type="button"><span class="material-symbols-rounded icon">person</span><span>Perfil</span></button>
      <button data-target="sec-bubbles" type="button"><span class="material-symbols-rounded icon">map</span><span>Bolhas</span></button>
      <button data-target="sec-groups" type="button"><span class="material-symbols-rounded icon">forum</span><span>Grupos</span></button>
      <button data-target="sec-shorts" type="button"><span class="material-symbols-rounded icon">movie</span><span>Videos</span></button>
      <button data-target="sec-ikea" type="button"><span class="material-symbols-rounded icon">insights</span><span>Growth</span></button>
    </nav>
  </div>
`

const ONE_HOUR_MS = 3600000
const now = Date.now()
const availableTags = [
  'musica',
  'esportes',
  'tecnologia',
  'gastronomia',
  'estudos',
  'eventos',
  'startup',
  'arte',
]

const state = {
  authProvider: null,
  user: {
    name: 'Anderson Soares',
    handle: '@anderson.soares.si',
    email: 'anderson@email.com',
    birth: '1996-08-10',
    password: '',
    bio: 'Criando comunidades locais com tecnologia.',
    privacy: 'publico',
    photoUrl: '',
    createdAt: now,
  },
  selectedTags: ['tecnologia'],
  posts: [
    {
      id: 'p1',
      text: 'Testando o Spotly em Recife. Bora criar um grupo de dev local?',
      createdAt: now - ONE_HOUR_MS * 6,
      likes: 18,
      comments: 3,
    },
  ],
  friendRequests: [
    { id: 'r1', name: 'Lucas Ribeiro', handle: '@lucas.ribeiro', bubbleId: 'boa-viagem' },
    { id: 'r2', name: 'Duda Gomes', handle: '@dudagomes', bubbleId: 'recife-antigo' },
  ],
  friends: [
    {
      id: 'f1',
      name: 'Ana Clara Amim',
      handle: '@anaclaraamim',
      bubbleId: 'boa-viagem',
      bio: 'Curadoria de eventos locais e grupos culturais.',
    },
    {
      id: 'f2',
      name: 'Ravi Melo',
      handle: '@ravimelo',
      bubbleId: 'ufpe',
      bio: 'Organizo encontros de tecnologia e estudo.',
    },
    {
      id: 'f3',
      name: 'Joana Sales',
      handle: '@joanasales',
      bubbleId: 'recife-antigo',
      bio: 'Conecto comunidades criativas do bairro.',
    },
  ],
  blockedUsers: [],
  selectedFriendId: 'f1',
  directMessages: [],
  invitesSent: 0,
  shortPlays: 0,
  shortVideos: [
    {
      id: 's1',
      title: 'Treino coletivo no parque da orla',
      bubbleId: 'boa-viagem',
      creator: '@anaclaraamim',
      duration: '00:32',
      views: 320,
      likes: 62,
    },
    {
      id: 's2',
      title: 'Mini-tour do meetup Cafe & Codigo',
      bubbleId: 'recife-antigo',
      creator: '@joanasales',
      duration: '00:41',
      views: 286,
      likes: 57,
    },
    {
      id: 's3',
      title: 'Bastidores da feira cultural na UFPE',
      bubbleId: 'ufpe',
      creator: '@ravimelo',
      duration: '00:38',
      views: 194,
      likes: 43,
    },
  ],
  bubbles: [
    { id: 'boa-viagem', name: 'Boa Viagem', city: 'Recife', x: 68, y: 74, members: 142 },
    { id: 'recife-antigo', name: 'Recife Antigo', city: 'Recife', x: 42, y: 36, members: 96 },
    { id: 'ufpe', name: 'UFPE', city: 'Recife', x: 22, y: 62, members: 134 },
    { id: 'olinda', name: 'Olinda', city: 'Olinda', x: 76, y: 24, members: 88 },
  ],
  selectedBubble: 'boa-viagem',
  joinedBubble: null,
  bubbleNotification: '',
  groups: [
    {
      id: 'g1',
      name: 'Corrida no Parque',
      description: 'Treinos matinais na orla de Boa Viagem.',
      tags: ['esportes', 'saude'],
      bubbleId: 'boa-viagem',
      creator: '@anaclaraamim',
      createdAt: now - ONE_HOUR_MS * 28,
      lastActivity: now - ONE_HOUR_MS * 2,
      messages: [
        { author: '@anaclaraamim', text: 'Treino hoje 18h?', at: now - ONE_HOUR_MS * 2 },
        { author: '@ravimelo', text: 'Fechado! Levo agua extra.', at: now - ONE_HOUR_MS * 1.8 },
      ],
    },
    {
      id: 'g2',
      name: 'Cafe & Codigo',
      description: 'Dev meetup de sabado no Recife Antigo.',
      tags: ['tecnologia', 'startup'],
      bubbleId: 'recife-antigo',
      creator: '@joanasales',
      createdAt: now - ONE_HOUR_MS * 40,
      lastActivity: now - ONE_HOUR_MS * 9,
      messages: [
        { author: '@joanasales', text: 'Tema: IA aplicada a negocios locais.', at: now - ONE_HOUR_MS * 10 },
      ],
    },
    {
      id: 'g3',
      name: 'Feira Cultural UFPE',
      description: 'Troca de livros, arte e musica no campus.',
      tags: ['arte', 'estudos', 'eventos'],
      bubbleId: 'ufpe',
      creator: '@ravimelo',
      createdAt: now - ONE_HOUR_MS * 52,
      lastActivity: now - ONE_HOUR_MS * 26,
      messages: [
        { author: '@ravimelo', text: 'Montagem dos stands as 14h.', at: now - ONE_HOUR_MS * 26 },
      ],
    },
  ],
  selectedGroupId: 'g1',
  groupUi: {
    createOpen: false,
    activeTab: 'chat',
  },
  challengeStart: now,
}

const refs = {
  content: document.querySelector('#content'),
  loginStatus: document.querySelector('#loginStatus'),
  signupForm: document.querySelector('#signupForm'),
  signupFeedback: document.querySelector('#signupFeedback'),
  nameInput: document.querySelector('#nameInput'),
  handleInput: document.querySelector('#handleInput'),
  emailInput: document.querySelector('#emailInput'),
  birthInput: document.querySelector('#birthInput'),
  passwordInput: document.querySelector('#passwordInput'),
  profileName: document.querySelector('#profileName'),
  profileHandle: document.querySelector('#profileHandle'),
  avatarInitial: document.querySelector('#avatarInitial'),
  bioInput: document.querySelector('#bioInput'),
  photoInput: document.querySelector('#photoInput'),
  privacySelect: document.querySelector('#privacySelect'),
  privacyChip: document.querySelector('#privacyChip'),
  tagPicker: document.querySelector('#tagPicker'),
  tagCount: document.querySelector('#tagCount'),
  postForm: document.querySelector('#postForm'),
  postInput: document.querySelector('#postInput'),
  postsList: document.querySelector('#postsList'),
  requestsList: document.querySelector('#requestsList'),
  friendsList: document.querySelector('#friendsList'),
  friendProfileCard: document.querySelector('#friendProfileCard'),
  dmForm: document.querySelector('#dmForm'),
  dmFriendSelect: document.querySelector('#dmFriendSelect'),
  dmMessage: document.querySelector('#dmMessage'),
  dmLog: document.querySelector('#dmLog'),
  bubbleMap: document.querySelector('#bubbleMap'),
  bubbleStatus: document.querySelector('#bubbleStatus'),
  joinBubbleBtn: document.querySelector('#joinBubbleBtn'),
  bubbleNotif: document.querySelector('#bubbleNotif'),
  bubbleUsers: document.querySelector('#bubbleUsers'),
  openShortsBtn: document.querySelector('#openShortsBtn'),
  groupSearch: document.querySelector('#groupSearch'),
  groupBubbleChip: document.querySelector('#groupBubbleChip'),
  groupGuide: document.querySelector('#groupGuide'),
  toggleCreateGroupBtn: document.querySelector('#toggleCreateGroupBtn'),
  groupsList: document.querySelector('#groupsList'),
  groupForm: document.querySelector('#groupForm'),
  groupNameInput: document.querySelector('#groupNameInput'),
  groupDescInput: document.querySelector('#groupDescInput'),
  groupTagsInput: document.querySelector('#groupTagsInput'),
  groupFeedback: document.querySelector('#groupFeedback'),
  activeGroupName: document.querySelector('#activeGroupName'),
  activeGroupMeta: document.querySelector('#activeGroupMeta'),
  inactivityBadge: document.querySelector('#inactivityBadge'),
  groupChatTabBtn: document.querySelector('#groupChatTabBtn'),
  groupSettingsTabBtn: document.querySelector('#groupSettingsTabBtn'),
  groupChatPane: document.querySelector('#groupChatPane'),
  groupSettingsPane: document.querySelector('#groupSettingsPane'),
  groupDescEdit: document.querySelector('#groupDescEdit'),
  groupTagsEdit: document.querySelector('#groupTagsEdit'),
  saveGroupMetaBtn: document.querySelector('#saveGroupMetaBtn'),
  simulateInactivityBtn: document.querySelector('#simulateInactivityBtn'),
  chatMessages: document.querySelector('#chatMessages'),
  chatForm: document.querySelector('#chatForm'),
  chatInput: document.querySelector('#chatInput'),
  closeGroupBtn: document.querySelector('#closeGroupBtn'),
  shortsFilter: document.querySelector('#shortsFilter'),
  publishShortBtn: document.querySelector('#publishShortBtn'),
  shortViewsTotal: document.querySelector('#shortViewsTotal'),
  shortPlaysSession: document.querySelector('#shortPlaysSession'),
  shortsList: document.querySelector('#shortsList'),
  shortsStatus: document.querySelector('#shortsStatus'),
  ikeaProgressBar: document.querySelector('#ikeaProgressBar'),
  ikeaChecklist: document.querySelector('#ikeaChecklist'),
  ikeaPostBtn: document.querySelector('#ikeaPostBtn'),
  sendInvitesBtn: document.querySelector('#sendInvitesBtn'),
  ikeaGroupBtn: document.querySelector('#ikeaGroupBtn'),
  boostGroupBtn: document.querySelector('#boostGroupBtn'),
  metricPosts: document.querySelector('#metricPosts'),
  metricMsgs: document.querySelector('#metricMsgs'),
  metricActiveGroups: document.querySelector('#metricActiveGroups'),
  metricLift: document.querySelector('#metricLift'),
}

const formatDate = (timestamp) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(
    timestamp,
  )

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const getFriendByHandle = (handle) => state.friends.find((friend) => friend.handle === handle)

const getSelectedBubble = () => state.bubbles.find((bubble) => bubble.id === state.selectedBubble)

const getFilteredGroups = () => {
  const term = refs.groupSearch.value.trim().toLowerCase()
  return state.groups.filter((group) => {
    const inBubble = group.bubbleId === state.selectedBubble
    if (!inBubble) {
      return false
    }
    if (!term) {
      return true
    }
    const searchable = `${group.name} ${group.tags.join(' ')}`.toLowerCase()
    return searchable.includes(term)
  })
}

const getSelectedGroup = () => state.groups.find((group) => group.id === state.selectedGroupId) || null

const getGroupInactivityHours = (group) => Math.floor((Date.now() - group.lastActivity) / ONE_HOUR_MS)

const countSentGroupMessages = () =>
  state.groups.reduce((acc, group) => acc + group.messages.filter((message) => message.author === state.user.handle).length, 0)

const computeIkeaTasks = () => {
  const createdGroups = state.groups.filter((group) => group.creator === state.user.handle).length
  const sentMessages = countSentGroupMessages()
  return [
    { id: 'tags', label: 'Escolher 3 tags pessoais', done: state.selectedTags.length >= 3 },
    { id: 'post', label: 'Publicar 1 post no perfil', done: state.posts.length >= 1 },
    { id: 'invite', label: 'Convidar 2 amigos', done: state.invitesSent >= 2 },
    { id: 'group', label: 'Criar 1 grupo local', done: createdGroups >= 1 },
    { id: 'chat', label: 'Enviar 5 mensagens no chat', done: sentMessages >= 5 },
  ]
}

const computeIkeaMetrics = () => {
  const createdGroups = state.groups.filter((group) => group.creator === state.user.handle)
  const activeGroups = createdGroups.filter((group) => group.messages.length >= 8)
  const sentMessages = countSentGroupMessages()
  const tasks = computeIkeaTasks()
  const completedTasks = tasks.filter((task) => task.done).length
  const baseEngagement = 80 + state.posts.length * 10 + sentMessages * 3 + createdGroups.length * 16
  const ikeaEngagement = Math.round(baseEngagement * (1 + completedTasks * 0.08 + activeGroups.length * 0.05))
  const lift = Math.round(((ikeaEngagement - baseEngagement) / baseEngagement) * 100)
  return {
    posts: state.posts.length,
    sentMessages,
    createdGroups: createdGroups.length,
    activeGroups: activeGroups.length,
    completedTasks,
    totalTasks: tasks.length,
    lift,
    tasks,
  }
}

const syncProfileForm = () => {
  refs.nameInput.value = state.user.name
  refs.handleInput.value = state.user.handle
  refs.emailInput.value = state.user.email
  refs.birthInput.value = state.user.birth
  refs.bioInput.value = state.user.bio
  refs.privacySelect.value = state.user.privacy
}

const renderHeader = () => {
  refs.loginStatus.textContent = state.authProvider ? `Online via ${state.authProvider}` : 'Offline'
}

const renderProfile = () => {
  refs.profileName.textContent = state.user.name
  refs.profileHandle.textContent = state.user.handle
  if (state.user.photoUrl) {
    refs.avatarInitial.textContent = ''
    refs.avatarInitial.style.backgroundImage = `url('${state.user.photoUrl}')`
    refs.avatarInitial.classList.add('avatar-photo')
  } else {
    refs.avatarInitial.textContent = state.user.name.slice(0, 1).toUpperCase()
    refs.avatarInitial.style.backgroundImage = ''
    refs.avatarInitial.classList.remove('avatar-photo')
  }
  refs.privacyChip.textContent = state.user.privacy
  refs.tagCount.textContent = `${state.selectedTags.length}/3 tags para liberar o bonus IKEA inicial.`
}

const renderTags = () => {
  refs.tagPicker.innerHTML = availableTags
    .map((tag) => {
      const selected = state.selectedTags.includes(tag)
      return `<button type="button" class="tag-option ${selected ? 'selected' : ''}" data-tag="${tag}">${tag}</button>`
    })
    .join('')
}

const renderPosts = () => {
  if (state.posts.length === 0) {
    refs.postsList.innerHTML = `<li class="empty">Nenhum post ainda. Crie o primeiro para ativar o efeito IKEA.</li>`
    return
  }

  refs.postsList.innerHTML = state.posts
    .map(
      (post) => `
      <li class="post-item">
        <p>${escapeHtml(post.text)}</p>
        <small>${formatDate(post.createdAt)} • ${post.likes} curtidas • ${post.comments} comentarios</small>
      </li>
    `,
    )
    .join('')
}

const renderConnections = () => {
  refs.requestsList.innerHTML =
    state.friendRequests.length === 0
      ? '<li class="empty">Sem novas solicitacoes.</li>'
      : state.friendRequests
          .map(
            (request) => `
          <li>
            <div>
              <strong>${request.name}</strong>
              <small>${request.handle}</small>
            </div>
            <div class="tiny-actions">
              <button type="button" class="tiny-btn" data-action="accept" data-id="${request.id}">Aceitar</button>
              <button type="button" class="tiny-btn" data-action="reject" data-id="${request.id}">Recusar</button>
            </div>
          </li>
        `,
          )
          .join('')

  refs.friendsList.innerHTML =
    state.friends.length === 0
      ? '<li class="empty">Sem amizades ativas.</li>'
      : state.friends
          .map(
            (friend) => `
          <li>
            <div>
              <strong>${friend.name}</strong>
              <small>${friend.handle}</small>
            </div>
            <div class="tiny-actions">
              <button type="button" class="tiny-btn" data-action="view-profile" data-id="${friend.id}">Perfil</button>
              <button type="button" class="tiny-btn" data-action="remove-friend" data-id="${friend.id}">Desfazer</button>
              <button type="button" class="tiny-btn danger" data-action="block" data-id="${friend.id}">Bloquear</button>
            </div>
          </li>
        `,
          )
          .join('')

  const selectedFriend = state.friends.find((friend) => friend.id === state.selectedFriendId)
  refs.friendProfileCard.innerHTML = selectedFriend
    ? `
      <div class="friend-avatar">${selectedFriend.name.slice(0, 1).toUpperCase()}</div>
      <div>
        <strong>${selectedFriend.name}</strong>
        <p>${selectedFriend.handle}</p>
        <small>${selectedFriend.bio || 'Perfil sem descricao.'}</small>
      </div>
    `
    : '<p class="empty">Selecione um amigo para visualizar o perfil.</p>'

  refs.dmFriendSelect.innerHTML =
    state.friends.length === 0
      ? '<option value="">Sem amigos</option>'
      : state.friends.map((friend) => `<option value="${friend.id}">${friend.name}</option>`).join('')

  refs.dmLog.innerHTML =
    state.directMessages.length === 0
      ? '<li class="empty">Nenhuma DM enviada.</li>'
      : state.directMessages
          .slice()
          .reverse()
          .map(
            (dm) => `
          <li>
            <strong>Para ${dm.to}</strong>
            <p>${escapeHtml(dm.text)}</p>
            <small>${formatDate(dm.at)}</small>
          </li>
        `,
          )
          .join('')
}

const renderBubbleMap = () => {
  refs.bubbleMap.innerHTML = state.bubbles
    .map((bubble) => {
      const selected = bubble.id === state.selectedBubble
      const joined = bubble.id === state.joinedBubble
      return `
        <button
          type="button"
          class="map-pin ${selected ? 'selected' : ''} ${joined ? 'joined' : ''}"
          data-bubble="${bubble.id}"
          style="left:${bubble.x}%;top:${bubble.y}%"
        >
          ${bubble.name}
        </button>
      `
    })
    .join('')
}

const renderBubbleState = () => {
  const bubble = getSelectedBubble()
  const isInsideSelected = state.joinedBubble === state.selectedBubble
  refs.bubbleStatus.textContent = `${bubble.name} (${bubble.city}) • ${bubble.members} pessoas proximas. ${isInsideSelected ? 'Voce esta nessa bolha.' : 'Voce ainda nao entrou nessa bolha.'}`
  refs.bubbleNotif.textContent = state.bubbleNotification

  const visibleUsers = [
    ...state.friends,
    { id: 'u1', name: 'Nina Torres', handle: '@nina.torres', bubbleId: 'boa-viagem' },
    { id: 'u2', name: 'Caio Prado', handle: '@caioprado', bubbleId: 'recife-antigo' },
  ].filter((user) => user.bubbleId === state.selectedBubble)

  refs.bubbleUsers.innerHTML =
    visibleUsers.length === 0
      ? '<li class="empty">Nenhum usuario visivel agora.</li>'
      : visibleUsers
          .map((user) => `<li><strong>${user.name}</strong><small>${user.handle} ${getFriendByHandle(user.handle) ? '• amigo' : ''}</small></li>`)
          .join('')
}

const getBubbleName = (bubbleId) => state.bubbles.find((bubble) => bubble.id === bubbleId)?.name || bubbleId

const getFilteredShorts = () => {
  const filter = refs.shortsFilter.value
  if (filter === 'all') {
    return state.shortVideos
  }
  return state.shortVideos.filter((shortVideo) => shortVideo.bubbleId === filter)
}

const renderShorts = () => {
  const visibleShorts = getFilteredShorts()
  refs.shortsList.innerHTML =
    visibleShorts.length === 0
      ? '<li class="empty">Sem videos para essa bolha.</li>'
      : visibleShorts
          .map(
            (shortVideo) => `
            <li class="short-card">
              <div class="short-thumb">
                <span class="material-symbols-rounded icon">play_circle</span>
                <small>${shortVideo.duration}</small>
              </div>
              <div class="short-meta">
                <strong>${escapeHtml(shortVideo.title)}</strong>
                <p>${shortVideo.creator} • ${getBubbleName(shortVideo.bubbleId)}</p>
                <small>${shortVideo.views} views • ${shortVideo.likes} curtidas</small>
              </div>
              <button class="tiny-btn" type="button" data-short-action="play" data-short-id="${shortVideo.id}">
                Assistir
              </button>
            </li>
          `,
          )
          .join('')

  refs.shortViewsTotal.textContent = String(state.shortVideos.reduce((total, shortVideo) => total + shortVideo.views, 0))
  refs.shortPlaysSession.textContent = String(state.shortPlays)
}

const ensureSelectedGroup = () => {
  const filtered = getFilteredGroups()
  if (filtered.some((group) => group.id === state.selectedGroupId)) {
    return
  }
  state.selectedGroupId = filtered[0]?.id || null
}

const setGroupTab = (tab) => {
  state.groupUi.activeTab = tab === 'settings' ? 'settings' : 'chat'
  const isChatTab = state.groupUi.activeTab === 'chat'
  refs.groupChatTabBtn.classList.toggle('active', isChatTab)
  refs.groupSettingsTabBtn.classList.toggle('active', !isChatTab)
  refs.groupChatPane.classList.toggle('active', isChatTab)
  refs.groupSettingsPane.classList.toggle('active', !isChatTab)
}

const renderGroups = () => {
  ensureSelectedGroup()
  const filtered = getFilteredGroups()
  const bubble = getSelectedBubble()
  const canCreateInBubble = state.joinedBubble === state.selectedBubble

  refs.groupBubbleChip.textContent = bubble.name
  refs.groupGuide.textContent = canCreateInBubble
    ? `Voce esta em ${bubble.name}. Pode criar novos grupos e movimentar a comunidade.`
    : `Entre na bolha ${bubble.name} para criar grupo. Enquanto isso, voce pode explorar os grupos existentes.`

  refs.toggleCreateGroupBtn.innerHTML = state.groupUi.createOpen
    ? '<span class="material-symbols-rounded icon icon-inline">close</span> Fechar criacao'
    : '<span class="material-symbols-rounded icon icon-inline">add_circle</span> Novo grupo'
  refs.groupForm.classList.toggle('hidden', !state.groupUi.createOpen)

  refs.groupsList.innerHTML =
    filtered.length === 0
      ? '<li class="empty">Sem grupos nesta bolha para a busca atual.</li>'
      : filtered
          .map((group) => {
            const selected = group.id === state.selectedGroupId
            const inactivityHours = getGroupInactivityHours(group)
            const groupStateLabel = inactivityHours < 3 ? 'Ativo agora' : `${inactivityHours}h sem mensagens`
            return `
              <li class="group-card ${selected ? 'selected' : ''}" data-group-id="${group.id}">
                <div class="group-title-row">
                  <strong>${group.name}</strong>
                  <span class="group-state ${inactivityHours < 3 ? 'hot' : 'quiet'}">${groupStateLabel}</span>
                </div>
                <p class="group-description">${escapeHtml(group.description)}</p>
                <div class="group-tags">
                  ${group.tags.map((tag) => `<span>#${tag}</span>`).join('')}
                </div>
                <div class="group-meta-row">
                  <small>${group.creator} • ${group.messages.length} mensagens</small>
                  <button class="tiny-btn group-open-btn" type="button" data-group-id="${group.id}">Abrir</button>
                </div>
              </li>
            `
          })
          .join('')

  const group = getSelectedGroup()
  if (!group) {
    state.groupUi.activeTab = 'chat'
    refs.activeGroupName.textContent = 'Selecione um grupo'
    refs.activeGroupMeta.textContent = 'Escolha um grupo da lista para participar.'
    refs.inactivityBadge.textContent = '0h'
    refs.groupDescEdit.value = ''
    refs.groupTagsEdit.value = ''
    refs.groupChatTabBtn.disabled = true
    refs.groupSettingsTabBtn.disabled = true
    refs.groupDescEdit.disabled = true
    refs.groupTagsEdit.disabled = true
    refs.saveGroupMetaBtn.disabled = true
    refs.simulateInactivityBtn.disabled = true
    refs.chatMessages.innerHTML = '<p class="empty">Nenhum chat para mostrar.</p>'
    refs.chatInput.disabled = true
    refs.closeGroupBtn.disabled = true
    refs.groupChatPane.classList.add('active')
    refs.groupSettingsPane.classList.remove('active')
    refs.groupChatTabBtn.classList.add('active')
    refs.groupSettingsTabBtn.classList.remove('active')
    return
  }

  const inactivityHours = getGroupInactivityHours(group)
  const userIsCreator = group.creator === state.user.handle
  const canClose = userIsCreator && inactivityHours >= 24
  if (!userIsCreator && state.groupUi.activeTab === 'settings') {
    state.groupUi.activeTab = 'chat'
  }
  const isChatTab = state.groupUi.activeTab === 'chat'

  refs.activeGroupName.textContent = group.name
  refs.activeGroupMeta.textContent = `${group.creator} • ${group.messages.length} mensagens • #${group.tags.join(' #')}`
  refs.inactivityBadge.textContent = `${inactivityHours}h sem atividade`
  refs.groupChatTabBtn.disabled = false
  refs.groupSettingsTabBtn.disabled = !userIsCreator
  refs.groupDescEdit.value = group.description
  refs.groupTagsEdit.value = group.tags.join(', ')
  refs.groupDescEdit.disabled = !userIsCreator
  refs.groupTagsEdit.disabled = !userIsCreator
  refs.saveGroupMetaBtn.disabled = !userIsCreator
  refs.simulateInactivityBtn.disabled = !userIsCreator
  refs.chatInput.disabled = false
  refs.closeGroupBtn.disabled = !canClose
  refs.closeGroupBtn.textContent = canClose
    ? 'Encerrar grupo agora'
    : 'Encerrar grupo (24h sem atividade)'

  refs.groupChatTabBtn.classList.toggle('active', isChatTab)
  refs.groupSettingsTabBtn.classList.toggle('active', !isChatTab)
  refs.groupChatPane.classList.toggle('active', isChatTab)
  refs.groupSettingsPane.classList.toggle('active', !isChatTab)

  refs.chatMessages.innerHTML = group.messages
    .map((message) => {
      const fromFriend = Boolean(getFriendByHandle(message.author))
      const fromSelf = message.author === state.user.handle
      const authorClass = fromSelf ? 'author-self' : fromFriend ? 'author-friend' : 'author-neutral'
      return `
        <article class="chat-message">
          <strong class="${authorClass}">${message.author}</strong>
          <p>${escapeHtml(message.text)}</p>
          <small>${formatDate(message.at)}</small>
        </article>
      `
    })
    .join('')
}

const renderIkea = () => {
  const metrics = computeIkeaMetrics()
  const progress = (metrics.completedTasks / metrics.totalTasks) * 100

  refs.ikeaProgressBar.style.width = `${progress}%`
  refs.ikeaChecklist.innerHTML = metrics.tasks
    .map(
      (task) => `
      <li class="${task.done ? 'done' : ''}">
        <span>${task.done ? '✓' : '○'}</span>
        <p>${task.label}</p>
      </li>
    `,
    )
    .join('')

  refs.metricPosts.textContent = String(metrics.posts)
  refs.metricMsgs.textContent = String(metrics.sentMessages)
  refs.metricActiveGroups.textContent = `${metrics.activeGroups}/${metrics.createdGroups}`
  refs.metricLift.textContent = `+${metrics.lift}%`
}

const renderAll = () => {
  renderHeader()
  renderProfile()
  renderTags()
  renderPosts()
  renderConnections()
  renderBubbleMap()
  renderBubbleState()
  renderGroups()
  renderShorts()
  renderIkea()
}

const navButtons = Array.from(document.querySelectorAll('.bottom-nav button'))

const setActiveNavButton = (sectionId) => {
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === sectionId)
  })
}

const goToSection = (sectionId) => {
  const section = document.querySelector(`#${sectionId}`)
  if (!section) {
    return
  }
  refs.content.scrollTo({ left: section.offsetLeft, behavior: 'smooth' })
  setActiveNavButton(sectionId)
}

const syncNavByPosition = () => {
  const sections = Array.from(refs.content.querySelectorAll('section.panel'))
  if (sections.length === 0) {
    return
  }
  const currentCenter = refs.content.scrollLeft + refs.content.clientWidth / 2
  let closest = sections[0]
  let closestDistance = Math.abs(closest.offsetLeft + closest.clientWidth / 2 - currentCenter)
  for (let index = 1; index < sections.length; index += 1) {
    const section = sections[index]
    const sectionCenter = section.offsetLeft + section.clientWidth / 2
    const distance = Math.abs(sectionCenter - currentCenter)
    if (distance < closestDistance) {
      closest = section
      closestDistance = distance
    }
  }
  setActiveNavButton(closest.id)
}

const addPost = (text) => {
  const postText = text.trim()
  if (!postText) {
    return false
  }
  state.posts.unshift({
    id: `p${Date.now()}`,
    text: postText,
    createdAt: Date.now(),
    likes: Math.floor(Math.random() * 28) + 2,
    comments: Math.floor(Math.random() * 6),
  })
  return true
}

document.querySelectorAll('.social-btn').forEach((button) => {
  button.addEventListener('click', () => {
    state.authProvider = button.dataset.provider
    refs.signupFeedback.textContent = `Login realizado com ${state.authProvider}.`
    renderHeader()
  })
})

refs.signupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  state.user.name = refs.nameInput.value.trim()
  state.user.handle = refs.handleInput.value.trim().startsWith('@') ? refs.handleInput.value.trim() : `@${refs.handleInput.value.trim()}`
  state.user.email = refs.emailInput.value.trim()
  state.user.birth = refs.birthInput.value
  state.user.password = refs.passwordInput.value
  state.user.createdAt = Date.now()
  refs.signupFeedback.textContent = `Conta criada em ${formatDate(state.user.createdAt)}.`
  renderAll()
})

refs.bioInput.addEventListener('input', () => {
  state.user.bio = refs.bioInput.value
})

refs.photoInput.addEventListener('change', (event) => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  const file = target.files?.[0]
  if (!file) {
    return
  }
  state.user.photoUrl = URL.createObjectURL(file)
  renderProfile()
})

refs.privacySelect.addEventListener('change', () => {
  state.user.privacy = refs.privacySelect.value
  renderProfile()
})

refs.tagPicker.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) {
    return
  }
  const { tag } = target.dataset
  if (!tag) {
    return
  }
  const isSelected = state.selectedTags.includes(tag)
  if (isSelected) {
    state.selectedTags = state.selectedTags.filter((current) => current !== tag)
  } else {
    state.selectedTags.push(tag)
  }
  renderAll()
})

refs.postForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!addPost(refs.postInput.value)) {
    return
  }
  refs.postInput.value = ''
  renderAll()
})

refs.requestsList.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) {
    return
  }

  const id = target.dataset.id
  const action = target.dataset.action
  if (!id || !action) {
    return
  }

  const request = state.friendRequests.find((item) => item.id === id)
  if (!request) {
    return
  }

  if (action === 'accept') {
    state.friends.push({
      id: `f${Date.now()}`,
      name: request.name,
      handle: request.handle,
      bubbleId: request.bubbleId,
      bio: 'Novo contato local no Spotly.',
    })
  }
  state.friendRequests = state.friendRequests.filter((item) => item.id !== id)
  renderAll()
})

refs.friendsList.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) {
    return
  }

  const id = target.dataset.id
  const action = target.dataset.action
  if (!id || !action) {
    return
  }

  const friend = state.friends.find((item) => item.id === id)
  if (!friend) {
    return
  }

  if (action === 'block') {
    state.blockedUsers.push(friend)
  }
  if (action === 'view-profile') {
    state.selectedFriendId = friend.id
    renderConnections()
    return
  }
  state.friends = state.friends.filter((item) => item.id !== id)
  renderAll()
})

refs.dmForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const friendId = refs.dmFriendSelect.value
  const friend = state.friends.find((item) => item.id === friendId)
  if (!friend) {
    return
  }
  const text = refs.dmMessage.value.trim()
  if (!text) {
    return
  }

  state.directMessages.push({ to: friend.name, text, at: Date.now() })
  refs.dmMessage.value = ''
  renderConnections()
  renderIkea()
})

refs.bubbleMap.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) {
    return
  }
  const bubbleId = target.dataset.bubble
  if (!bubbleId) {
    return
  }
  state.selectedBubble = bubbleId
  state.bubbleNotification = ''
  renderAll()
})

refs.joinBubbleBtn.addEventListener('click', () => {
  const bubble = getSelectedBubble()
  state.joinedBubble = bubble.id
  state.bubbleNotification = `Seus amigos foram notificados: ${state.user.handle} entrou em ${bubble.name}.`
  renderAll()
})

refs.openShortsBtn.addEventListener('click', () => {
  goToSection('sec-shorts')
})

refs.groupSearch.addEventListener('input', () => {
  renderGroups()
})

refs.toggleCreateGroupBtn.addEventListener('click', () => {
  if (state.joinedBubble !== state.selectedBubble) {
    refs.groupFeedback.textContent = 'Entre na bolha selecionada para habilitar a criacao.'
    return
  }
  state.groupUi.createOpen = !state.groupUi.createOpen
  refs.groupFeedback.textContent = ''
  renderGroups()
})

refs.groupsList.addEventListener('click', (event) => {
  const target = event.target
  const listItem = target instanceof HTMLElement ? target.closest('li[data-group-id]') : null
  if (!(listItem instanceof HTMLLIElement)) {
    return
  }
  const id = listItem.dataset.groupId
  if (!id) {
    return
  }
  state.selectedGroupId = id
  state.groupUi.activeTab = 'chat'
  renderGroups()
})

refs.groupChatTabBtn.addEventListener('click', () => {
  setGroupTab('chat')
})

refs.groupSettingsTabBtn.addEventListener('click', () => {
  if (refs.groupSettingsTabBtn.disabled) {
    return
  }
  setGroupTab('settings')
})

refs.groupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (state.joinedBubble !== state.selectedBubble) {
    refs.groupFeedback.textContent = 'Entre na bolha selecionada para criar grupo.'
    return
  }
  const name = refs.groupNameInput.value.trim()
  if (!name) {
    return
  }
  const description = refs.groupDescInput.value.trim() || 'Grupo local sem descricao.'
  const tags = refs.groupTagsInput.value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
  const groupId = `g${Date.now()}`
  state.groups.unshift({
    id: groupId,
    name,
    description,
    tags: tags.length ? tags : ['geral'],
    bubbleId: state.selectedBubble,
    creator: state.user.handle,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    messages: [{ author: state.user.handle, text: 'Grupo criado! Vamos movimentar.', at: Date.now() }],
  })
  state.selectedGroupId = groupId
  state.groupUi.createOpen = false
  state.groupUi.activeTab = 'chat'
  refs.groupNameInput.value = ''
  refs.groupDescInput.value = ''
  refs.groupTagsInput.value = ''
  refs.groupFeedback.textContent = 'Grupo criado com sucesso.'
  renderAll()
})

refs.saveGroupMetaBtn.addEventListener('click', () => {
  const group = getSelectedGroup()
  if (!group || group.creator !== state.user.handle) {
    return
  }
  group.description = refs.groupDescEdit.value.trim() || group.description
  group.tags = refs.groupTagsEdit.value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
  if (group.tags.length === 0) {
    group.tags = ['geral']
  }
  refs.groupFeedback.textContent = 'Descricao e tags atualizadas.'
  renderAll()
})

refs.simulateInactivityBtn.addEventListener('click', () => {
  const group = getSelectedGroup()
  if (!group || group.creator !== state.user.handle) {
    return
  }
  group.lastActivity -= ONE_HOUR_MS * 24
  renderGroups()
})

refs.chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const group = getSelectedGroup()
  if (!group) {
    return
  }
  const text = refs.chatInput.value.trim()
  if (!text) {
    return
  }
  group.messages.push({
    author: state.user.handle,
    text,
    at: Date.now(),
  })
  group.lastActivity = Date.now()
  refs.chatInput.value = ''
  renderAll()
})

refs.closeGroupBtn.addEventListener('click', () => {
  const group = getSelectedGroup()
  if (!group || group.creator !== state.user.handle) {
    return
  }
  if (getGroupInactivityHours(group) < 24) {
    refs.groupFeedback.textContent = 'Aguarde 24h sem atividade para encerrar.'
    return
  }
  state.groups = state.groups.filter((item) => item.id !== group.id)
  state.selectedGroupId = null
  state.groupUi.activeTab = 'chat'
  refs.groupFeedback.textContent = 'Grupo encerrado pelo criador.'
  renderAll()
})

refs.shortsFilter.addEventListener('change', () => {
  renderShorts()
})

refs.publishShortBtn.addEventListener('click', () => {
  if (state.joinedBubble !== state.selectedBubble) {
    refs.shortsStatus.textContent = 'Entre na bolha atual para publicar video curto.'
    goToSection('sec-bubbles')
    return
  }
  const bubble = getSelectedBubble()
  state.shortVideos.unshift({
    id: `s${Date.now()}`,
    title: `Momento ao vivo em ${bubble.name}`,
    bubbleId: bubble.id,
    creator: state.user.handle,
    duration: '00:29',
    views: 0,
    likes: 0,
  })
  refs.shortsFilter.value = bubble.id
  refs.shortsStatus.textContent = `Video curto publicado em ${bubble.name}.`
  renderShorts()
})

refs.shortsList.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) {
    return
  }
  const action = target.dataset.shortAction
  const shortId = target.dataset.shortId
  if (action !== 'play' || !shortId) {
    return
  }
  const shortVideo = state.shortVideos.find((item) => item.id === shortId)
  if (!shortVideo) {
    return
  }
  shortVideo.views += Math.floor(Math.random() * 18) + 8
  shortVideo.likes += Math.floor(Math.random() * 5) + 1
  state.shortPlays += 1
  refs.shortsStatus.textContent = `Assistindo: ${shortVideo.title}`
  renderShorts()
})

refs.ikeaPostBtn.addEventListener('click', () => {
  const bubble = getSelectedBubble()
  const generated = `Desafio Spotly: compartilhei meu plano para conectar pessoas em ${bubble.name}.`
  addPost(generated)
  renderAll()
})

refs.sendInvitesBtn.addEventListener('click', () => {
  state.invitesSent += 2
  refs.bubbleNotif.textContent = `${state.user.handle} convidou 2 amigos para colaborar na bolha.`
  renderIkea()
})

refs.ikeaGroupBtn.addEventListener('click', () => {
  if (state.joinedBubble !== state.selectedBubble) {
    refs.groupFeedback.textContent = 'Entre na bolha antes de usar o criador guiado.'
    goToSection('sec-bubbles')
    return
  }
  const bubble = getSelectedBubble()
  refs.groupNameInput.value = `Mutirao ${bubble.name}`
  refs.groupDescInput.value = 'Grupo criado pelo desafio IKEA para gerar ownership da comunidade local.'
  refs.groupTagsInput.value = state.selectedTags.slice(0, 3).join(', ')
  goToSection('sec-groups')
})

refs.boostGroupBtn.addEventListener('click', () => {
  const ownGroup = state.groups.find((group) => group.creator === state.user.handle)
  if (!ownGroup) {
    refs.groupFeedback.textContent = 'Crie um grupo para simular atividade.'
    return
  }

  const crowdMessages = [
    '@anaclaraamim: confirmei presenca',
    '@ravimelo: posso levar materiais',
    '@joanasales: vou divulgar no stories',
    '@dudagomes: marquei mais 3 pessoas',
    '@caioprado: bora fechar horario',
    '@nina.torres: gostei da ideia',
    '@anaclaraamim: grupo bombando!',
  ]

  crowdMessages.forEach((entry, index) => {
    const [author, text] = entry.split(':')
    ownGroup.messages.push({ author, text: text.trim(), at: Date.now() + index * 60000 })
  })
  ownGroup.lastActivity = Date.now()
  state.selectedGroupId = ownGroup.id
  refs.groupFeedback.textContent = 'Atividade simulada: grupo ficou ativo.'
  renderAll()
})

document.querySelector('.bottom-nav').addEventListener('click', (event) => {
  const target = event.target
  const button = target instanceof HTMLElement ? target.closest('button[data-target]') : null
  if (!(button instanceof HTMLButtonElement)) {
    return
  }
  const sectionId = button.dataset.target
  if (!sectionId) {
    return
  }
  goToSection(sectionId)
})

let navSyncFrame = 0
refs.content.addEventListener('scroll', () => {
  cancelAnimationFrame(navSyncFrame)
  navSyncFrame = requestAnimationFrame(() => {
    syncNavByPosition()
  })
})

syncProfileForm()
renderAll()
setActiveNavButton('sec-auth')
