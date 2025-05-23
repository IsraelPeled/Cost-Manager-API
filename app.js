const express = require("express");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/about", require("./routes/about"));
app.use("/api", require("./routes/costs"));
app.use("/api", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Cost Manager API is working 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
