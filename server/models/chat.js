const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    sender: String,
    msg: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", ChatSchema);
