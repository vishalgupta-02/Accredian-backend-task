const Referral = require("../models/Referrals.js");
const { sendReferralEmail } = require("../utils/emailService.js");

// Create a new referral
const createReferral = async (req, res, next) => {
  try {
    const newReferral = new Referral(req.body);
    const savedReferral = await newReferral.save();

    // Send confirmation email
    await sendReferralEmail(savedReferral);

    res.status(201).json({
      success: true,
      data: savedReferral,
      message: "Referral created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all referrals
const getAllReferrals = async (req, res, next) => {
  try {
    const referrals = await Referral.find();
    res.status(200).json({
      success: true,
      count: referrals.length,
      data: referrals,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single referral by ID
const getReferralById = async (req, res, next) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      });
    }

    res.status(200).json({
      success: true,
      data: referral,
    });
  } catch (error) {
    next(error);
  }
};

// Update a referral
const updateReferral = async (req, res, next) => {
  try {
    const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      });
    }

    res.status(200).json({
      success: true,
      data: referral,
      message: "Referral updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a referral
const deleteReferral = async (req, res, next) => {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Referral deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
};
