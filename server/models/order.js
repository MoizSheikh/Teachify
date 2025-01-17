const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    class_subtype: String,
    due_date: {
      type: String,
    },
    note: String,
    total_price: Number,
    noOfClasses: Number,
    status: String,

    is_active: {
      type: Boolean,
      default: true,
    },
    is_rated: {
      type: Boolean,
      default: false,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    is_completed_teacher: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
