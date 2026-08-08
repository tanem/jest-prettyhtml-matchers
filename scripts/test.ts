import { spawnSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

// Every jest run's exit code folds into this, and it never clears. Assigning it
// per run instead meant the last version tested decided the whole suite's exit
// code, so a failure anywhere but the end left the run green.
let status = 0

const testTarget = process.env.TEST_TARGET || 'all'

const installPrereqs = (dir: string) => {
  spawnSync('nvm', ['i'], {
    cwd: dir,
    stdio: 'inherit',
  })

  spawnSync('nvm', ['install-latest-npm'], {
    cwd: dir,
    stdio: 'inherit',
  })

  const install = spawnSync(
    'npm',
    ['install', '--no-package-lock', '--quiet', '--no-progress'],
    {
      cwd: dir,
      stdio: 'inherit',
    },
  )

  // A failed install used to be survivable: jest was then missing, spawnSync
  // returned a null status rather than a number, and the version counted as a
  // pass. The matrix reported green while testing nothing at all.
  if (install.status !== 0) {
    throw new Error(
      `Installing prerequisites failed in ${dir} (npm exited ${install.status})`,
    )
  }
}

const runJest = (configPath: string, dir = process.cwd()) => {
  const result = spawnSync(
    path.join(dir, 'node_modules', '.bin', 'jest'),
    ['-c', configPath, process.argv.slice(2).join(' ')],
    {
      cwd: dir,
      stdio: 'inherit',
    },
  )
  if (result.status) {
    status = result.status
  }
}

const getBaseConfig = (options = {}) => ({
  moduleNameMapper: {
    '^jest-prettyhtml-matchers$': '<rootDir>/src',
  },
  preset: 'ts-jest',
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  testMatch: ['<rootDir>/src/__tests__/*.test.ts'],
  ...options,
})

const getSrcConfig = (options = {}) => getBaseConfig(options)

const getDistConfig = (options = {}) =>
  getBaseConfig({
    moduleNameMapper: {
      '^jest-prettyhtml-matchers$': '<rootDir>/dist',
    },
    ...options,
  })

const runSrcTests = () => {
  console.log('Testing src')
  const srcConfigPath = path.join(process.cwd(), 'jest.config.src.json')
  fs.writeFileSync(
    srcConfigPath,
    JSON.stringify(
      getSrcConfig({
        collectCoverage: true,
        collectCoverageFrom: ['<rootDir>/src/*.ts'],
      }),
    ),
  )
  runJest(srcConfigPath)
}

const runDistTests = () => {
  console.log('Testing dist')
  const distConfigPath = path.join(process.cwd(), 'jest.config.dist.json')
  fs.writeFileSync(distConfigPath, JSON.stringify(getDistConfig()))
  runJest(distConfigPath)
}

const runJestVersionTests = (jestVersion: string) => {
  console.log(`Testing ${jestVersion}`)
  const rootDir = path.join(process.cwd(), 'test/jest', jestVersion)
  const srcDir = path.join(process.cwd(), 'src')
  const distDir = path.join(process.cwd(), 'dist')

  const targetSrcDir = path.join(rootDir, 'src')
  const targetDistDir = path.join(rootDir, 'dist')
  const srcConfigPath = path.join(rootDir, 'jest.config.src.json')
  const distConfigPath = path.join(rootDir, 'jest.config.dist.json')
  const tsconfigPath = path.join(rootDir, 'tsconfig.json')

  fs.copySync(srcDir, targetSrcDir)
  fs.copySync(distDir, targetDistDir)

  // Without a tsconfig of its own, ts-jest compiles the copied tests with its
  // built-in defaults, which do not pull in the jest globals — every file then
  // fails with TS2593 "Cannot find name 'describe'". `types: ['jest']` resolves
  // through the repo root's node_modules/@types, so the version directories
  // stay as thin as they look: a package.json naming a jest version, nothing
  // else checked in.
  //
  // Deliberately not the root tsconfig's NodeNext: each directory resolves its
  // own TypeScript, and the oldest jest in the matrix drags in one that predates
  // NodeNext and rejects it outright (TS6046). commonjs/node is understood by
  // every TypeScript any of these versions can pull, and matches how jest loads
  // the tests anyway.
  fs.writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        esModuleInterop: true,
        module: 'commonjs',
        moduleResolution: 'node',
        strict: true,
        target: 'ES2015',
        types: ['jest'],
      },
    }),
  )

  fs.writeFileSync(
    srcConfigPath,
    JSON.stringify(
      getSrcConfig({
        rootDir,
      }),
    ),
  )

  fs.writeFileSync(
    distConfigPath,
    JSON.stringify(
      getDistConfig({
        rootDir,
      }),
    ),
  )

  installPrereqs(rootDir)

  runJest(srcConfigPath, rootDir)
  runJest(distConfigPath, rootDir)
}

if (testTarget === 'src') {
  runSrcTests()
}

if (testTarget === 'dist') {
  runDistTests()
}

if (/^\d\d\.\d$/.test(testTarget)) {
  runJestVersionTests(testTarget)
}

if (testTarget === 'all') {
  runSrcTests()
  runDistTests()
  const jestVersions = fs
    .readdirSync(path.join(process.cwd(), 'test/jest'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  jestVersions.forEach(runJestVersionTests)
}

process.exit(status)
