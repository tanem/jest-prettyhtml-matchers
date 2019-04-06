import { toMatchInlineSnapshot } from 'jest-snapshot'
import { createFormatter } from './create-formatter'
import { Format, PrettyHtmlOptions } from './types'

export const createToMatchInlinePrettyHtmlSnapshot = (format: Format) =>
  function toMatchInlinePrettyHtmlSnapshot(
    this: any,
    received: string,
    options?: PrettyHtmlOptions | string,
    inlineSnapshot?: string
  ) {
    if (typeof options === 'object') {
      format = createFormatter(options)
    } else {
      inlineSnapshot = options
    }

    const error = new Error()
    const newStack = (error.stack as string)
      .split(/\n/)
      .filter((_, index) => index !== 1)
      .join('\n')
    error.stack = newStack

    const newContext = { ...this, error }

    return toMatchInlineSnapshot.call(
      newContext,
      format(received),
      inlineSnapshot
    )
  }
