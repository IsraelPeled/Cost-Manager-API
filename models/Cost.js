/**
 * @module models/Cost
 * @description Mongoose model for tracking individual cost entries.
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Cost
 * @property {string} description - Description of the cost item (required).
 * @property {string} category    - Category of the cost; one of "food", "health", "housing", "sport", "education" (required).
 * @property {number} userid       - ID of the user who incurred the cost (required).
 * @property {number} sum          - Amount of the cost (required, min: 0).
 * @property {Date}   date         - Date when the cost was created; defaults to now.
 */

/**
 * Mongoose schema for Cost collection.
 * @type {mongoose.Schema<Cost>}
 */
const costSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["food", "health", "housing", "sport", "education"],
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cost", costSchema);
