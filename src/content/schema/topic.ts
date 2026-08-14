import { z } from 'zod'
import { subjectIdSchema } from './subject'
import { gradeIdSchema } from './grade'

/**
 * Slot de explicações alternativas para o botão "Não entendi" (ver
 * docs/ARCHITECTURE.md seção 6.4). Existe desde já no schema, mesmo vazio,
 * para que a Fase 2 possa preenchê-lo sem alterar a estrutura das aulas.
 */
const alternativeExplanationSchema = z.object({
  body: z.string(),
})

const alternativesSchema = z
  .object({
    simpler: alternativeExplanationSchema.optional(),
    analogy: alternativeExplanationSchema.optional(),
    practical: alternativeExplanationSchema.optional(),
    stepByStep: alternativeExplanationSchema.optional(),
    visual: alternativeExplanationSchema.optional(),
  })
  .partial()

export const lessonBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concept'),
    title: z.string(),
    body: z.string(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('howItWorks'),
    body: z.string(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('formula'),
    latex: z.string(),
    terms: z.array(z.string()).optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('example'),
    statement: z.string(),
    steps: z.array(z.string()),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('commonMistake'),
    wrong: z.string(),
    why: z.string(),
    right: z.string(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('visualization'),
    vizId: z.string(),
    config: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    type: z.literal('checkpoint'),
    question: z.string(),
  }),
])
export type LessonBlock = z.infer<typeof lessonBlockSchema>

export const misconceptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  whyItHappens: z.string(),
  correction: z.string(),
})
export type Misconception = z.infer<typeof misconceptionSchema>

export const challengeOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  correct: z.boolean(),
  misconceptionId: z.string().optional(),
})
export type ChallengeOption = z.infer<typeof challengeOptionSchema>

export const challengeSchema = z.object({
  question: z.string(),
  options: z.array(challengeOptionSchema).min(2),
})
export type Challenge = z.infer<typeof challengeSchema>

export const topicSchema = z.object({
  id: z.string(),
  subjectId: subjectIdSchema,
  gradeIds: z.array(gradeIdSchema).min(1),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  difficulty: z.number().int().min(1).max(5),
  estimatedMinutes: z.number().int().positive(),
  prerequisites: z.array(z.string()).default([]),
  lesson: z.object({
    blocks: z.array(lessonBlockSchema).min(1),
  }),
  challenge: challengeSchema,
  misconceptions: z.array(misconceptionSchema).default([]),
})
export type Topic = z.infer<typeof topicSchema>
