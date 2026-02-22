const express = require("express");

const cors = require("cors");

const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/track", (req, res) => {

    const log = JSON.stringify(req.body, null, 2);

    console.log("\nTRACKED USER:\n", log);

    fs.appendFileSync("tracking-log.json", log + ",\n");

    res.sendStatus(200);

});

app.listen(3000, () => {

    console.log("Tracking server running on port 3000");

});