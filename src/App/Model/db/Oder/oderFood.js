const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    reservationTime: {
      type: String, // Có thể sử dụng String để lưu thời gian dưới dạng "HH:MM"
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1, // Ít nhất 1 người
    },
    notes: {
      type: String,
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending", // Trạng thái mặc định là "pending"
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model("Order", OrderSchema);