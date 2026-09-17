const request = require("supertest");
const app = require("../src/app");

describe("PUT /exercises/:id", () => {
   it("updates an existing exercise and returns it", async () => {
       const res = await request(app)
           .put("/exercises/1")
           .send({ name: "Updated Exercise", sets: 5 });
       expect(res.status).toBe(200);
       expect(res.body.data).toMatchObject({ id: 1, name: "Updated Exercise", sets: 5 });
   });
   
   it("returns 404 if the exercise does not exist", async () => {
       const res = await request(app).put("/exercises/9999").send({ name: "Dosnt exist"})
       expect(res.status).toBe(404);
   });
   
   it("returns 400 if the update contains invalid values", async () => {
      const res = await request(app).put("/exercises/1").send({ muscleGroup: "banana" });
      expect(res.status).toBe(400);
   });
   
   it("returns 400 if the update contains invalid values", async () => {
      const res = await request(app).put("/exercises/abc").send({ name: "x" });
        expect(res.status).toBe(400);
   });
   
});