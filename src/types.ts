export interface PrettyHtmlOptions {
  tabWidth?: number
  useTabs?: boolean
  printWidth?: number
  usePrettier?: boolean
  singleQuote?: boolean
  wrapAttributes?: boolean
  sortAttributes?: boolean
  prettier?: {
    tabWidth?: number
    useTabs?: boolean
    printWidth?: number
    singleQuote?: boolean
  }
}

export type Format = (input: string) => string

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchInlinePrettyHtmlSnapshot(
        options?: PrettyHtmlOptions,
        inlineSnapshot?: string
      ): R
      toMatchInlinePrettyHtmlSnapshot(inlineSnapshot?: string): R
      toMatchPrettyHtmlSnapshot(options: PrettyHtmlOptions, hint?: string): R
      toMatchPrettyHtmlSnapshot(hint?: string): R
    }
  }
}
