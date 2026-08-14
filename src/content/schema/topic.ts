import { z } from 'zod'
import { subjectIdSchema } from './subject'
import { gradeIdSchema } from './grade'

/**
 * Explicações alternativas do botão "Não entendi" (docs/ARCHITECTURE.md 6.4).
 * `diagram` guarda uma figura em texto (ASCII) — é conteúdo autorado, não
 * lógica de componente, e permite uma variação "visual" antes do sistema de
 * visualizações existir (Fase 3).
 */
export const alternativeExplanationSchema = z.object({
  body: z.string(),
  steps: z.array(z.string()).optional(),
  diagram: z.string().optional(),
})
export type AlternativeExplanation = z.infer<typeof alternativeExplanationSchema>

export const alternativeKindSchema = z.enum([
  'simpler',
  'analogy',
  'practical',
  'stepByStep',
  'visual',
])
export type AlternativeKind = z.infer<typeof alternativeKindSchema>

const alternativesSchema = z.object({
  simpler: alternativeExplanationSchema.optional(),
  analogy: alternativeExplanationSchema.optional(),
  practical: alternativeExplanationSchema.optional(),
  stepByStep: alternativeExplanationSchema.optional(),
  visual: alternativeExplanationSchema.optional(),
})

/** Símbolo de uma fórmula, para que ela nunca apareça sem significado. */
export const formulaTermSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  unit: z.string().optional(),
})
export type FormulaTerm = z.infer<typeof formulaTermSchema>

export const exampleStepSchema = z.object({
  title: z.string(),
  body: z.string(),
  latex: z.string().optional(),
})
export type ExampleStep = z.infer<typeof exampleStepSchema>

export const checkpointOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  correct: z.boolean(),
  /** Explica o raciocínio — nunca apenas "errado". Tom encorajador. */
  feedback: z.string(),
  misconceptionId: z.string().optional(),
})
export type CheckpointOption = z.infer<typeof checkpointOptionSchema>

export const lessonBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concept'),
    id: z.string(),
    title: z.string(),
    body: z.string(),
    keyPoints: z.array(z.string()).optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('howItWorks'),
    id: z.string(),
    title: z.string(),
    body: z.string(),
    steps: z.array(z.string()).optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('formula'),
    id: z.string(),
    title: z.string(),
    latex: z.string(),
    terms: z.array(formulaTermSchema).min(1),
    whenToUse: z.string(),
    quickExample: z
      .object({
        latex: z.string(),
        caption: z.string(),
      })
      .optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('example'),
    id: z.string(),
    title: z.string(),
    statement: z.string(),
    given: z.array(z.string()).optional(),
    steps: z.array(exampleStepSchema).min(1),
    answer: z.string(),
    answerLatex: z.string().optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('commonMistake'),
    id: z.string(),
    title: z.string(),
    wrong: z.string(),
    why: z.string(),
    right: z.string(),
    misconceptionId: z.string().optional(),
    alternatives: alternativesSchema.optional(),
  }),
  z.object({
    type: z.literal('visualization'),
    id: z.string(),
    vizId: z.string(),
    config: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({
    type: z.literal('checkpoint'),
    id: z.string(),
    question: z.string(),
    options: z.array(checkpointOptionSchema).min(2),
    successFeedback: z.string(),
  }),
])
export type LessonBlock = z.infer<typeof lessonBlockSchema>
export type LessonBlockType = LessonBlock['type']

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
    /** Fala do mascote na abertura da aula. */
    intro: z.string(),
    blocks: z.array(lessonBlockSchema).min(1),
    /** Fala do mascote ao concluir a aula. */
    outro: z.string(),
  }),
  challenge: challengeSchema,
  misconceptions: z.array(misconceptionSchema).default([]),
})
export type Topic = z.infer<typeof topicSchema>
