/**
 * @module routes/about
 * @description Express router for the `/api/about` endpoint.
 */

const express = require('express');
const { aboutController } = require('../controllers/aboutController');

/**
 * Express router instance.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * GET /api/about
 *
 * Returns a JSON array of team members’ first and last names.
 *
 * @alias module:routes/about~aboutRoute
 * @function
 * @param {express.Request} req  - The incoming HTTP request.
 * @param {express.Response} res - The HTTP response, used to send JSON.
 * @returns {void}
 */
router.get('/', aboutController);

module.exports = router;
