const express = require("express");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/about", require("./routes/about"));
app.use("/api", require("./routes/costs"));
app.use("/api", require("./routes/users"));

/**
 * GET /
 * Simple health-check endpoint that returns plain text.
 *
 * @param {import("express").Request} req  - Express request object.
 * @param {import("express").Response} res - Express response object; sends text.
 * @returns {void}
 */
app.get("/", (req, res) => {
  res.send("Cost Manager API is working 🚀");
});

// const PORT = process.env.PORT || 3000;

const PORT = 3000;

/**
 * Starts the server and listens on the configured port.
 *
 * @function
 * @param {number} PORT - Port number (from process.env.PORT or default 3000).
 * @returns {void}
 */
app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
