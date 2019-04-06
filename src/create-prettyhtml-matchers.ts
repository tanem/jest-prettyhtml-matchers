import { createFormatter } from './create-formatter'
import { createToMatchInlinePrettyHtmlSnapshot } from './create-to-match-inline-prettyhtml-snapshot'
import { createToMatchPrettyHtmlSnapshot } from './create-to-match-prettyhtml-snapshot'

export const createPrettyHtmlMatchers = (options = {}) => {
  const format = createFormatter(options)
  const toMatchPrettyHtmlSnapshot = createToMatchPrettyHtmlSnapshot(format)
  const toMatchInlinePrettyHtmlSnapshot = createToMatchInlinePrettyHtmlSnapshot(
    format
  )
  return {
    toMatchPrettyHtmlSnapshot,
    toMatchInlinePrettyHtmlSnapshot
  }
}
