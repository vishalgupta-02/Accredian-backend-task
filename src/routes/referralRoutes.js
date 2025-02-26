const express = require("express");
const router = express.Router();
const {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
} = require("../controllers/referralController.js");
const {
  validateReferralInput,
  checkValidation,
} = require("../middlewares/validation.js");

// Routes
router.post("/", validateReferralInput, checkValidation, createReferral);
router.get("/", getAllReferrals);
router.get("/:id", getReferralById);
router.put("/:id", validateReferralInput, checkValidation, updateReferral);
router.delete("/:id", deleteReferral);

module.exports = router;
