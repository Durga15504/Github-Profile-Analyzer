# GitHub Profile Analyzer API

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios

## Installation

npm install

## Configure

Create .env

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=github_analyzer

## Run

npm run dev

## Endpoints

POST /api/analyze/:username

GET /api/profiles

GET /api/profiles/:username


## API Examples

POST

/api/analyze/octocat

GET

/api/profiles

GET

/api/profiles/octocat

## Start Server

node app.js

or

npm run dev