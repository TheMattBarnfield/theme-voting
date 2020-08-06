![firebase-deploy](https://github.com/TheMattBarnfield/theme-voting/workflows/firebase-deploy/badge.svg?branch=master)

# Theme voting app for SoftJamGameWire

## Setup

### Requirements

- Node version 8+
- Firebase CLI tools (`npm i -g firebase-tools`)

### Installation

Run `npm i` in both `/frontend` and `/functions`

### Running Locally

- At the project root, run `firebase emulators:start` to start the backend
- In another terminal, go to `/frontend` and run `npm run start`

## Releasing

A GitHub action deploys the code to Firebase whenever a commit is pushed to master.
