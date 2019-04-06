# jest-prettyhtml-matchers

[![npm version](https://img.shields.io/npm/v/jest-pretttyhtml-matchers.svg?style=flat-square)](https://www.npmjs.com/package/jest-pretttyhtml-matchers)
[![build status](https://img.shields.io/travis/tanem/jest-pretttyhtml-matchers/master.svg?style=flat-square)](https://travis-ci.org/tanem/jest-pretttyhtml-matchers)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/jest-pretttyhtml-matchers.svg?style=flat-square)](https://codecov.io/gh/tanem/jest-pretttyhtml-matchers)
[![npm downloads](https://img.shields.io/npm/dm/jest-pretttyhtml-matchers.svg?style=flat-square)](https://www.npmjs.com/package/jest-pretttyhtml-matchers)

> Custom Jest snapshot matchers that use [prettyhtml](https://github.com/Prettyhtml/prettyhtml) to format strings.

## Basic Usage

```js
import { createPrettyHtmlMatchers } from 'jest-prettyhtml-matchers'

// Add the custom matchers to Jest.
expect.extend(createPrettyHtmlMatchers())

// Use the matchers in your tests.
expect(string).toMatchPrettyHtmlSnapshot()
expect(string).toMatchInlinePrettyHtmlSnapshot()
```

## API

### `createPrettyHtmlMatchers(options?: PrettyHtmlOptions)`

Generates the custom matchers so that they can be [added](https://jestjs.io/docs/en/expect#expectextendmatchers) to Jest.

If `options` is not provided, [prettyhtml's default options](https://github.com/Prettyhtml/prettyhtml#options) will be used when formatting strings.

If `options` is provided, it will be merged with prettyhtml's default options, and the merged options will be used when formatting strings.

In both cases, the options will apply to all usages of the custom matchers, but can be overridden in the matcher calls themselves.

#### Examples

```js
createPrettyHtmlMatchers()
createPrettyHtmlMatchers({ singleQuote: false }))
```

<hr />

### `toMatchPrettyHtmlSnapshot(options?: PrettyHtmlOptions, hint?: string)`

Ensures that a value formatted with prettyhtml matches the most recent snapshot.

#### Arguments

- `options` - _Optional_ An object containing prettyhtml options. These options take precedence over options defined globally in `createPrettyHtmlMatchers`.
- `hint` - _Optional_ A string that is appended to the test name.

#### Examples

```js
expect(string).toMatchPrettyHtmlSnapshot()
expect(string).toMatchPrettyHtmlSnapshot('testName')
expect(string).toMatchPrettyHtmlSnapshot({ singleQuote: false })
expect(string).toMatchPrettyHtmlSnapshot({ singleQuote: false }, 'testName')
```

<hr />

### `toMatchInlinePrettyHtmlSnapshot(options?: PrettyHtmlOptions, inlineSnapshot?: string)`

Ensures that a value formatted with prettyhtml matches the most recent snapshot.

#### Arguments

- `options` - _Optional_ An object containing prettyhtml options. These options take precedence over options defined globally in `createPrettyHtmlMatchers`.
- `inlineSnapshot` - _Optional_ Jest adds this string to the matcher in the test file (instead of an external `.snap` file) the first time that the test runs.

#### Examples

```js
expect(string).toMatchInlinePrettyHtmlSnapshot()
expect(string).toMatchInlinePrettyHtmlSnapshot({ singleQuote: false })
```

<hr />

## Installation

```
$ npm install -D jest-prettyhtml-matchers
```

## License

MIT
