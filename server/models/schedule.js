const mongoose = require("mongoose");
const ScheduleSchema = mongoose.Schema(
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
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    date: {
      type: String,
    },
    start_time: String,
    end_time: String,
    meeting_link: String,
    status: String,
    timing: {
      type: [
        {
          date: String,
          time: String,
        },
      ],
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
