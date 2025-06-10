/**
 * @module controllers/aboutController
 * @description Controller for the GET /api/about endpoint.
 *              Returns a JSON array of team members’ first and last names.
 */

const express = require('express');

/**
 * GET /api/about
 * Returns a JSON array of team members’ first and last names.
 *
 * Example response (status 200):
 * [
 *   { first_name: "Israel", last_name: "Peled" }
 * ]
 *
 * @function aboutController
 * @param {express.Request} req  - Express request object.
 * @param {express.Response} res - Express response object; sends JSON array.
 * @returns {void}
 */
exports.aboutController = (req, res) => {
  res.json([
    { first_name: "Israel", last_name: "Peled" },
    { first_name: "Shira", last_name: "Shani" },
  ]);
};
