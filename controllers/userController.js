const User = require("../models/User");
const Cost = require("../models/Cost");

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
