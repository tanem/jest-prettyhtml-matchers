import { createFormatter } from './create-formatter'
import { createToMatchInlinePrettyHtmlSnapshot } from './create-to-match-inline-prettyhtml-snapshot'
import { createToMatchPrettyHtmlSnapshot } from './create-to-match-prettyhtml-snapshot'
import type { PrettyHtmlOptions } from './types'

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchInlinePrettyHtmlSnapshot(inlineSnapshot?: string): R
      toMatchInlinePrettyHtmlSnapshot(
        options?: PrettyHtmlOptions,
        inlineSnapshot?: string
      ): R
      toMatchPrettyHtmlSnapshot(hint?: string): R
      toMatchPrettyHtmlSnapshot(options: PrettyHtmlOptions, hint?: string): R
    }
  }
}

export const createPrettyHtmlMatchers = (options: PrettyHtmlOptions = {}) => {
  const format = createFormatter(options)
  const toMatchPrettyHtmlSnapshot = createToMatchPrettyHtmlSnapshot(format)
  const toMatchInlinePrettyHtmlSnapshot = createToMatchInlinePrettyHtmlSnapshot(
    format
  )
  return {
    toMatchPrettyHtmlSnapshot,
    toMatchInlinePrettyHtmlSnapshot,
  }
}
