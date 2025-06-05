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
 * @param {import("express").Request} req  - Express request object.
 * @param {import("express").Response} res - Express response object; sends JSON array.
 * @returns {void}
 */
exports.aboutController = (req, res) => {
  res.json([{ first_name: "Israel", last_name: "Peled" },
                  { first_name: "Shira",  last_name: "Shani" }]);
};
