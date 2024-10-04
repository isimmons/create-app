#!/usr/bin/env node

import { execSync } from 'child_process'

const runCommand = (command: string) => {
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to run command: ${command}`)
    return false
  }
  return true
}

const appName = process.argv[2]

if (!appName) {
  console.error('No app name provided')
  process.exit(1)
}

const repoUrl = 'https://github.com/isimmons/thing-1.git'
const gitCheckoutCommand = `git clone --depth 1 ${repoUrl} ${appName}`
const installDependenciesCommand = `cd ${appName} && pnpm install`

console.log(`Cloning ${repoUrl} into ${appName}...`)
const checkedOut = runCommand(gitCheckoutCommand)

if (!checkedOut) {
  console.error('Failed to clone repository')
  process.exit(1)
}

console.log(`Installing dependencies for ${appName}...`)
const installedDependencies = runCommand(installDependenciesCommand)

if (!installedDependencies) {
  console.error('Failed to install dependencies')
  process.exit(1)
}

console.log(`Successfully created ${appName}!`)
console.log('Get started by running:')
console.log(`cd ${appName} && npm run dev`)
