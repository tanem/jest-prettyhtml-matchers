import { toMatchSnapshot } from 'jest-snapshot'
import { createFormatter } from './create-formatter'
import type { Format, PrettyHtmlOptions } from './types'

export const createToMatchPrettyHtmlSnapshot = (format: Format) =>
  function toMatchPrettyHtmlSnapshot(
    this: any,
    received: string,
    options?: PrettyHtmlOptions | string,
    hint?: string
  ) {
    if (typeof options === 'object') {
      format = createFormatter(options)
    } else {
      hint = options
    }

    if (hint) {
      // @ts-ignore: Broken since type def changes in this PR
      // https://github.com/facebook/jest/pull/12376.
      return toMatchSnapshot.call(this, format(received), hint)
    }

    return toMatchSnapshot.call(this, format(received))
  }
