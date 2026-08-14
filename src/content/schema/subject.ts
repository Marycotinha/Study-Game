import { z } from 'zod'

export const subjectIdSchema = z.enum(['math', 'physics', 'chemistry'])
export type SubjectId = z.infer<typeof subjectIdSchema>

export const subjectSchema = z.object({
  id: subjectIdSchema,
  name: z.string(),
  tagline: z.string(),
})
export type Subject = z.infer<typeof subjectSchema>
