const express = require("express");
const router = express.Router();

//Declare any routes here.
const financeRouter = require("./routes/department_routes.js");
const billRouter = require("./routes/bill_routes");

router.use("/finance", financeRouter);
router.use("/bill", billRouter);

router.use((error, req, res, next) => {
  res.status(error.header || 500).send({
    message: error.message,
    code: error.code,
    name: error.name,
    status: error.status
  }).end();
});

//Catching all other requests
router.use("*", (req, res) => {
  res
    .status(404)
    .send({
      message: "404 not found | Financial Management"
    })
    .end();
});

module.exports = router;
