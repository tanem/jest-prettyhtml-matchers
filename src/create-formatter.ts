import prettyhtml from '@starptech/prettyhtml'
import type { Format, PrettyHtmlOptions } from './types'

export const createFormatter =
  (options: PrettyHtmlOptions): Format =>
  (input) =>
    prettyhtml(input, options).contents
