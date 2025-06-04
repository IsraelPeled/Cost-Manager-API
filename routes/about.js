const express = require("express");
const { aboutController } = require("../controllers/aboutController");

const router = express.Router();

/**
 * @route GET /api/about
 * @desc Returns a JSON array of team members’ first and last names.
 * @returns {Array<{ first_name: string, last_name: string }>}
 */
router.get("/", aboutController);

module.exports = router;
