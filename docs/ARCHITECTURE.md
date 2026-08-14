# STUDY GAME — Arquitetura Técnica

> Status: **aprovado** — Vite SPA, fatia vertical inicial em Física/Força.
> Este documento é a fonte de verdade da arquitetura. Mudanças estruturais devem ser refletidas aqui.

## 1. Produto

STUDY GAME é uma plataforma educacional gamificada para Matemática, Física e Química,
do 6º ano do Ensino Fundamental ao 3º ano do Ensino Médio.

Fluxo pedagógico: **Aprenda → Visualize → Jogue → Domine**. O aluno entende o conteúdo
antes de ser desafiado; os jogos aplicam o conceito aprendido, não substituem a explicação
por um quiz com pontos.

Princípios não negociáveis (ver seção 15 para como cada um vira arquitetura):
1. Entender antes de jogar.
2. Jogos ensinam enquanto o aluno joga — mesma mecânica que a explicação usou.
3. Nunca virar "pergunta + XP" disfarçada de jogo.
4. Toda visualização tem função pedagógica declarada.
5–6. Erro nunca humilha; sempre explica e permite nova tentativa.
7. "Não entendi" com explicações alternativas.
8. Conteúdo organizado por série.
9. Novo assunto/jogo não exige reescrever o app.
10. Sistema preparado para crescer.

## 2. Decisão de stack

**Vite + React 19 + TypeScript (SPA)**, não Next.js.

Motivo: o produto é majoritariamente interativo (canvas, simulações físicas, drag & drop),
onde SSR não agrega e adiciona complexidade (Server/Client Components). Simplicidade e
performance mobile foram priorizadas sobre SEO. Backend/auth ficam a cargo do Supabase
quando entrarem (Fase 8), sem precisar de servidor próprio.

Reversibilidade: conteúdo vive em módulos de dados tipados acessados via `contentRepository`
— uma migração futura para Next.js (se SEO virar prioridade) reescreveria apenas a camada
de rotas, não aulas/jogos/simulações.

| Camada | Escolha | Alternativa descartada |
|---|---|---|
| Build | Vite 6 | CRA (morto) |
| UI | React 19 + TypeScript | Svelte (ecossistema menor) |
| Rotas | React Router v7 | TanStack Router (overkill agora) |
| Estilo | Tailwind CSS v4 + CSS variables | styled-components (custo em runtime) |
| Animação | Motion (Framer Motion) | — |
| Estado | Zustand + persist | Redux Toolkit (excessivo) |
| Schema/validação | Zod | — |
| Fórmulas | KaTeX (lazy) | MathJax (mais lento) |
| Física 2D | Matter.js (lazy, só onde necessário) | Phaser/PixiJS (400KB+, engine completa não necessária) |
| Backend (Fase 8) | Supabase | servidor próprio |
| Testes | Vitest + Testing Library | — |

## 3. Arquitetura em camadas

O app não conhece nenhum assunto nem nenhum jogo específico — apenas contratos.
Conteúdos, jogos e visualizações se auto-registram.

```
APP SHELL        rotas, providers, layout, transições
FEATURES         catálogo · aula · visualização · jogo · desafio · resultado · progresso
REGISTRIES       content registry · game registry · viz registry · progress engine
BASE             design system · simulation cores · game primitives · lib
```

Regra de dependência (verificável por lint de import):
`design-system` e `simulations` não dependem de nada do produto. `games` depende de
`_platform` + `simulations` + `design-system`. `features` depende de tudo abaixo.
Nada abaixo de `features` importa de `features`.

**Decisão-chave: simulação e jogo compartilham o mesmo núcleo puro.**
Ex.: `simulations/force/` não tem React nem canvas — só funções e estado. A visualização
renderiza esse núcleo em modo exploratório; o jogo renderiza o mesmo núcleo com objetivos e
pontuação. Isso é o que garante o princípio 2/3: o aluno joga com o modelo mental que estudou.

## 4. Estrutura de pastas

```
study-game/
├── public/{mascot,fonts}/
├── src/
│   ├── app/                 App.tsx, router.tsx, providers/, layouts/
│   ├── design-system/       tokens/, primitives/, patterns/
│   ├── features/            home, catalog, lesson, visualization, game, challenge, progress
│   ├── content/              schema/, registry.ts, math/g8/…, physics/g9/…, chemistry/g9/…
│   ├── games/                _platform/, force-push/, equation-path/, registry.ts
│   ├── simulations/          force/, kinematics/, atom/  (núcleos puros, sem React)
│   ├── visualizations/       force-lab/, registry.ts
│   ├── stores/                zustand: progress, session, settings
│   ├── lib/                   storage, analytics, math, a11y
│   └── types/
├── docs/                     ARCHITECTURE.md, AUTHORING-CONTENT.md, AUTHORING-GAMES.md
└── scripts/validate-content.ts
```

## 5. Modelo de conteúdo

Módulos TypeScript validados por Zod em `src/content/`, acessados sempre via
`contentRepository.getTopic(id)` — nunca importados diretamente pelas features. Isso permite
trocar a origem do conteúdo (ex.: CMS/Supabase) sem tocar em nenhuma feature.

```ts
Subject { id: 'math'|'physics'|'chemistry', name, theme, icon }
Grade   { id: 'g6'..'g12', label, stage }
Topic {
  id, subjectId, gradeIds[], title, slug, summary,
  difficulty: 1..5, prerequisites: TopicId[], estimatedMinutes,
  lesson: Lesson, visualization?: VisualizationRef, game?: GameRef,
  challenge: Challenge, misconceptions: Misconception[]
}
```

Aula como **blocos tipados** (não HTML solto):

```ts
type LessonBlock =
  | { type:'concept', title, body }
  | { type:'howItWorks', body }
  | { type:'formula', latex, terms[] }
  | { type:'example', statement, steps[] }
  | { type:'commonMistake', wrong, why, right }
  | { type:'visualization', vizId, config }
  | { type:'checkpoint', question }
```

Cada bloco tem um slot `alternatives?: Partial<Record<'simpler'|'analogy'|'practical'|
'stepByStep'|'visual', AlternativeExplanation>>` — existe desde o dia 1 (mesmo vazio) para
que o botão "Não entendi" seja implementável sem alterar a estrutura das aulas.

Erros têm nome próprio: `Misconception { id, label, whyItHappens, correction,
remediationBlockId }`. Alternativas erradas do desafio apontam para um `misconceptionId` —
o feedback de erro sempre explica o porquê e permite nova tentativa (nunca "❌ Errado").

## 6. Sistema de jogos

Contrato único, plugin-based — o app nunca importa um jogo diretamente:

```ts
interface GameModule<TConfig> {
  id: string
  kind: 'puzzle'|'action'|'simulation'|'construction'|'speedrun'
  engine: 'dom'|'canvas2d'|'matter'
  configSchema: ZodSchema<TConfig>
  load: () => Promise<React.ComponentType<GameProps<TConfig>>>
}
interface GameProps<TConfig> {
  config: TConfig
  onEvent: (e: GameEvent) => void
  onComplete: (r: GameResult) => void
  onMistake: (m: MistakeRecord) => void
  requestHint: () => void
}
interface GameResult { objectivesMet: string[], score, maxScore, mistakes, durationMs, hintsUsed }
```

`GameShell` cuida do que é repetitivo: instruções, tutorial, HUD, pausa, retry sem
penalidade, dicas, palco responsivo, input mouse/toque, tela de resultado,
`prefers-reduced-motion`. O módulo de jogo implementa só a mecânica.

Primitivas em `games/_platform/`: `useGameLoop` (rAF com timestep fixo), `useStage`
(resolução lógica + escala), `usePointerInput` (mouse/toque unificado), `useGameState`
(estado fora do React, para não re-renderizar a 60fps).

Motor por jogo, carregado sob demanda: nível 1 DOM/SVG+Motion (0KB extra), nível 2 Canvas 2D
próprio (0KB extra), nível 3 Matter.js (~90KB, só no jogo que precisa, ex. Força).

## 7. Aulas e "Não entendi"

Rota de trilha: `/materia/:subject/:grade/:topic/:stage` com
`stage: learn|visualize|play|challenge|result`, controlada por `TopicJourneyProvider`
(sabe quais etapas o assunto realmente tem). `LessonRenderer` percorre `lesson.blocks` e
delega a um componente por tipo — novo tipo de bloco = novo componente no mapa.

"Não entendi" é um painel por bloco com cadeia de fallback: variação autorada → variação
genérica → (futuro) geração por IA. Cada clique emite `block_confused` (dado pedagógico:
mostra onde a explicação falha).

## 8. Visualizações

```ts
interface VisualizationModule<TParams> {
  id, learningGoal: string   // obrigatório
  params: ParamSpec[]        // sliders/toggles manipuláveis
  guidedSteps?: GuidedStep[]
  load: () => Promise<Component>
}
```

`learningGoal` obrigatório no schema, parâmetros sempre manipuláveis (o aluno testa
hipóteses, não assiste), e roda sobre o mesmo núcleo de simulação que o jogo seguinte.

## 9. Progresso (futuro, Fase 8)

Baseado em eventos append-only, não em contadores:

```ts
type LearningEvent =
  | { type:'lesson_completed', topicId, at }
  | { type:'block_confused', topicId, blockId, variantUsed, at }
  | { type:'viz_interacted', topicId, paramChanges, at }
  | { type:'game_completed', topicId, gameId, result, at }
  | { type:'challenge_answered', topicId, questionId, correct, misconceptionId?, at }
```

XP, nível, streak, conquistas e domínio são **derivados por funções puras** a partir dos
eventos — mudar a fórmula de XP não exige migração de dados.

Persistência via `ProgressRepository`: `LocalProgressRepository` (localStorage, sem login)
no MVP; `SupabaseProgressRepository` na Fase 8, sem mudar features.

## 10. Design system

Tokens principais (roxo como marca, fundo escuro em camadas, uma cor de accent por matéria):

```css
:root {
  --brand-500:#8B5CF6; --brand-600:#7C3AED; --brand-700:#6D28D9;
  --bg-base:#0B0714; --bg-surface:#150F24; --bg-elevated:#1E1633;
  --border-subtle:rgba(255,255,255,.08);
  --text-primary:#F8FAFC; --text-muted:#A79FC4;
  --math-500:#3B82F6; --physics-500:#F97316; --chem-500:#22C55E;
  --gold-500:#FBBF24; --success:#34D399; --attention:#FB923C;
  --radius-sm:12px; --radius-md:16px; --radius-lg:24px; --radius-pill:999px;
  --shadow-soft:0 8px 24px rgba(0,0,0,.35);
  --dur-fast:120ms; --dur-base:220ms; --dur-slow:420ms;
  --ease-out:cubic-bezier(.16,1,.3,1);
}
[data-subject="math"]      { --accent: var(--math-500); }
[data-subject="physics"]   { --accent: var(--physics-500); }
[data-subject="chemistry"] { --accent: var(--chem-500); }
```

Trocar `data-subject` no elemento raiz re-tematiza o app inteiro sem duplicar componentes.

Direção visual: fundo escuro em camadas (não preto chapado), glow colorido em vez de borda,
gradientes sutis só em superfícies-chave, tipografia Sora/Plus Jakarta Sans + Inter, ícones
Lucide (geométricos, não infantis), mascote cérebro com presença contextual (não permanente).

## 11. MVP de conteúdo

Matemática: Equação do 1º grau, Porcentagem.
Física: Força, Velocidade.
Química: Átomos, Ligações químicas.

Sem currículo completo nesta etapa — conteúdo suficiente para validar a arquitetura.

## 12. Riscos principais

1. Cada jogo é um mini-produto — custo alto. Mitigação: fatia vertical primeiro, GameShell
   absorve o repetitivo.
2. Superengenharia de registries antes de existir jogo real. Mitigação: construir o primeiro
   jogo, depois extrair o contrato.
3. Performance em Android intermediário. Mitigação: orçamento <150KB JS inicial, tudo pesado
   é lazy, testar em device real.
4. Drag & drop em toque. Mitigação: Pointer Events unificados, alvos ≥44px.
5. Tom punitivo no erro. Mitigação: todo erro liga a um `misconceptionId` com correção e
   nova tentativa.

## 13. Plano de fases

| Fase | Entrega |
|---|---|
| 0 | Vite+TS+Tailwind v4+tokens+ESLint/Prettier+primitivos do design system |
| 1 | Shell de navegação + catálogo + schema Zod + `contentRepository` + 1 assunto stub |
| 2 | Motor de aulas: blocos, KaTeX, erros comuns, painel "Não entendi" |
| 3 | Núcleo `simulations/force` + `VizFrame` + Laboratório de Força |
| 4 | Plataforma de jogos (GameShell, `_platform`, registry) + jogo de Força completo |
| 5 | Desafio final + feedback por equívoco + resultado + progresso local |
| 6 | Replicar para os 5 assuntos restantes do MVP |
| 7 | Polimento: transições, mascote, QA mobile, acessibilidade, performance |
| 8 | Supabase, contas, sync, mapa de estudos, conquistas, "Não entendi" com IA |

**Fatia vertical escolhida para validar a arquitetura: Física → 9º ano → Força**
(caso mais exigente: simulação física real, Matter.js, canvas, integração viz↔jogo).

Fases 0–5 entregam essa fatia ponta a ponta antes de qualquer replicação.
