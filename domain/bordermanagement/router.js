const express = require('express');
const router = express.Router();

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Introduction screen to application
 *     produces:
 *       - application/json
 *     parameters:
 *       - none
 *     responses:
 *       200:
 *         description: rootPage
 */
router.get("/", (req, res) => {
    return res.send("Welcome to the Border service");
});

module.exports = router;