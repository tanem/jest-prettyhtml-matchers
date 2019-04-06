import { toMatchSnapshot } from 'jest-snapshot'
import { createFormatter } from './create-formatter'
import { Format, PrettyHtmlOptions } from './types'

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

    return toMatchSnapshot.call(this, format(received), hint)
  }
