const request = require("supertest");
const app = require("../src/app");

describe("POST /exercises", () => {
    it("creates a new exercise and returns it with status 201", async () => {
        const payload = {
            name: "Test Exercise",
            muscleGroup: "core",
            equipment: "bodyweight",
            difficulty: "beginner",
            description: "Exercise created for testing purposes.",
            sets: 3,
            reps: 10,
        };
        
        const res = await request(app).post("/exercises").send(payload);
        
        expect(res.status).toBe(201);
        expect(res.body.data).toMatchObject({ name: "Test Exercise", muscleGroup: "core" });
        expect(res.body.data).toHaveProperty("id");
    });
    
    it("returns 400 if required fields are missing", async () => {
        const res = await request(app).post("/exercises").send({ description: "Missing required fields" });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors");
    });
    
    it("returns 400 if muscleGroup is invalid", async () => {
        const res = await request(app).post("/exercises").send({
            name: "Unknown Muscle Group Exercise",
            muscleGroup: "banana",
        });
        expect(res.status).toBe(400);
    });
});