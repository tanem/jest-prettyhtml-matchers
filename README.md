# jest-prettyhtml-matchers

[![npm version](https://img.shields.io/npm/v/jest-prettyhtml-matchers.svg?style=flat-square)](https://www.npmjs.com/package/jest-prettyhtml-matchers)
[![build status](https://img.shields.io/travis/tanem/jest-prettyhtml-matchers/master.svg?style=flat-square)](https://travis-ci.org/tanem/jest-prettyhtml-matchers)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/jest-prettyhtml-matchers.svg?style=flat-square)](https://codecov.io/gh/tanem/jest-prettyhtml-matchers)
[![npm downloads](https://img.shields.io/npm/dm/jest-prettyhtml-matchers.svg?style=flat-square)](https://www.npmjs.com/package/jest-prettyhtml-matchers)

> Custom [Jest](https://jestjs.io/en/) snapshot matchers that use [prettyhtml](https://github.com/Prettyhtml/prettyhtml) to format strings.

## Basic Usage

First, add the custom matchers to Jest. A convenient way to do this is via a setup file included in [`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array):

```ts
// setupJest.js
import { createPrettyHtmlMatchers } from 'jest-prettyhtml-matchers'
expect.extend(createPrettyHtmlMatchers())
```

> Note for TypeScript users: To ensure the global jest declaration is augmented correctly, this file should be [included via your TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). There's an example of this setup in [tanem/react-svg](https://github.com/tanem/react-svg).

Now you can use the custom matchers in your tests:

```ts
expect(string).toMatchPrettyHtmlSnapshot()
expect(string).toMatchInlinePrettyHtmlSnapshot()
```

## API

### `createPrettyHtmlMatchers(options?: PrettyHtmlOptions)`

Generates the custom matchers so that they can be [added](https://jestjs.io/docs/en/expect#expectextendmatchers) to Jest.

#### Arguments

- `options` - _Optional_ An object containing prettyhtml options. If `options` is not provided, [prettyhtml's default options](https://github.com/Prettyhtml/prettyhtml#options) will be used when formatting strings. If `options` is provided, it will be merged with prettyhtml's default options, and the merged options will be used when formatting strings. In both cases, the options will apply to all usages of the custom matchers, but can be overridden in the matcher calls themselves.

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
