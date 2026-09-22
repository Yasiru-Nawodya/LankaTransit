const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.json({
        message: "LankaTransit API is running"
    });
});

app.listen(PORT, () => {
    console.log(`LankaTransit server running on port ${PORT}`);
});