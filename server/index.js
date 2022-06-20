const express = require("express");

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

app.get("/api", (req, res) => {
    res.json({ message: "Hello" });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));