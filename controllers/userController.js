const User = require("../models/User");
const Cost = require("../models/Cost");

/**
 * Retrieves details of a single user by ID and calculates the total cost.
 *
 * @async
 * @function getUser
 * @param {import("express").Request} req - Express request object; expects req.params.id to be the user ID (string or number).
 * @param {import("express").Response} res - Express response object; returns JSON object:
 *    {
 *      first_name: string,
 *      last_name: string,
 *      id: number,
 *      total: number
 *    }
 * @returns {Promise<void>}
 * @status 200 - OK with JSON of user’s first_name, last_name, id, and total cost.
 * @status 404 - Not Found if user with given ID does not exist.
 * @status 500 - Server Error if aggregation or database query fails.
 */
const getUser = async (req, res) => {
  try {
    const userid = Number(req.params.id);
    const user = await User.findOne({ id: userid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalCost = await Cost.aggregate([
      { $match: { userid: userid } },
      { $group: { _id: null, total: { $sum: "$sum" } } },
    ]);
    console.log("Total cost aggregation result:", totalCost);

    const total = totalCost.length > 0 ? totalCost[0].total : 0;

    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
