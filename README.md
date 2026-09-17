# Exercise API

A REST API built with **Node.js and Express**, the theme is **exercises**: the API lets you list, filter, paginate, create, update and delete exercises.
grouped by muscle group, difficulty level, and equipment needed.

---

## Contents

- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Data Storage](#data-storage)
- [Endpoints](#endpoints)
- [Filtering](#filtering)
- [Pagination](#pagination)
- [Tech Stack](#tech-stack)
- [Development Method (TDD)](#development-method-tdd)

---

## Getting Started

Requires **Node.js** and **npm** installed.


```bash
# 1. Install dependencies
npm install

# 2. Start the server (default port: 3000)
npm start
```

The server runs on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable.'

```bash
curl http://localhost:3000/health
# {"status": "ok"}
```

---

## Running Tests 

This +project was built test-first (TDD) using **Jest** and **Supertest**. 

```bash
npm test
```

Tests run against an isolated copy of the data (see `tests/setupTestData.js`), which is reset from the seed data before every single test. 
Test files run one at a time (`--runInBand`) since they share the same test data file.

---

## Data Storage

Data is stored in a JSON file:

- `src/data/exercises.seed.json` - the source data with 10 example exercises, comitted to git.
- `src/data/exercises.json` - the actual "database" the API reads from and writes to when running normally. It's created automatically (as a copy of the seed file) the first time the server or a test runs, and is listed in `.gitignore`.

To reset the database, just delete `src/data/exercises.json` it will be recreated from the seed file automatically.

---

## Endpoints 

| Method | Endpoint                        | Description                                       |
|--------|-----------------------------------|----------------------------------------------------|
| GET    | `/health`                        | Health check                                       |
| GET    | `/exercises`                     | List exercises (supports filtering + pagination)   |
| GET    | `/exercises/:id`                 | Get a single exercise                              |
| GET    | `/exercises/muscle-group/:group` | Get exercises for a muscle group (supports pagination) |
| POST   | `/exercises`                     | Create a new exercise                              |
| PUT    | `/exercises/:id`                 | Update an existing exercise (partial update)       |
| DELETE | `/exercises/:id`                 | Delete an exercise                                 |

---

## Filtering 

`GET /exercises` can be filtered using query parameters, which can be combined freely:

GET /exercises?muscleGroup=legs
GET /exercises?equipment=dumbbell
GET /exercises?difficulty=beginner
GET /exercises?muscleGroup=chest&equipment=bodyweight 

Valid values:
- `muscleGroup`: `chest`, `back`, `legs`, `shoulders`, `arms`, `core`, `cardio`
- `equipment`: `bodyweight`, `dumbbell`, `barbell`, `machine`, `cable`, `band`
- `difficulty`: `beginner`, `intermediate`, `advanced`

---

## Pagination 

`page` and `limit` control how many exercises are returned per request. Default is `page=1` and `limit=10`, and work on both `/exercises` and `/exercises/muscle-group/:group`.

GET /exercises?limit=3
GET /exercises?limit=4&page=2
GET /exercises/muscle-group/legs?limit=1

The response includes pagination metadata:

```json
{
  "data": [ "..." ],
  "meta": { "page": 1, "limit": 3, "total": 10 }
}
```

---

## Tech Stack 

- **Node.js** + **Express** - web framework for routing and middleware
- **Jest** + **Supertest** - unit/integration testing of the API, TDD approach
- **JSON file** - simple data storage for exercises, no database required
 
---

## Development Method (TDD)

Every feature in the API was built using red-green-refactor:
 
1. A failing test is written and committed (`test:`)
2. The minimal code needed to make the test pass is written and committed (`feat:`)












