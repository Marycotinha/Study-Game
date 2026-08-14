export const journeyStages = [
  { id: 'learn', label: 'Aprender' },
  { id: 'visualize', label: 'Visualizar' },
  { id: 'play', label: 'Jogar' },
  { id: 'challenge', label: 'Desafio' },
] as const

export type JourneyStage = (typeof journeyStages)[number]['id']
