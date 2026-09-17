const fs = require("fs");
const path = require("path");

const TEST_DATA_FILE = path.join(__dirname, "../src/data/exercises.test.json");
const SEED_FILE = path.join(__dirname, "../src/data/exercises.seed.json");

process.env.EXERCISE_DATA_FILE = TEST_DATA_FILE;

beforeEach(() => {
    fs.copyFileSync(SEED_FILE, TEST_DATA_FILE);
});

afterAll(() => {
    if (fs.existsSync(TEST_DATA_FILE)) {
        fs.unlinkSync(TEST_DATA_FILE);
    }
});