const mongoose = require("mongoose");
const PaymentSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", PaymentSchema);
