const request = require("supertest");
const app = require("../src/app");

describe("GET /exercises/muscle-group/:group", () => {
   it("returns only exercises with matching muscle group", async () => {
        const res = await request(app).get("/exercises/muscle-group/legs");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.data.every(ex => ex.muscleGroup === "legs")).toBe(true);
        expect(res.body.data.map(ex => ex.id).sort()).toEqual([1, 8]);
   }) ;
   it("returns 404 for an invalid muscle group", async () => {
       const res = await request(app).get("/exercises/muscle-group/banana");
       expect(res.status).toBe(400);
   });
});