import { motion, useTransform } from 'framer-motion'
import { BuilderFigure } from './BuilderFigure'
import { useStoryMotion } from './useStoryMotion'
import type { Audience } from '../../data/demo'

export function WorriedScene({ mode }: { mode: Audience }) {
  const { ref, progress, active, reduced } = useStoryMotion()
  const y = useTransform(progress, [0, 1], [0, 30])
  const opacity = useTransform(progress, [.8, 1], [1, .7])
  const questions = mode === 'talent' ? ['No experience?', 'Where do I fit?', 'Too many roles', 'How do I stand out?', 'My CV isn’t enough', 'No replies', 'Which startup?', 'What role fits me?'] : ['Who’s the right fit?', 'Another pile of CVs', 'Skills or keywords?', 'How do they build?', 'Too little signal', 'Where to start?', 'Ready for our stage?', 'More than a résumé?']
  return <figure className="worried-scene" ref={ref}><div className="question-field">{questions.map((question, i) => <motion.span className={`problem-question question-${i}`} key={question} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1, y: active ? [0, -4, 0] : 0 }} transition={{ opacity: { duration: .5, delay: reduced ? 0 : i * .08 }, y: { duration: 6 + i * .4, repeat: Infinity, ease: 'easeInOut' } }}>{question}</motion.span>)}</div><motion.div className="worried-builder" style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }}><BuilderFigure mood="worried" /></motion.div><figcaption>BIG AMBITION. AN UNCLEAR STARTING POINT.</figcaption><span className="continuity-thread" aria-hidden="true" /></figure>
}
