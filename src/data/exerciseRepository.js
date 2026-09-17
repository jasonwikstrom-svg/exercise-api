const fs = require("fs");
const path = require("path");

const SEED_FILE = path.join(__dirname, "../data/exercises.seed.json");

function getDataFile() {
    return process.env.EXERCISE_DATA_FILE || path.join(__dirname, "exercises.json");
}

function ensureDataFile() {
    const dataFile = getDataFile();
    if (!fs.existsSync(dataFile)) {
        fs.copyFileSync(SEED_FILE, dataFile);
    }
}

function readAll() {
    let raw;
    try {
        ensureDataFile();
        raw = fs.readFileSync(getDataFile(), "utf-8");
    }
    catch (err) {
        const error = new Error("Couldnt read exercises data file");
        error.status = 503;
        throw error;
    }
    try {
        return JSON.parse(raw);
    }
    catch (err) {
        const error = new Error("Failed to parse exercises data file");
        error.status = 503;
        throw error;
    }
}

function writeAll(exercise) {
    fs.writeFileSync(getDataFile(), JSON.stringify(exercise, null, 2), "utf-8");
}

function getAll() {
    return readAll();
}

function getById(id) {
    return readAll().find((ex) => ex.id === id);
}

function getNextId() {
    return exercises.reduce((maxId, ex) => Math.max(maxId, ex.id), 0) + 1;
}

function create(data) {
    const exercises = readAll();
    const newExercise = { id: getNextId(), ...data };
    exercises.push(newExercise);
    fs.writeFileSync(getDataFile(), JSON.stringify(exercises, null, 2), "utf-8");
    return newExercise;
}


module.exports = { getAll, getById, create, SEED_FILE };