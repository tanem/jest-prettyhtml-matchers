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
