/**
 * @module models/User
 * @description Mongoose model for the User collection.
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} User
 * @property {number} id             - Unique user ID (required).
 * @property {string} first_name     - First name (required).
 * @property {string} last_name      - Last name (required).
 * @property {Date}   birthday       - Birth date (required).
 * @property {string} marital_status - One of "single", "married", "divorced", "widowed" (required).
 */

/**
 * Mongoose schema for User collection.
 * @type {mongoose.Schema<User>}
 */
const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  marital_status: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
