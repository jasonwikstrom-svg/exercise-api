const express = require("express");
const repository = require("../data/exerciseRepository");

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
    try {
        const exercises = repository.getAll();
        res.status(200).json({ data: exercises });
    }
    catch (err) {
        next(err);
    }
});

const { validateExercise } = require("../utils/exerciseValidation");

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
})


module.exports = router;