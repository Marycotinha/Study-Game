import { subjectSchema, type Subject } from './schema/subject'

const rawSubjects: Subject[] = [
  { id: 'math', name: 'Matemática', tagline: 'Números, equações e padrões.' },
  { id: 'physics', name: 'Física', tagline: 'Como o mundo se move.' },
  { id: 'chemistry', name: 'Química', tagline: 'A matéria e suas transformações.' },
]

export const subjects = rawSubjects.map((s) => subjectSchema.parse(s))
