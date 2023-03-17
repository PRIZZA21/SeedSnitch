const express = require("express");
const router = express.Router();
const { createIncubator, getAllIncubators } = require("../controllers/Incubator_Controllers");

router.get("/", getAllIncubators);
router.post("/create", createIncubator);


module.exports = router;
