const request = require("supertest");
const app = require("../src/app");

describe("DELETE /exercises/:id", () => {
    it("deletes an existing exercise and returns status 204", async () => {
        const res = await request(app).delete("/exercises/1");
        expect(res.status).toBe(200);
        expect(res.body.data).toMatchObject({ id: 1 });
        
        const getRes = await request(app).get("/exercises/1");
        expect(getRes.status).toBe(404);
    });
    
    it("returns 404 if the exercise does not exist", async () => {
        const res = await request(app).delete("/exercises/9999");
        expect(res.status).toBe(404);
    });
    
    it("returns 400 if id is not a valid number", async () => {
        const res = await request(app).delete("/exercises/abc");
        expect(res.status).toBe(400);
    });
});