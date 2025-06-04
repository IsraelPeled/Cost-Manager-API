const Cost = require("../models/Cost");

/**
 * POST /api/add
 * Adds a new cost item.
 *
 * Body (`req.body`) must include:
 *   - description {string}
 *   - category {string} (one of "food","health","housing","sport","education")
 *   - userid {number}
 *   - sum {number}
 *   - date {string|Date} (optional)
 *
 * Responses:
 *   • 201: Returns saved cost JSON.
 *   • 400: Missing required fields.
 *   • 500: Database error.
 *
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const addCost = async (req, res) => {
  try {
    const { description, category, userid, sum, date } = req.body;

    if (!description || !category || !userid || !sum) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const cost = new Cost({
      description,
      category,
      userid,
      sum,
      date: date || new Date(),
    });

    const savedCost = await cost.save();
    res.json(savedCost);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

/**
 * GET /api/report
 * Returns monthly cost report for a user.
 *
 * Query (`req.query`) must include:
 *   - id {string|number}
 *   - year {string|number}
 *   - month {string|number}
 *
 * Success (200) returns JSON:
 * {
 *   userid: Number,
 *   year: Number,
 *   month: Number,
 *   cost: [
 *     { food:    [ { sum:Number, description:String, day:Number } ] },
 *     { health:  [ { sum:Number, description:String, day:Number } ] },
 *     { housing: [] },
 *     { sport:   [ { sum:Number, description:String, day:Number } ] },
 *     { education:[ { sum:Number, description:String, day:Number } ] }
 *   ]
 * }
 *
 * Responses:
 *   • 200: Report JSON.
 *   • 400: Missing id/year/month.
 *   • 500: Database error.
 *
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const getMonthlyReport = async (req, res) => {
  try {
    const { id, year, month } = req.query;
    if (!id || !year || !month) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const costs = await Cost.find({
      userid: Number(id),
      date: { $gte: startDate, $lt: endDate },
    }).sort({ date: 1 });

    const groupedCosts = {
      food: [],
      health: [],
      housing: [],
      sport: [],
      education: [],
    };

    for (const cost of costs) {
      const day = cost.date.getDate();
      groupedCosts[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: day,
      });
    }

    const report = {
      userid: Number(id),
      year: Number(year),
      month: Number(month),
      cost: Object.keys(groupedCosts).map((category) => ({
        [category]: groupedCosts[category],
      })),
    };
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

module.exports = { addCost, getMonthlyReport };
