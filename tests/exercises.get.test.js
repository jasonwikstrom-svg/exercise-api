const request = require("supertest");
const app = require("../src/app");

describe("GET /exercises", () => {
    it("returnerar en lista med övningar (status 200)", async () => {
        const res = await request(app).get("/exercises");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("varje övning har fälten id, name och muscleGroup", async () => {
        const res = await request(app).get("/exercises");
        const first = res.body.data[0];
        expect(first).toHaveProperty("id");
        expect(first).toHaveProperty("name");
        expect(first).toHaveProperty("muscleGroup");
    });
});

describe("GET /exercises/:id", () => {
    it("returnerar en specifik övning om den finns", async () => {
        const res = await request(app).get("/exercises/1");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("id", 1);
    });

    it("returnerar 404 om övningen inte finns", async () => {
        const res = await request(app).get("/exercises/9999");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("error");
    });

    it("returnerar 400 om id inte är ett giltigt nummer", async () => {
        const res = await request(app).get("/exercises/abc");
        expect(res.status).toBe(400);
    });
});