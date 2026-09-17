const request = require("supertest");
const app = require("../src/app");

describe("Pagination", () => {
    it("returns the default page with the default limit when no params are given", async () => {
        const res = await request(app).get("/exercises");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(10);
        expect(res.body.meta).toEqual({ page: 1, limit: 10, total: 10 });
    });

    it("limits the number of results with ?limit=", async () => {
        const res = await request(app).get("/exercises?limit=3");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(3);
        expect(res.body.meta).toEqual({ page: 1, limit: 3, total: 10 });
    });

    it("returns the correct slice with ?page=&limit=", async () => {
        const res = await request(app).get("/exercises?page=2&limit=4");
        expect(res.status).toBe(200);
        expect(res.body.data.map((ex) => ex.id)).toEqual([5, 6, 7, 8]);
        expect(res.body.meta).toEqual({ page: 2, limit: 4, total: 10 });
    });

    it("supports pagination on GET /exercises/muscle-group/:group", async () => {
        const res = await request(app).get("/exercises/muscle-group/legs?limit=1");
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.meta).toEqual({ page: 1, limit: 1, total: 2 });
    });
});