const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      maxlength: 100,
    },
    last_name: {
      type: String,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 8,
    },
    password2: {
      type: String,
    },
    img: {
      type: String,
    },
    dob: String,
    gender: String,
    language: String,
    university: String,
    study: String,
    start_date: String,
    end_date: String,
    edu_level: String,

    is_active: {
      type: Boolean,
      default: true,
    },

    is_email_verified: {
      type: Boolean,
      default: false,
    },

    is_profile_completed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", StudentSchema);
