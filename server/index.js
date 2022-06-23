const express = require("express");
require('dotenv').config();

const { getData } = require("./api/proxy.js");

const PORT = 3001;
const app = express();

function logger(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const end = Date.now();
        const diffSeconds = (end - start) / 1000;
        console.log(`${req.method} ${req.url} Completed in ${diffSeconds} seconds`);
    });
    next();
}
app.use(logger);

app.get("/api", async (req, res, next) => {
    try {
        const data = await getData();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));