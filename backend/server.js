const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());


const PORT = 5000;

app.get("/", (req, res) => {
    res.json({
        message: "LankaTransit API is running"
    });
});


app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:");
  console.log("Email:", email);

  res.json({
    message: "Login request received successfully"
  });
});


app.listen(PORT, () => {
    console.log(`LankaTransit server running on port ${PORT}`);
});