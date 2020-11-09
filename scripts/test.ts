import { spawnSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

let status

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

  spawnSync(
    'npm',
    ['install', '--no-package-lock', '--quiet', '--no-progress'],
    {
      cwd: dir,
      stdio: 'inherit',
    }
  )
}

const runJest = (configPath: string, dir?: string) => {
  ;({ status } = spawnSync(
    'jest',
    ['-c', configPath, process.argv.slice(2).join(' ')],
    {
      cwd: dir,
      stdio: 'inherit',
    }
  ))
}

const getBaseConfig = (options = {}) => ({
  moduleNameMapper: {
    '^jest-prettyhtml-matchers$': '<rootDir>/src',
  },
  preset: 'ts-jest',
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
      })
    )
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

  fs.copySync(srcDir, targetSrcDir)
  fs.copySync(distDir, targetDistDir)

  fs.writeFileSync(
    srcConfigPath,
    JSON.stringify(
      getSrcConfig({
        rootDir,
      })
    )
  )

  fs.writeFileSync(
    distConfigPath,
    JSON.stringify(
      getDistConfig({
        rootDir,
      })
    )
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
  const jestVersions = fs.readdirSync(path.join(process.cwd(), 'test/jest'))
  jestVersions.forEach(runJestVersionTests)
}

process.exit(status)
