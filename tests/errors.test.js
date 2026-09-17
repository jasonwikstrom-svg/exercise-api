const fs = require("fs");
const request = require("supertest");
const app = require("../src/app");

describe("Error handling", () => {
    it("returns a JSON 404 for unknown routes", async () => {
        const res = await request(app).get("/not-a-real-route");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("error");
    });
    it("returns a JSON 503 if the data file is corrupt", async () => {
        fs.writeFileSync(process.env.EXERCISE_DATA_FILE, "{not vaild json", "utf-8");
        const res = await request(app).get("/exercises");
        expect(res.status).toBe(503);
        expect(res.body).toHaveProperty("error");
    });
});