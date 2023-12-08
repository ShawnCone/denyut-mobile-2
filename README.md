# Denyut Mobile 2

## Overview

Denyut mobile 2 is an android-first client side app

TBD: Mental model image here

## Stack and Notable Packages

- React native (Expo)
- Typescript
- React Hook Form
- Zod
- Supabase
- Apollo (For GraphQL)
- Tanstack Query

## Authentication

Authentication is handled using supabase

## Backend

TBD: Info about backend for denyut mobile, link to repo

## CI / CD

### Compilation check

Compilation check uses typescript `tsc --noEmit`

To check, execute `npm run ts:check`

### Linting

Linting uses eslint with [expo configuration](https://github.com/expo/expo/tree/main/packages/eslint-config-universe#customizing-prettier) as base, then customization are added, check `.eslintrc.json`.

To check, execute `npm run lint`

### Formatting

Uses [prettier](https://prettier.io/), config is available in `.prettierrc`

To format, execute `npm run format`

TBD: Workflow checks for PR are not in place yet. Until then, make sure before each PR, `npm run check` is executed without issues.

## Development

1. Start development server: `npm run start`
2. Open Expo App, scan barcode shown in the console

## Deployment / Build

TBD: Info to build and upload app to play store
