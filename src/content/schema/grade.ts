import { z } from 'zod'

export const gradeIdSchema = z.enum(['g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12'])
export type GradeId = z.infer<typeof gradeIdSchema>

export const gradeSchema = z.object({
  id: gradeIdSchema,
  label: z.string(),
  stage: z.enum(['fundamental', 'medio']),
})
export type Grade = z.infer<typeof gradeSchema>
