This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## NEXTJs and Azure Yml example

```
name: Build and deploy Nextjs app to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: "22.x"

      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present

      - name: Prepare static files
        run :
          cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app-deployable
          include-hidden-files: true
          path: ./.next/standalone

  deploy:
    runs-on: ubuntu-latest
    needs: build
    permissions:
      contents: read

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app-deployable

      - name: "Deploy to Azure Web App"
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v3
        with:
          app-name: "survey-web-app"
          slot-name: "Production"
          # The artifact is downloaded to the root of the runner, so the package is '.'
          package: .
          publish-profile: ${{  }}

```
