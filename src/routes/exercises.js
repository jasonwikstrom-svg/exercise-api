const express = require("express");
const repository = require("../data/exerciseRepository");
const { validateExercise, MUSCLE_GROUPS, EQUIPMENT_TYPES, DIFFICULTIES } = require("../utils/exerciseValidation");

const router = express.Router();

router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    
    try {
        const exercise = repository.getById(id);
        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        res.status(200).json( { data: exercise });
    }
    catch (err) {
        next(err);
    }
});

router.get("/", (req, res, next) => {
    const { muscleGroup, equipment, difficulty } = req.query;
    
    if (muscleGroup !== undefined && !MUSCLE_GROUPS.includes(muscleGroup)) {
        return res.status(400).json({ error: "Invalid muscle group" });
    }
    if (equipment !== undefined && !EQUIPMENT_TYPES.includes(equipment)) {
        return res.status(400).json({ error: "Invalid equipment type" });
    }
    if (difficulty !== undefined && !DIFFICULTIES.includes(difficulty)) {
        return res.status(400).json({ error: "Invalid difficulty" });
    }
    
    try {
        let exercises = repository.getAll();
        if (muscleGroup) {
            exercises = exercises.filter(ex => ex.muscleGroup === muscleGroup);
        }
        if (equipment) {
            exercises = exercises.filter(ex => ex.equipment === equipment);
        }
        if (difficulty) {
            exercises = exercises.filter(ex => ex.difficulty === difficulty);
        }
        
        res.status(200).json({ data: exercises });
    }
    catch (err) {
        next(err);
    }
});



router.post("/", (req, res, next) => {
    const { valid, errors, data } = validateExercise(req.body || {} )
    
    if (!valid) {
        return res.status(400).json({ errors });
    }
    
    try {
        const created = repository.create(data);
        res.status(201).json({ data: created });
    }
    catch (err) {
        next(err);
    }
});

router.put("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    try {
        const existing = repository.getById(id);
        if (!existing) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        const { valid, errors, data } = validateExercise(req.body || {}, { partial: true });
        if (!valid) {
            return res.status(400).json({ errors }); 
        }
        const updated = repository.update(id, data);
        res.status(200).json({ data: updated });
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    try {
        const remove = repository.remove(id);
        if (!remove) {
            return res.status(404).json({ error: "Exercise not found" });
        }
        res.status(200).json({ data: remove });
    }
    catch (err) {
        next(err);
    }
});

router.get("/muscle-group/:group", (req, res, next) => {
    const { group } = req.params;
    if (!MUSCLE_GROUPS.includes(group)) {
        return res.status(400).json({ error: "Invalid muscle group" });
    }
    try {
        const exercises = repository.getAll().filter((ex) => ex.muscleGroup === group);
        res.status(200).json({ data: exercises });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;