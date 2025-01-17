const mongoose = require("mongoose");
const ClassSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    title: {
      type: String,
      maxlength: 100,
      required: true,
    },
    category: {
      type: String,
      maxlength: 100,
      required: true,
    },
    subCategory: {
      type: String,
      maxlength: 100,
      required: true,
    },
    searchTags: {
      type: [String],
    },

    description: {
      type: String,
      // minlength: 90,
      required: true,
    },
    noOfClasses: Number,
    standard: {
      type: {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        delivery: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    },
    premium: {
      type: {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        delivery: {
          type: String,
        },

        price: {
          type: Number,
        },
      },
    },

    imgs: {
      type: [String],
    },

    rating: {
      type: [
        {
          student_id: String,
          rate: Number,
          message: String,
        },
      ],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Class", ClassSchema);
