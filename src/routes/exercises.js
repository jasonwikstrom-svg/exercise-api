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

module.exports = router;