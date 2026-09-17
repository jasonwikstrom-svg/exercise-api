const request = require("supertest");
const app = require("../src/app");

describe("GET /exercises with filters", () => {
    it("filters by muscleGroup", async () => {
        const res = await request(app).get("/exercises?muscleGroup=legs");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data.every((ex) => ex.muscleGroup === "legs")).toBe(true);
    });

    it("filters by equipment", async () => {
        const res = await request(app).get("/exercises?equipment=barbell");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(3);
        expect(res.body.data.every((ex) => ex.equipment === "barbell")).toBe(true);
    });

    it("filters by difficulty", async () => {
        const res = await request(app).get("/exercises?difficulty=beginner");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(6);
        expect(res.body.data.every((ex) => ex.difficulty === "beginner")).toBe(true);
    });

    it("combines multiple filters", async () => {
        const res = await request(app).get("/exercises?muscleGroup=chest&equipment=bodyweight");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.data[0].id).toBe(4);
    });

    it("returns 400 for an invalid filter value", async () => {
        const res = await request(app).get("/exercises?muscleGroup=banana");
        expect(res.status).toBe(400);
    });
});