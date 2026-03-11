import './style.css'

const app = document.querySelector('#app')
const STORAGE_KEY = 'spotly_mobile_lab_v1'
const MINUTE = 60_000
const HOUR = 60 * MINUTE

const AREAS = ['Boa Viagem', 'Recife Antigo', 'Casa Amarela', 'Olinda']
const TONES = [
  { id: 'sunset', label: 'Sunset' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'aqua', label: 'Aqua' },
  { id: 'night', label: 'Night Shift' },
]
const STICKERS = ['Corrida', 'Cafe', 'Live', 'Sunset', 'Arte', 'Study']
const PRIVACY_OPTIONS = [
  { id: 'close', label: 'Amigos proximos' },
  { id: 'invite', label: 'Somente convite' },
  { id: 'local', label: 'Publico local' },
]
const NUDGE_META = {
  contexto: {
    label: 'Contexto',
    summary: 'A mesma oferta parece mais relevante quando a mensagem combina com o momento e com o lugar da pessoa.',
    surfaces: 'Hero inicial e troca de bairro.',
  },
  provaSocial: {
    label: 'Prova social',
    summary: 'Likes, saves, pessoas proximas e amigos em comum reforcam adesao.',
    surfaces: 'Feed, desafios em alta e criadores sugeridos.',
  },
  hawthorne: {
    label: 'Hawthorne',
    summary: 'A sensacao de estar sendo observado aumenta o cuidado com a participacao.',
    surfaces: 'Tela Foco com visibilidade para anfitrioes.',
  },
  padrao: {
    label: 'Padrao',
    summary: 'Uma opcao predefinida reduz atrito e conduz a configuracao escolhida.',
    surfaces: 'Bloco de privacidade na aba Explorar.',
  },
  ikea: {
    label: 'IKEA',
    summary: 'Quanto mais o usuario monta algo, mais valor percebe nesse objeto.',
    surfaces: 'Studio Criar e cards autorais publicados.',
  },
  halo: {
    label: 'Halo',
    summary: 'Badges e reputacao positiva irradiam confianca para o restante do conteudo.',
    surfaces: 'Posts com selo e criadores destacados.',
  },
  imagem: {
    label: 'Superioridade de imagem',
    summary: 'O conteudo visual tem mais saliencia e memorabilidade do que o texto puro.',
    surfaces: 'Stories, posters do feed e preview do studio.',
  },
  disponibilidade: {
    label: 'Disponibilidade',
    summary: 'O que parece recente e facil de lembrar ganha prioridade mental.',
    surfaces: 'Ordenacao do feed, cards em alta e labels de agora.',
  },
  custoAfundado: {
    label: 'Custo afundado',
    summary: 'Progresso acumulado vira motivo para continuar em vez de abandonar.',
    surfaces: 'Tela Foco com barra de setup, streak e checklist.',
  },
}

const GUIDE_TAB_LABELS = {
  home: 'Inicio',
  explore: 'Explorar',
  create: 'Criar',
  focus: 'Foco',
}

const createDefaultState = () => ({
  tab: 'home',
  area: 'Boa Viagem',
  nudgesOn: true,
  nudges: {
    contexto: true,
    provaSocial: true,
    hawthorne: true,
    padrao: true,
    ikea: true,
    halo: true,
    imagem: true,
    disponibilidade: true,
    custoAfundado: true,
  },
  user: {
    name: 'Anderson Soares',
    handle: '@anderson.soares',
    city: 'Recife',
    privacy: 'close',
    streak: 6,
    progress: 0,
    profileScore: 0,
  },
  stats: {
    observers: 17,
    visitsToday: 29,
    saves: 56,
  },
  composer: {
    title: 'Corrida leve + cafe depois',
    caption: 'Quero juntar gente criativa para uma rotina curta perto da praia.',
    tone: 'sunset',
    stickers: ['Corrida', 'Cafe', 'Sunset'],
  },
  stories: [
    { id: 's1', name: 'Lia', theme: 'sunset', label: 'Orla' },
    { id: 's2', name: 'Ravi', theme: 'aqua', label: 'Meetup' },
    { id: 's3', name: 'Maya', theme: 'editorial', label: 'Drop' },
    { id: 's4', name: 'Joao', theme: 'night', label: 'Night' },
    { id: 's5', name: 'Bia', theme: 'sunset', label: 'Live' },
  ],
  posts: [
    {
      id: 'p1',
      name: 'Lia Costa',
      handle: '@liacosta',
      area: 'Boa Viagem',
      verified: true,
      theme: 'sunset',
      title: 'Drop da orla',
      caption: 'Sessao curta de corrida e smoothie no fim da tarde.',
      socialLine: '14 pessoas que voce segue salvaram este drop.',
      likes: 1284,
      comments: 61,
      saves: 240,
      liked: false,
      saved: false,
      when: Date.now() - 22 * MINUTE,
    },
    {
      id: 'p2',
      name: 'Maya Leal',
      handle: '@mayaleal',
      area: 'Recife Antigo',
      verified: true,
      theme: 'editorial',
      title: 'Mesa criativa de sexta',
      caption: 'Cafe, camera analogica e pauta aberta para criadores locais.',
      socialLine: '8 amigos em comum interagiram hoje.',
      likes: 964,
      comments: 43,
      saves: 188,
      liked: false,
      saved: false,
      when: Date.now() - 55 * MINUTE,
    },
    {
      id: 'p3',
      name: 'Ravi Melo',
      handle: '@ravimelo',
      area: 'Casa Amarela',
      verified: false,
      theme: 'aqua',
      title: 'Code jam de bairro',
      caption: 'Uma noite para prototipar com gente de produto e design.',
      socialLine: 'Entrou em alta depois de 3 compartilhamentos seguidos.',
      likes: 618,
      comments: 27,
      saves: 131,
      liked: false,
      saved: true,
      when: Date.now() - 3 * HOUR,
    },
  ],
  creators: [
    {
      id: 'c1',
      name: 'Maya Leal',
      handle: '@mayaleal',
      field: 'Lifestyle e direcao criativa',
      followers: 18400,
      mutuals: 12,
      verified: true,
      following: false,
      theme: 'editorial',
    },
    {
      id: 'c2',
      name: 'Lia Costa',
      handle: '@liacosta',
      field: 'Run club e wellness local',
      followers: 11200,
      mutuals: 9,
      verified: true,
      following: false,
      theme: 'sunset',
    },
    {
      id: 'c3',
      name: 'Ravi Melo',
      handle: '@ravimelo',
      field: 'Tech, study groups e comunidade',
      followers: 7600,
      mutuals: 6,
      verified: false,
      following: true,
      theme: 'aqua',
    },
  ],
  challenges: [
    {
      id: 'd1',
      title: 'Sunset Run Club',
      area: 'Boa Viagem',
      people: 284,
      friends: 16,
      joined: true,
      theme: 'sunset',
      reason: 'Resposta forte nas ultimas 2h.',
    },
    {
      id: 'd2',
      title: 'Cafe e camera',
      area: 'Recife Antigo',
      people: 171,
      friends: 9,
      joined: false,
      theme: 'editorial',
      reason: 'Muita lembranca recente no feed de hoje.',
    },
    {
      id: 'd3',
      title: 'Study burst 45',
      area: 'Casa Amarela',
      people: 143,
      friends: 7,
      joined: false,
      theme: 'aqua',
      reason: 'Entrou em alta agora mesmo.',
    },
  ],
  checklist: [
    { id: 'photo', label: 'Adicionar capa do perfil', done: true },
    { id: 'intro', label: 'Publicar primeiro drop', done: true },
    { id: 'club', label: 'Entrar em um clube local', done: false },
    { id: 'close', label: 'Definir publico de proximidade', done: false },
  ],
  createdDrops: [
    {
      id: 'u1',
      title: 'Roteiro de sabado manual',
      caption: 'Montei este drop com cafe, arte e caminhada para gente de Recife.',
      theme: 'editorial',
      stickers: ['Cafe', 'Arte'],
      createdAt: Date.now() - 6 * HOUR,
    },
  ],
})

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const clone = (value) => JSON.parse(JSON.stringify(value))

const loadState = () => {
  const base = createDefaultState()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return base
    }

    const saved = JSON.parse(raw)

    return {
      ...base,
      ...saved,
      nudges: { ...base.nudges, ...(saved.nudges || {}) },
      user: { ...base.user, ...(saved.user || {}) },
      stats: { ...base.stats, ...(saved.stats || {}) },
      composer: { ...base.composer, ...(saved.composer || {}) },
      stories: Array.isArray(saved.stories) ? saved.stories : base.stories,
      posts: Array.isArray(saved.posts) ? saved.posts : base.posts,
      creators: Array.isArray(saved.creators) ? saved.creators : base.creators,
      challenges: Array.isArray(saved.challenges) ? saved.challenges : base.challenges,
      checklist: Array.isArray(saved.checklist) ? saved.checklist : base.checklist,
      createdDrops: Array.isArray(saved.createdDrops) ? saved.createdDrops : base.createdDrops,
    }
  } catch {
    return base
  }
}

const state = loadState()
let flash = null
let flashTimer = null

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const getGuideItems = (key) => {
  const authoredLabel = state.createdDrops[0]?.title || 'Drop autoral'
  const hasAuthoredDrop = Boolean(state.createdDrops[0])

  const guideMap = {
    contexto: [
      { tab: 'home', section: 'home-hero', label: 'Hero inicial' },
      { tab: 'explore', section: 'explore-context', label: 'Troque o contexto' },
    ],
    provaSocial: [
      { tab: 'home', section: 'home-feed', label: 'Feed' },
      { tab: 'explore', section: 'explore-trending', label: 'Em alta agora' },
      { tab: 'explore', section: 'explore-creators', label: 'Criadores com halo' },
    ],
    hawthorne: [
      { tab: 'focus', section: 'focus-visibility', label: 'Visibilidade ativa' },
    ],
    padrao: [
      { tab: 'explore', section: 'explore-privacy', label: 'Configuracao padrao' },
    ],
    ikea: [
      ...(hasAuthoredDrop ? [{ tab: 'home', section: 'home-spotlight', label: authoredLabel }] : []),
      { tab: 'create', section: 'create-studio', label: 'Studio autoral' },
      { tab: 'create', section: 'create-published', label: 'Seus drops publicados' },
    ],
    halo: [
      { tab: 'explore', section: 'explore-creators', label: 'Criadores com halo' },
      { tab: 'home', section: 'home-feed', label: 'Feed com selo' },
    ],
    imagem: [
      { tab: 'home', section: 'home-stories', label: 'Stories memoraveis' },
      ...(hasAuthoredDrop ? [{ tab: 'home', section: 'home-spotlight', label: authoredLabel }] : []),
      { tab: 'create', section: 'create-preview', label: 'Preview mobile' },
    ],
    disponibilidade: [
      { tab: 'home', section: 'home-hero', label: 'Hero inicial' },
      { tab: 'explore', section: 'explore-trending', label: 'Em alta agora' },
      { tab: 'home', section: 'home-feed', label: 'Feed quente agora' },
    ],
    custoAfundado: [
      { tab: 'focus', section: 'focus-progress', label: 'Voce ja construiu bastante' },
      { tab: 'focus', section: 'focus-checklist', label: 'Checklist de adesao' },
    ],
  }

  return guideMap[key] || []
}

const nudgeOn = (key) => state.nudgesOn && state.nudges[key]

const formatCompact = (value) =>
  new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value)

const relativeTime = (timestamp) => {
  const diff = Date.now() - timestamp
  if (diff < 60 * MINUTE) {
    return `${Math.max(1, Math.round(diff / MINUTE))} min`
  }

  if (diff < 24 * HOUR) {
    return `${Math.round(diff / HOUR)} h`
  }

  return 'ontem'
}

const clockTime = () =>
  new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(Date.now())

const currentDaypart = () => {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'manha'
  }

  if (hour < 18) {
    return 'tarde'
  }

  return 'noite'
}

const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((chunk) => chunk[0] || '')
    .join('')
    .toUpperCase()

const getContextCopy = () => {
  const time = currentDaypart()
  const activeChallenge = state.challenges.find((challenge) => challenge.area === state.area) || state.challenges[0]
  const socialTail = nudgeOn('provaSocial')
    ? ` ${activeChallenge.people} pessoas proximas abriram essa trilha hoje.`
    : ''

  if (!nudgeOn('contexto')) {
    return `Descubra o que esta rendendo perto de ${state.area}.${socialTail}`
  }

  if (time === 'manha') {
    return `Bom dia em ${state.area}: quem entra cedo pega os drops mais leves e organiza melhor o dia.${socialTail}`
  }

  if (time === 'tarde') {
    return `Na tarde em ${state.area}, os convites com resposta rapida convertem melhor e lotam antes do por do sol.${socialTail}`
  }

  return `Agora a noite em ${state.area}, perder o que ja esta rolando pesa mais do que entrar cedo.${socialTail}`
}

const recalculateDerivedState = () => {
  const doneCount = state.checklist.filter((item) => item.done).length
  const joinedCount = state.challenges.filter((challenge) => challenge.joined).length
  const authoredCount = state.createdDrops.length

  state.user.progress = Math.min(40 + doneCount * 8 + joinedCount * 5 + authoredCount * 4 + state.user.streak * 3, 96)
  state.user.profileScore = Math.min(64 + doneCount * 7 + joinedCount * 4 + authoredCount * 5, 99)
  state.stats.observers = 12 + doneCount + joinedCount * 2 + Math.floor(authoredCount / 2)
  state.stats.visitsToday = 19 + joinedCount * 3 + authoredCount * 2 + doneCount
  state.stats.saves = 37 + state.posts.filter((post) => post.saved).length * 8 + authoredCount * 6
}

const showFlash = (label, text) => {
  flash = { label, text }
  render()

  if (flashTimer) {
    clearTimeout(flashTimer)
  }

  flashTimer = window.setTimeout(() => {
    flash = null
    render()
  }, 2200)
}

const renderMarkers = (keys) => {
  const active = keys.filter((key) => nudgeOn(key))

  if (!active.length) {
    return ''
  }

  return `
    <div class="nudge-note">
      ${active
        .map((key) => `<span>${escapeHtml(NUDGE_META[key].label)}</span>`)
        .join('')}
    </div>
  `
}

const renderGuidePanel = () => `
  <aside class="guide-panel panel">
    <div class="guide-panel__head">
      <span class="eyebrow-pill">Guia de navegacao</span>
      <h2>Onde cada efeito aparece</h2>
      <p>Clique em um item azul para abrir a aba correta e rolar ate a area onde o efeito foi aplicado.</p>
    </div>

    <div class="guide-list">
      ${Object.keys(NUDGE_META)
        .map((key, index) => {
          const items = getGuideItems(key)

          return `
            <section class="guide-group">
              <div class="guide-group__title">
                <span>${index + 1}.</span>
                <strong>Efeito ${escapeHtml(NUDGE_META[key].label)}</strong>
                <p>${escapeHtml(NUDGE_META[key].summary)}</p>
              </div>

              <div class="guide-group__links">
                ${items
                  .map(
                    (item) => `
                      <button
                        class="guide-link"
                        data-action="navigate-guide"
                        data-tab="${escapeHtml(item.tab)}"
                        data-section="${escapeHtml(item.section)}"
                      >
                        <span>${escapeHtml(item.label)}</span>
                        <small>${escapeHtml(GUIDE_TAB_LABELS[item.tab] || item.tab)}</small>
                      </button>
                    `,
                  )
                  .join('')}
              </div>
            </section>
          `
        })
        .join('')}
    </div>
  </aside>
`

const renderAreaChips = () => `
  <div class="chip-row">
    ${AREAS.map(
      (area) => `
        <button class="chip ${state.area === area ? 'is-active' : ''}" data-action="select-area" data-area="${escapeHtml(area)}">
          ${escapeHtml(area)}
        </button>
      `,
    ).join('')}
  </div>
`

const sortedPosts = () => {
  const items = clone(state.posts)
  if (nudgeOn('disponibilidade')) {
    return items.sort((a, b) => b.when - a.when)
  }

  return items
}

const renderPoster = (item, options = {}) => {
  if (!nudgeOn('imagem')) {
    return `
      <div class="poster poster--plain">
        <div class="poster__meta">Conteudo simplificado</div>
        <h3 class="poster__title">${escapeHtml(item.title)}</h3>
        <p class="poster__subtitle">${escapeHtml(options.subtitle || item.caption || item.reason || '')}</p>
      </div>
    `
  }

  return `
    <div class="poster poster--${escapeHtml(item.theme)} ${options.compact ? 'poster--compact' : ''}">
      <div class="poster__grain"></div>
      <div class="poster__meta">${escapeHtml(options.kicker || item.area || 'Spotly')}</div>
      <h3 class="poster__title">${escapeHtml(item.title)}</h3>
      <p class="poster__subtitle">${escapeHtml(options.subtitle || item.caption || item.reason || '')}</p>
      ${item.stickers ? `<div class="poster__tags">${item.stickers.map((sticker) => `<span>${escapeHtml(sticker)}</span>`).join('')}</div>` : ''}
    </div>
  `
}

const renderStory = (story) => `
  <button class="story-card story-card--${escapeHtml(story.theme)}" data-action="open-story" data-id="${escapeHtml(story.id)}">
    <span class="story-card__label">${escapeHtml(story.label)}</span>
    <strong>${escapeHtml(story.name)}</strong>
  </button>
`

const renderPost = (post) => `
  <article class="feed-card">
    <div class="feed-card__head">
      <div class="identity">
        <div class="avatar avatar--${escapeHtml(post.theme)}">${escapeHtml(initials(post.name))}</div>
        <div>
          <strong>${escapeHtml(post.handle)}</strong>
          <span>${escapeHtml(post.area)}${nudgeOn('disponibilidade') ? ` · ${escapeHtml(relativeTime(post.when))}` : ''}</span>
        </div>
      </div>
      ${nudgeOn('halo') && post.verified ? '<span class="verified-badge"><span class="material-symbols-rounded">verified</span> Halo</span>' : ''}
    </div>

    ${renderPoster(post, { kicker: nudgeOn('disponibilidade') ? 'Quente agora' : post.area })}

    <div class="feed-card__body">
      ${nudgeOn('provaSocial') ? `<div class="feed-card__social">${escapeHtml(post.socialLine)}</div>` : ''}
      <p class="feed-card__caption"><strong>${escapeHtml(post.handle)}</strong> ${escapeHtml(post.caption)}</p>
      <div class="feed-card__stats">
        <span>${formatCompact(post.likes)} curtidas</span>
        <span>${formatCompact(post.comments)} comentarios</span>
        <span>${formatCompact(post.saves)} saves</span>
      </div>
      <div class="feed-card__actions">
        <button class="icon-action ${post.liked ? 'is-on' : ''}" data-action="toggle-like" data-id="${escapeHtml(post.id)}">
          <span class="material-symbols-rounded">favorite</span>
          Curtir
        </button>
        <button class="icon-action ${post.saved ? 'is-on' : ''}" data-action="toggle-save" data-id="${escapeHtml(post.id)}">
          <span class="material-symbols-rounded">bookmark</span>
          Salvar
        </button>
      </div>
      ${renderMarkers(['disponibilidade', 'provaSocial', 'halo', 'imagem'])}
    </div>
  </article>
`

const renderChallenge = (challenge) => `
  <article class="trend-card">
    ${renderPoster(challenge, {
      kicker: nudgeOn('disponibilidade') ? 'Em alta nas ultimas 24h' : challenge.area,
      subtitle: nudgeOn('provaSocial')
        ? `${challenge.people} pessoas ativas · ${challenge.friends} amigos por perto`
        : challenge.reason,
      compact: true,
    })}
    <div class="trend-card__body">
      <div class="trend-card__meta">
        <strong>${escapeHtml(challenge.title)}</strong>
        <span>${escapeHtml(challenge.area)}</span>
      </div>
      <p>${escapeHtml(challenge.reason)}</p>
      <button class="pill-action ${challenge.joined ? 'is-on' : ''}" data-action="toggle-challenge" data-id="${escapeHtml(challenge.id)}">
        ${challenge.joined ? 'No seu plano' : 'Entrar agora'}
      </button>
      ${renderMarkers(['disponibilidade', 'provaSocial'])}
    </div>
  </article>
`

const renderCreator = (creator) => `
  <article class="creator-card">
    <div class="creator-card__head">
      <div class="identity">
        <div class="avatar avatar--${escapeHtml(creator.theme)}">${escapeHtml(initials(creator.name))}</div>
        <div>
          <strong>${escapeHtml(creator.name)}</strong>
          <span>${escapeHtml(creator.field)}</span>
        </div>
      </div>
      ${nudgeOn('halo') && creator.verified ? '<span class="verified-badge"><span class="material-symbols-rounded">star</span> Top creator</span>' : ''}
    </div>
    <div class="creator-card__meta">
      <span>${formatCompact(creator.followers)} seguidores</span>
      ${nudgeOn('provaSocial') ? `<span>${creator.mutuals} amigos em comum</span>` : ''}
    </div>
    <button class="pill-action ${creator.following ? 'is-on' : ''}" data-action="toggle-follow" data-id="${escapeHtml(creator.id)}">
      ${creator.following ? 'Seguindo' : 'Seguir'}
    </button>
    ${renderMarkers(['halo', 'provaSocial'])}
  </article>
`

const renderChecklistItem = (item) => `
  <button class="check-item ${item.done ? 'is-done' : ''}" data-action="toggle-check" data-id="${escapeHtml(item.id)}">
    <span class="material-symbols-rounded">${item.done ? 'check_circle' : 'radio_button_unchecked'}</span>
    <span>${escapeHtml(item.label)}</span>
  </button>
`

const renderNudgeCard = (key) => `
  <article class="nudge-card ${state.nudges[key] ? 'is-on' : ''}">
    <div class="nudge-card__head">
      <div>
        <strong>${escapeHtml(NUDGE_META[key].label)}</strong>
        <p>${escapeHtml(NUDGE_META[key].summary)}</p>
      </div>
      <button class="pill-action ${state.nudges[key] ? 'is-on' : ''}" data-action="toggle-nudge" data-key="${escapeHtml(key)}">
        ${state.nudges[key] ? 'Ativo' : 'Desligado'}
      </button>
    </div>
    <div class="nudge-card__surface">Onde aparece: ${escapeHtml(NUDGE_META[key].surfaces)}</div>
  </article>
`

const viewHome = () => {
  const activeChallenge = state.challenges.find((challenge) => challenge.area === state.area) || state.challenges[0]
  const created = state.createdDrops[0]

  return `
    <section class="hero panel" data-section="home-hero">
      <div class="hero__copy">
        <span class="eyebrow-pill">${nudgeOn('disponibilidade') ? 'Agora no seu bairro' : 'Descoberta local'}</span>
        <h2>${escapeHtml(state.area)}</h2>
        <p>${escapeHtml(getContextCopy())}</p>
        <div class="hero__stats">
          <span>${activeChallenge.people} entrando</span>
          <span>${activeChallenge.friends} amigos por perto</span>
        </div>
        <div class="hero__actions">
          <button class="pill-action is-on" data-action="switch-tab" data-tab="explore">Explorar drops</button>
          <button class="pill-action" data-action="toggle-challenge" data-id="${escapeHtml(activeChallenge.id)}">
            ${activeChallenge.joined ? 'Ja entrou' : 'Entrar agora'}
          </button>
        </div>
        ${renderMarkers(['contexto', 'disponibilidade', 'provaSocial'])}
      </div>
      <div class="hero__stack">
        <div class="mini-poster mini-poster--sunset"></div>
        <div class="mini-poster mini-poster--editorial"></div>
        <div class="mini-poster mini-poster--aqua"></div>
      </div>
    </section>

    <section class="section-block" data-section="home-stories">
      <div class="section-head">
        <div>
          <h3>Stories memoraveis</h3>
          <p>Cards visuais curtos para puxar atencao rapido.</p>
        </div>
        ${renderMarkers(['imagem'])}
      </div>
      <div class="story-row">
        ${state.stories.map(renderStory).join('')}
      </div>
    </section>

    ${
      created
        ? `
          <section class="panel spotlight" data-section="home-spotlight">
            <div>
              <span class="eyebrow-pill">Feito por voce</span>
              <h3>${escapeHtml(created.title)}</h3>
              <p>${escapeHtml(created.caption)}</p>
            </div>
            ${renderPoster(created, { kicker: 'Seu drop autoral', compact: true })}
            ${renderMarkers(['ikea', 'imagem'])}
          </section>
        `
        : ''
    }

    <section class="section-block" data-section="home-feed">
      <div class="section-head">
        <div>
          <h3>Feed</h3>
          <p>Inspirado em rede social visual, com prioridade para a descoberta local.</p>
        </div>
      </div>
      <div class="feed-list">
        ${sortedPosts().map(renderPost).join('')}
      </div>
    </section>
  `
}

const viewExplore = () => `
  <section class="section-block" data-section="explore-context">
    <div class="section-head">
      <div>
        <h3>Troque o contexto</h3>
        <p>Mudar o bairro muda a narrativa e o ranking do que aparece.</p>
      </div>
      ${renderMarkers(['contexto'])}
    </div>
    ${renderAreaChips()}
  </section>

  <section class="section-block" data-section="explore-trending">
    <div class="section-head">
      <div>
        <h3>Em alta agora</h3>
        <p>Cards com senso de recencia para puxar decisao rapida.</p>
      </div>
      ${renderMarkers(['disponibilidade', 'provaSocial'])}
    </div>
    <div class="trend-list">
      ${state.challenges.map(renderChallenge).join('')}
    </div>
  </section>

  <section class="section-block" data-section="explore-creators">
    <div class="section-head">
      <div>
        <h3>Criadores com halo</h3>
        <p>Selos, reputacao e prova social deslocam percepcao de qualidade.</p>
      </div>
      ${renderMarkers(['halo', 'provaSocial'])}
    </div>
    <div class="creator-list">
      ${state.creators.map(renderCreator).join('')}
    </div>
  </section>

  <section class="panel" data-section="explore-privacy">
    <div class="section-head">
      <div>
        <h3>Configuracao padrao</h3>
        <p>A opcao preselecionada reduz friccao e ja conduz o comportamento.</p>
      </div>
      ${renderMarkers(['padrao'])}
    </div>
    <div class="privacy-row">
      ${PRIVACY_OPTIONS.map((option) => {
        const isActive = state.user.privacy === option.id
        const isDefault = option.id === 'close' && nudgeOn('padrao')
        return `
          <button class="privacy-option ${isActive ? 'is-active' : ''}" data-action="set-privacy" data-privacy="${escapeHtml(option.id)}">
            <strong>${escapeHtml(option.label)}</strong>
            <span>${isDefault ? 'Padrao sugerido' : 'Opcao manual'}</span>
          </button>
        `
      }).join('')}
    </div>
  </section>
`

const viewCreate = () => `
  <section class="compose-layout">
    <article class="panel" data-section="create-studio">
      <div class="section-head">
        <div>
          <h3>Studio autoral</h3>
          <p>Monte seu proprio drop para ativar o efeito IKEA.</p>
        </div>
        ${renderMarkers(['ikea'])}
      </div>

      <label class="field">
        <span>Titulo</span>
        <input data-bind="composer-title" maxlength="42" value="${escapeHtml(state.composer.title)}" placeholder="Ex.: Sunset run com cafe" />
      </label>

      <label class="field">
        <span>Legenda</span>
        <textarea data-bind="composer-caption" rows="4" maxlength="140" placeholder="Descreva a experiencia">${escapeHtml(state.composer.caption)}</textarea>
      </label>

      <div class="field">
        <span>Tom visual</span>
        <div class="chip-row">
          ${TONES.map(
            (tone) => `
              <button class="chip ${state.composer.tone === tone.id ? 'is-active' : ''}" data-action="set-tone" data-tone="${escapeHtml(tone.id)}">
                ${escapeHtml(tone.label)}
              </button>
            `,
          ).join('')}
        </div>
      </div>

      <div class="field">
        <span>Stickers</span>
        <div class="chip-row">
          ${STICKERS.map(
            (sticker) => `
              <button class="chip ${state.composer.stickers.includes(sticker) ? 'is-active' : ''}" data-action="toggle-sticker" data-sticker="${escapeHtml(sticker)}">
                ${escapeHtml(sticker)}
              </button>
            `,
          ).join('')}
        </div>
      </div>

      <button class="pill-action is-on" data-action="publish-drop">Publicar no feed</button>
    </article>

    <article class="panel" data-section="create-preview">
      <div class="section-head">
        <div>
          <h3>Preview mobile</h3>
          <p>Visual dominante para reforcar superioridade de imagem.</p>
        </div>
        ${renderMarkers(['ikea', 'imagem'])}
      </div>
      <div class="poster poster--${escapeHtml(state.composer.tone)} poster--preview">
        <div class="poster__grain"></div>
        <div class="poster__meta">Feito por voce</div>
        <h3 class="poster__title" data-preview="title">${escapeHtml(state.composer.title || 'Seu proximo drop')}</h3>
        <p class="poster__subtitle" data-preview="caption">${escapeHtml(state.composer.caption || 'Descreva a experiencia que voce quer puxar.')}</p>
        <div class="poster__tags" data-preview="stickers">
          ${state.composer.stickers.map((sticker) => `<span>${escapeHtml(sticker)}</span>`).join('')}
        </div>
      </div>
    </article>
  </section>

  <section class="section-block" data-section="create-published">
    <div class="section-head">
      <div>
        <h3>Seus drops publicados</h3>
        <p>Quanto mais autoria, mais valor percebido no objeto criado.</p>
      </div>
      ${renderMarkers(['ikea'])}
    </div>
    <div class="trend-list">
      ${state.createdDrops
        .map(
          (drop) => `
            <article class="trend-card">
              ${renderPoster(drop, { kicker: 'Publicado por voce', compact: true })}
              <div class="trend-card__body">
                <div class="trend-card__meta">
                  <strong>${escapeHtml(drop.title)}</strong>
                  <span>${escapeHtml(relativeTime(drop.createdAt))}</span>
                </div>
                <p>${escapeHtml(drop.caption)}</p>
              </div>
            </article>
          `,
        )
        .join('')}
    </div>
  </section>
`

const viewFocus = () => `
  <section class="panel progress-panel" data-section="focus-progress">
    <div class="progress-panel__top">
      <div class="progress-ring" style="--value:${state.user.progress}">
        <strong>${state.user.progress}%</strong>
        <span>setup social</span>
      </div>
      <div class="progress-copy">
        <span class="eyebrow-pill">${nudgeOn('custoAfundado') ? 'Quase la' : 'Seu progresso'}</span>
        <h3>Voce ja construiu bastante</h3>
        <p>
          ${
            nudgeOn('custoAfundado')
              ? `Abandonar agora descartaria ${state.user.progress}% do contexto, reputacao e rotina que voce ja acumulou.`
              : 'Continue refinando o perfil e a rotina local.'
          }
        </p>
        <button class="pill-action is-on" data-action="continue-progress">Continuar setup</button>
      </div>
    </div>
    ${renderMarkers(['custoAfundado'])}
  </section>

  <section class="panel" data-section="focus-visibility">
    <div class="section-head">
      <div>
        <h3>Visibilidade ativa</h3>
        <p>Quando a pessoa sente que esta sendo vista, tende a ajustar o comportamento.</p>
      </div>
      ${renderMarkers(['hawthorne'])}
    </div>
    <div class="stats-grid">
      <div class="stat-tile">
        <strong>${state.stats.observers}</strong>
        <span>${nudgeOn('hawthorne') ? 'anfitrioes observaram sua constancia' : 'anfitrioes viram sua atividade'}</span>
      </div>
      <div class="stat-tile">
        <strong>${state.stats.visitsToday}</strong>
        <span>visitas de perfil hoje</span>
      </div>
      <div class="stat-tile">
        <strong>${state.user.streak} dias</strong>
        <span>de rotina local seguida</span>
      </div>
    </div>
  </section>

  <section class="panel" data-section="focus-checklist">
    <div class="section-head">
      <div>
        <h3>Checklist de adesao</h3>
        <p>Marque os passos e amplie o valor do perfil.</p>
      </div>
    </div>
    <div class="check-list">
      ${state.checklist.map(renderChecklistItem).join('')}
    </div>
    ${renderMarkers(['custoAfundado'])}
  </section>
`

const viewNudges = () => `
  <section class="panel">
    <div class="section-head">
      <div>
        <h3>Mapa dos 9 efeitos</h3>
        <p>Cada tela mostra marcadores visuais indicando onde cada nudge entra na experiencia.</p>
      </div>
      <button class="pill-action ${state.nudgesOn ? 'is-on' : ''}" data-action="toggle-global-nudges">
        ${state.nudgesOn ? 'Nudges ligados' : 'Nudges desligados'}
      </button>
    </div>
  </section>

  <section class="nudge-grid">
    ${Object.keys(NUDGE_META).map(renderNudgeCard).join('')}
  </section>
`

const renderView = () => {
  switch (state.tab) {
    case 'explore':
      return viewExplore()
    case 'create':
      return viewCreate()
    case 'focus':
      return viewFocus()
    case 'nudges':
      return viewNudges()
    case 'home':
    default:
      return viewHome()
  }
}

const renderNav = () => {
  const items = [
    { id: 'home', icon: 'home', label: 'Inicio' },
    { id: 'explore', icon: 'travel_explore', label: 'Explorar' },
    { id: 'create', icon: 'add_box', label: 'Criar' },
    { id: 'focus', icon: 'bolt', label: 'Foco' },
    { id: 'nudges', icon: 'psychology', label: 'Nudges' },
  ]

  return `
    <nav class="bottom-nav">
      ${items
        .map(
          (item) => `
            <button class="nav-item ${state.tab === item.id ? 'is-active' : ''}" data-action="switch-tab" data-tab="${item.id}">
              <span class="material-symbols-rounded">${item.icon}</span>
              <span>${item.label}</span>
            </button>
          `,
        )
        .join('')}
    </nav>
  `
}

const render = () => {
  recalculateDerivedState()
  saveState()

  app.innerHTML = `
    <div class="mobile-stage">
      <div class="stage-layout">
        <div class="phone-shell">
          <div class="phone-screen">
            <div class="status-bar">
              <span>${clockTime()}</span>
              <span>mobile only</span>
            </div>

            <header class="top-bar">
              <div>
                <div class="eyebrow">social lab</div>
                <h1>Spotly Pulse</h1>
              </div>
              <button class="profile-dot" data-action="switch-tab" data-tab="focus">${escapeHtml(initials(state.user.name))}</button>
            </header>

            <main class="screen-content">
              ${renderView()}
            </main>

            ${renderNav()}

            ${
              flash
                ? `
                  <div class="flash-card is-visible">
                    <strong>${escapeHtml(flash.label)}</strong>
                    <span>${escapeHtml(flash.text)}</span>
                  </div>
                `
                : ''
            }
          </div>
        </div>

        ${renderGuidePanel()}
      </div>
    </div>
  `
}

const scrollToSection = (section) => {
  if (!section) {
    return
  }

  const target = document.querySelector(`[data-section="${section}"]`)
  if (!target) {
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const syncComposerPreview = () => {
  const title = document.querySelector('[data-preview="title"]')
  const caption = document.querySelector('[data-preview="caption"]')

  if (title) {
    title.textContent = state.composer.title || 'Seu proximo drop'
  }

  if (caption) {
    caption.textContent = state.composer.caption || 'Descreva a experiencia que voce quer puxar.'
  }
}

const toggleSticker = (sticker) => {
  if (state.composer.stickers.includes(sticker)) {
    state.composer.stickers = state.composer.stickers.filter((item) => item !== sticker)
    return
  }

  state.composer.stickers = [...state.composer.stickers, sticker]
}

const publishDrop = () => {
  const title = state.composer.title.trim()
  const caption = state.composer.caption.trim()

  if (!title || !caption) {
    showFlash('Studio', 'Preencha titulo e legenda antes de publicar.')
    return
  }

  const createdAt = Date.now()
  const drop = {
    id: `u${createdAt}`,
    title,
    caption,
    theme: state.composer.tone,
    stickers: [...state.composer.stickers],
    createdAt,
  }

  const feedPost = {
    id: `p${createdAt}`,
    name: state.user.name,
    handle: state.user.handle,
    area: state.area,
    verified: false,
    theme: state.composer.tone,
    title,
    caption,
    socialLine: 'Acabou de entrar no feed por autoria propria.',
    likes: 112,
    comments: 12,
    saves: 27,
    liked: false,
    saved: false,
    when: createdAt,
  }

  state.createdDrops.unshift(drop)
  state.posts.unshift(feedPost)
  state.user.streak += 1
  state.tab = 'home'
  showFlash('IKEA', 'Seu drop entrou no feed com destaque autoral.')
}

const continueProgress = () => {
  const next = state.checklist.find((item) => !item.done)

  if (next) {
    next.done = true
    state.user.streak += 1
    showFlash('Custo afundado', 'Mais uma etapa fechada. O setup ficou ainda mais valioso.')
    return
  }

  state.user.streak += 1
  showFlash('Rotina', 'Nao havia etapas pendentes. Sua sequencia foi ampliada.')
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]')
  if (!button) {
    return
  }

  const { action } = button.dataset

  if (action === 'switch-tab') {
    state.tab = button.dataset.tab || 'home'
    render()
    return
  }

  if (action === 'navigate-guide') {
    state.tab = button.dataset.tab || state.tab
    render()
    window.requestAnimationFrame(() => {
      scrollToSection(button.dataset.section)
    })
    return
  }

  if (action === 'select-area') {
    state.area = button.dataset.area || state.area
    render()
    return
  }

  if (action === 'toggle-like') {
    const post = state.posts.find((item) => item.id === button.dataset.id)
    if (!post) {
      return
    }

    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
    showFlash('Prova social', post.liked ? 'Sua curtida entrou no volume publico do drop.' : 'Curtida removida do total publico.')
    return
  }

  if (action === 'toggle-save') {
    const post = state.posts.find((item) => item.id === button.dataset.id)
    if (!post) {
      return
    }

    post.saved = !post.saved
    post.saves += post.saved ? 1 : -1
    showFlash('Memoria', post.saved ? 'Drop salvo para facilitar lembranca futura.' : 'Drop removido da sua lista salva.')
    return
  }

  if (action === 'toggle-challenge') {
    const challenge = state.challenges.find((item) => item.id === button.dataset.id)
    if (!challenge) {
      return
    }

    challenge.joined = !challenge.joined
    showFlash('Disponibilidade', challenge.joined ? 'Voce entrou enquanto o drop ainda esta quente.' : 'Voce saiu desse drop local.')
    render()
    return
  }

  if (action === 'toggle-follow') {
    const creator = state.creators.find((item) => item.id === button.dataset.id)
    if (!creator) {
      return
    }

    creator.following = !creator.following
    creator.followers += creator.following ? 1 : -1
    showFlash('Halo', creator.following ? 'Criador adicionado ao seu radar.' : 'Criador removido do seu radar.')
    render()
    return
  }

  if (action === 'set-privacy') {
    state.user.privacy = button.dataset.privacy || state.user.privacy
    showFlash('Padrao', 'Preferencia de visibilidade atualizada.')
    render()
    return
  }

  if (action === 'set-tone') {
    state.composer.tone = button.dataset.tone || state.composer.tone
    render()
    return
  }

  if (action === 'toggle-sticker') {
    toggleSticker(button.dataset.sticker || '')
    render()
    return
  }

  if (action === 'publish-drop') {
    publishDrop()
    return
  }

  if (action === 'continue-progress') {
    continueProgress()
    return
  }

  if (action === 'toggle-check') {
    const item = state.checklist.find((entry) => entry.id === button.dataset.id)
    if (!item) {
      return
    }

    item.done = !item.done
    showFlash('Checklist', item.done ? 'Etapa marcada como concluida.' : 'Etapa voltou a ficar pendente.')
    render()
    return
  }

  if (action === 'toggle-global-nudges') {
    state.nudgesOn = !state.nudgesOn
    render()
    return
  }

  if (action === 'toggle-nudge') {
    const key = button.dataset.key
    if (!key || !(key in state.nudges)) {
      return
    }

    state.nudges[key] = !state.nudges[key]
    render()
    return
  }

  if (action === 'open-story') {
    showFlash('Imagem', 'Story aberto. O destaque visual foi preservado para reforcar lembranca.')
  }
})

app.addEventListener('input', (event) => {
  const target = event.target
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return
  }

  const bind = target.dataset.bind
  if (!bind) {
    return
  }

  if (bind === 'composer-title') {
    state.composer.title = target.value
  }

  if (bind === 'composer-caption') {
    state.composer.caption = target.value
  }

  saveState()
  syncComposerPreview()
})

render()
