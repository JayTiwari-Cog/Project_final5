import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   price: { type: Number, required: true }
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// export default Booking;

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "GuestSchema" }], // updated ref name
  bookingType: {
    type: String,
    enum: ["online", "walk-in"],
    default: "online"
  },
  bookedBy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
});
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
