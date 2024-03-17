const express = require("express");
const {
  contactUsController,
  contactDoctor,
} = require("../controllers/ContactUs");
const router = express.Router();

router.post("/reach/contact", contactUsController);
router.post("/consult-doctor", contactDoctor);

module.exports = router;
