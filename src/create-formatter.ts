import prettyhtml from '@starptech/prettyhtml'
import { Format, PrettyHtmlOptions } from './types'

export const createFormatter = (options: PrettyHtmlOptions): Format => (
  input
) => prettyhtml(input, options).contents
