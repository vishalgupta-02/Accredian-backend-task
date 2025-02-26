const { validationResult, check } = require("express-validator");

// Validate referral data
const validateReferralInput = [
  check("referrerName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Referrer name is required"),
  check("referrerEmail")
    .trim()
    .isEmail()
    .withMessage("A valid referrer email is required"),
  check("referredName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Referred person name is required"),
  check("referredEmail")
    .trim()
    .isEmail()
    .withMessage("A valid referred person email is required"),
  check("message")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Message must be between 10 and 500 characters"),
];

// Middleware to handle validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  validateReferralInput,
  checkValidation,
};
