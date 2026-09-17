const express = require("express");
const exercisesRouter = require("./routes/exercises");

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok"})
});

app.use("/exercises", exercisesRouter);

app.use((req, res) => {
    res.status(404).json({ error: `Resource ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
   const status = err.status || 500;
   if (status >= 500) {
       console.error(err);
   }
   res.status(status).json({ error: err.message || "An unexpected error occurred" });
});

module.exports = app;