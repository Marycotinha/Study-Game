import { gradeSchema, type Grade } from './schema/grade'

const rawGrades: Grade[] = [
  { id: 'g6', label: '6º ano', stage: 'fundamental' },
  { id: 'g7', label: '7º ano', stage: 'fundamental' },
  { id: 'g8', label: '8º ano', stage: 'fundamental' },
  { id: 'g9', label: '9º ano', stage: 'fundamental' },
  { id: 'g10', label: '1º ano EM', stage: 'medio' },
  { id: 'g11', label: '2º ano EM', stage: 'medio' },
  { id: 'g12', label: '3º ano EM', stage: 'medio' },
]

export const grades = rawGrades.map((g) => gradeSchema.parse(g))
