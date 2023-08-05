// @ts-ignore: Using `jest-prettyhtml-matchers` as the module name to reduce the
// chance of collisions with other modules when using Jest's `moduleNameMapper`
// option.
import { createPrettyHtmlMatchers } from 'jest-prettyhtml-matchers'
import { svg } from './svg'

describe('default global options', () => {
  beforeEach(() => {
    expect.extend(createPrettyHtmlMatchers())
  })

  test('with default local options', () => {
    expect(svg).toMatchPrettyHtmlSnapshot()
  })

  test('with default local options and hint', () => {
    expect(svg).toMatchPrettyHtmlSnapshot('hint')
  })

  test('with custom local options', () => {
    expect(svg).toMatchPrettyHtmlSnapshot({
      singleQuote: true,
    })
  })

  test('with custom local options and hint', () => {
    expect(svg).toMatchPrettyHtmlSnapshot(
      {
        singleQuote: true,
      },
      'hint',
    )
  })
})

describe('custom global options', () => {
  beforeEach(() => {
    expect.extend(createPrettyHtmlMatchers({ singleQuote: true }))
  })

  test('with default local options', () => {
    expect(svg).toMatchPrettyHtmlSnapshot()
  })

  test('with default local options and hint', () => {
    expect(svg).toMatchPrettyHtmlSnapshot('hint')
  })

  test('with custom local options', () => {
    expect(svg).toMatchPrettyHtmlSnapshot({
      singleQuote: false,
      sortAttributes: true,
    })
  })

  test('with custom local options and hint', () => {
    expect(svg).toMatchPrettyHtmlSnapshot(
      {
        singleQuote: false,
        sortAttributes: true,
      },
      'hint',
    )
  })
})
