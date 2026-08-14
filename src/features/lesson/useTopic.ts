import { useEffect, useState } from 'react'
import { contentRepository } from '@/content/contentRepository'
import type { Topic } from '@/content/schema/topic'

type TopicState = { status: 'loading' } | { status: 'ready'; topic: Topic } | { status: 'missing' }

/** Carrega o assunto sob demanda via contentRepository. */
export function useTopic(topicId: string | undefined): TopicState {
  const [state, setState] = useState<TopicState>({ status: 'loading' })

  useEffect(() => {
    let active = true
    setState({ status: 'loading' })

    if (!topicId) {
      setState({ status: 'missing' })
      return
    }

    contentRepository
      .getTopic(topicId)
      .then((topic) => {
        if (!active) return
        setState(topic ? { status: 'ready', topic } : { status: 'missing' })
      })
      .catch(() => {
        if (active) setState({ status: 'missing' })
      })

    return () => {
      active = false
    }
  }, [topicId])

  return state
}
