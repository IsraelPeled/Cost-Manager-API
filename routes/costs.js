const express = require("express");
const { addCost, getMonthlyReport } = require("../controllers/costController");
const router = express.Router();

/**
 * @route POST /api/add
 * @description
 * Adds a new cost item to the database.
 *
 * Request body (`req.body`) must include:
 *   - description {string}
 *   - category    {string} ("food","health","housing","sport","education")
 *   - userid      {number}
 *   - sum         {number}
 *   - date        {string|Date} (optional)
 *
 * Responses:
 *   • 200 OK: Returns saved cost JSON.
 *   • 400 Bad Request: Missing required fields.
 *   • 500 Server Error: Database operation fails.
 *
 * @param {import("express").Request} req  - Express request object (with `req.body`).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>}
 */
router.post("/add", addCost);

/**
 * @route GET /api/report
 * @description
 * Returns a monthly cost report for a specific user.
 *
 * Query parameters (`req.query`) must include:
 *   - id    {string|number}
 *   - year  {string|number}
 *   - month {string|number}
 *
 * Success (200 OK) returns JSON:
 * {
 *   userid: Number,
 *   year:   Number,
 *   month:  Number,
 *   costs: [
 *     { food:    [ { sum:Number, description:String, day:Number } ] },
 *     { health:  [ { sum:Number, description:String, day:Number } ] },
 *     { housing: [] },
 *     { sport:   [ { sum:Number, description:String, day:Number } ] },
 *     { education:[ { sum:Number, description:String, day:Number } ] }
 *   ]
 * }
 *
 * Responses:
 *   • 200 OK: Returns the cost report JSON as described.
 *   • 400 Bad Request: Missing id/year/month.
 *   • 500 Server Error: Database query fails.
 *
 * @param {import("express").Request} req  - Express request object (with `req.query`).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>}
 */
router.get("/report", getMonthlyReport);

module.exports = router;
