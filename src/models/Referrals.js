const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referrerName: {
      type: String,
      required: [true, "Referrer name is required"],
      trim: true,
    },
    referrerEmail: {
      type: String,
      required: [true, "Referrer email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    referrerPhone: {
      type: String,
      trim: true,
    },
    referredName: {
      type: String,
      required: [true, "Referred person name is required"],
      trim: true,
    },
    referredEmail: {
      type: String,
      required: [true, "Referred person email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    referredPhone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "A message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "converted", "rejected"],
      default: "pending",
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    program_referred: {
      type: String,
      required: true,
    },
    referral_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
