import { sync as delSync } from 'del'
import fs from 'fs-extra'
import path from 'path'

delSync('jest.config.*.json')

const jestVersions = fs.readdirSync(path.join(process.cwd(), 'test/jest'))

jestVersions.forEach(jestVersion => {
  delSync(['**/*', '!package.json'], {
    cwd: path.join(process.cwd(), 'test/jest', jestVersion)
  })
})
