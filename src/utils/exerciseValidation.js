const MUSCLE_GROUPS = ["chest", "back", "legs", "shoulders", "arms", "core", "cardio"]
const EQUIPMENT_TYPES = ["bodyweight", "dumbbell", "barbell", "machine", "cable", "band"]
const DIFFICULTIES = ["beginner", "intermediate", "advanced"]

function clean(text) {
    if (typeof text !== "string") return text;
    
    return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function validateExercise(body, { partial = false } = {}) {
    const errors = [];
    const data = {};
    
    if (!partial || body.name !== undefined) {
        if (body.name === undefined || body.name.trim() === "") {
    errors.push("Name is required");
        } 
        else {
            data.name = clean(body.name);
        }
    }
    if (!partial || body.muscleGroup !== undefined) {
        if (!MUSCLE_GROUPS.includes(body.muscleGroup)) {
            errors.push("Muscle group must be one of: ${MUSCLE_GROUPS.join(", ")}");
        }
        else {
            data.muscleGroup = body.muscleGroup;
        }
    }
    
    if (body.difficulty !== undefined) {
        if (!DIFFICULTIES.includes(body.difficulty)) {
            errors.push("Difficulty must be one of: ${DIFFICULTIES.join(", ")}");
        }
        else {
            data.difficulty = body.difficulty;
        }
    }
    
    if (body.description !== undefined) {
        data.description = clean(body.description);
    }
    
    if (body.sets !== undefined) {
        if (!Number.isInteger(body.sets)) {
            errors.push("Sets ${JSON.stringify(body.sets)}");
        }
        else {
            data.sets = body.sets;
        }
    }
    
    return { valid: errors.length === 0, errors, data };
}
    
    module.exports = { validateExercise, MUSCLE_GROUPS, EQUIPMENT_TYPES, DIFFICULTIES };