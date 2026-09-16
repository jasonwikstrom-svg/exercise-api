const express = require("express");
const exercisesRouter = require("./routes/exercises");

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok"})
});

app.use("/exercises", exercisesRouter);

module.exports = app;