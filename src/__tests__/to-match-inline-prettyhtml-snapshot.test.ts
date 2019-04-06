import { createPrettyHtmlMatchers } from '..'
import { svg } from './svg'

describe('default global options', () => {
  beforeEach(() => {
    expect.extend(createPrettyHtmlMatchers())
  })

  test('with default local options', () => {
    expect(svg).toMatchInlinePrettyHtmlSnapshot(`
"<svg
  height='64'
  viewBox='0 0 64 64'
  width='64'
  xmlns='http://www.w3.org/2000/svg'
>
  <defs>
    <mask
      height='100'
      id='MaskTest'
      width='100'
      x='0'
      y='0'
    >
      <rect
        height='32'
        style='stroke:none; fill:white'
        width='64'
        x='0'
        y='0'
      ></rect>
    </mask>
  </defs>
  <rect
    fill='plum'
    height='64'
    stroke='none'
    width='64'
    x='1'
    y='1'
  ></rect>
  <rect
    fill='gray'
    height='64'
    mask='url(#MaskTest)'
    stroke='none'
    width='64'
    x='1'
    y='1'
  ></rect>
</svg>
"
`)
  })

  test('with custom local options', () => {
    expect(svg).toMatchInlinePrettyHtmlSnapshot(
      { singleQuote: true },
      `
"<svg
  xmlns=\\"http://www.w3.org/2000/svg\\"
  width=\\"64\\"
  height=\\"64\\"
  viewBox=\\"0 0 64 64\\"
>
  <defs>
    <mask id=\\"MaskTest\\" x=\\"0\\" y=\\"0\\" width=\\"100\\" height=\\"100\\">
      <rect x=\\"0\\" y=\\"0\\" width=\\"64\\" height=\\"32\\" style=\\"stroke:none; fill:white\\"></rect>
    </mask>
  </defs>
  <rect x=\\"1\\" y=\\"1\\" width=\\"64\\" height=\\"64\\" stroke=\\"none\\" fill=\\"plum\\"></rect>
  <rect
    x=\\"1\\"
    y=\\"1\\"
    width=\\"64\\"
    height=\\"64\\"
    stroke=\\"none\\"
    fill=\\"gray\\"
    mask=\\"url(#MaskTest)\\"
  ></rect>
</svg>
"
`
    )
  })
})

describe('custom global options', () => {
  beforeEach(() => {
    expect.extend(createPrettyHtmlMatchers({ singleQuote: true }))
  })

  test('with default local options', () => {
    expect(svg).toMatchInlinePrettyHtmlSnapshot(`
"<svg
  xmlns=\\"http://www.w3.org/2000/svg\\"
  width=\\"64\\"
  height=\\"64\\"
  viewBox=\\"0 0 64 64\\"
>
  <defs>
    <mask id=\\"MaskTest\\" x=\\"0\\" y=\\"0\\" width=\\"100\\" height=\\"100\\">
      <rect x=\\"0\\" y=\\"0\\" width=\\"64\\" height=\\"32\\" style=\\"stroke:none; fill:white\\"></rect>
    </mask>
  </defs>
  <rect x=\\"1\\" y=\\"1\\" width=\\"64\\" height=\\"64\\" stroke=\\"none\\" fill=\\"plum\\"></rect>
  <rect
    x=\\"1\\"
    y=\\"1\\"
    width=\\"64\\"
    height=\\"64\\"
    stroke=\\"none\\"
    fill=\\"gray\\"
    mask=\\"url(#MaskTest)\\"
  ></rect>
</svg>
"
`)
  })

  test('custom local options', () => {
    expect(svg).toMatchInlinePrettyHtmlSnapshot(
      { singleQuote: false, sortAttributes: true },
      `
"<svg
  xmlns='http://www.w3.org/2000/svg'
  width='64'
  height='64'
  viewBox='0 0 64 64'
>
  <defs>
    <mask id='MaskTest' x='0' y='0' width='100' height='100'>
      <rect x='0' y='0' width='64' height='32' style='stroke:none; fill:white'></rect>
    </mask>
  </defs>
  <rect x='1' y='1' width='64' height='64' stroke='none' fill='plum'></rect>
  <rect
    x='1'
    y='1'
    width='64'
    height='64'
    stroke='none'
    fill='gray'
    mask='url(#MaskTest)'
  ></rect>
</svg>
"
`
    )
  })
})
