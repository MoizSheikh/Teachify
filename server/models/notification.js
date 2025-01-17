const mongoose = require("mongoose");
const NotificationSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    notif: {
      msg: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", NotificationSchema);
