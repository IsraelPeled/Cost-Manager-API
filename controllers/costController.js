const Cost = require("../models/Cost");

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

// GET /api/report?id=123123&year=2025&month=5
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
