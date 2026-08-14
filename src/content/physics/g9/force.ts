import { topicSchema, type Topic } from '@/content/schema/topic'

const force: Topic = {
  id: 'physics-g9-force',
  subjectId: 'physics',
  gradeIds: ['g9'],
  title: 'Força',
  slug: 'forca',
  summary: 'O que é força, como ela age sobre os objetos e como muda o movimento.',
  difficulty: 2,
  estimatedMinutes: 15,
  prerequisites: [],
  lesson: {
    blocks: [
      {
        type: 'concept',
        title: 'O que é força?',
        body: 'Força é toda ação capaz de alterar o estado de movimento de um objeto ou de deformá-lo. Ela sempre surge de uma interação entre dois corpos.',
      },
      {
        type: 'formula',
        latex: 'F = m \\cdot a',
        terms: ['F: força resultante (N)', 'm: massa (kg)', 'a: aceleração (m/s²)'],
      },
      {
        type: 'commonMistake',
        wrong: 'Força é o que um objeto "tem" para continuar se movendo.',
        why: 'Isso confunde força com inércia. Um objeto em movimento continua se movendo sem força nenhuma, a menos que outra força atue sobre ele.',
        right: 'Força é o que muda o movimento (acelera, desacelera ou muda a direção) — não o que o mantém.',
      },
    ],
  },
  challenge: {
    question:
      'Um carrinho de brinquedo está se movendo em linha reta sobre uma mesa sem atrito. O que é necessário para que ele continue se movendo na mesma velocidade?',
    options: [
      {
        id: 'a',
        text: 'Uma força constante empurrando o carrinho.',
        correct: false,
        misconceptionId: 'force-sustains-motion',
      },
      { id: 'b', text: 'Nenhuma força — ele continua por inércia.', correct: true },
      {
        id: 'c',
        text: 'Uma força cada vez maior.',
        correct: false,
        misconceptionId: 'force-sustains-motion',
      },
    ],
  },
  misconceptions: [
    {
      id: 'force-sustains-motion',
      label: 'Achar que é preciso força para manter o movimento',
      whyItHappens:
        'No dia a dia, o atrito faz os objetos pararem, então parece que "falta força" quando eles desaceleram.',
      correction:
        'Sem atrito ou resistência, um objeto em movimento continua se movendo sem nenhuma força atuando (1ª Lei de Newton).',
    },
  ],
}

export default topicSchema.parse(force)
