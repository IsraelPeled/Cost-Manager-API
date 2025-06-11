/**
 * @module routes/users
 * @description Express router for user-related API endpoints.
 */

const express = require("express");
const { getUser } = require("../controllers/userController");

/**
 * Express Router for `/api/users/:id`.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * @route GET /api/users/:id
 * @description
 * Retrieves details of a user by ID and returns JSON:
 *   {
 *     first_name: string,
 *     last_name: string,
 *     id: number,
 *     total: number
 *   }
 *
 * URL parameter (`req.params`):
 *   - id {string|number} (required)
 *
 * Responses:
 *   • 200 OK: Returns JSON with user info and total cost.
 *   • 404 Not Found: If user does not exist.
 *   • 500 Server Error: If database aggregation/query fails.
 *
 * @param {express.Request} req  - Express request object (with `req.params.id`).
 * @param {express.Response} res - Express response object.
 * @returns {Promise<void>}
 */
router.get("/users/:id", getUser);

module.exports = router;
