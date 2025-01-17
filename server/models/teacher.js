const mongoose = require("mongoose");
const TeacherSchema = mongoose.Schema(
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
    description: {
      type: String,
    },
    google_oauth_id: {
      type: String,
    },
    occupation: {
      type: [String],
    },

    skills: {
      type: [
        {
          skillname: {
            type: String,
          },
          experience: {
            type: String,
          },
        },
      ],
    },
    education: {
      type: [
        {
          edu_country: {
            type: String,
          },
          edu_college: {
            type: String,
          },
          edu_title: {
            type: String,
          },
          edu_year: {
            type: String,
          },
          edu_major: {
            type: String,
          },
        },
      ],
    },
    certification: {
      type: [
        {
          cert_name: {
            type: String,
          },
          cert_from: {
            type: String,
          },
          cert_year: {
            type: String,
          },
        },
      ],
    },
    personalLink: {
      type: String,
    },

    //for teacher Dashboard
    earning: {
      type: Number,
      default: 0,
    },
    classesId: { type: [mongoose.Schema.Types.ObjectId], ref: "Class" },
    response_rate: {
      type: Number,
      default: 0,
    },
    delivery_time: {
      type: Number,
      default: 0,
    },
    order_completion: {
      type: Number,
      default: 0,
    },
    orders: {
      type: Number,
      default: 0,
    },

    //for student only
    nickname: String,
    dob: String,
    gender: String,
    role: String,
    language: String,
    university: String,
    study: String,

    subjects: String,
    subject_names: [{ sub_name: String, sub_code: String }],
    billing_info: {
      type: {
        name: String,
        email: String,
      },
    },

    //General Metadata

    is_active: {
      type: Boolean,
      default: true,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    is_phone_verified: {
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
    cust_id: { type: String },
    is_payment_verified: {
      type: Boolean,
      default: false,
    },
    stripe_id: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", TeacherSchema);
