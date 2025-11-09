import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const getBookingsForUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookings = await Booking.find({ userId })
      .populate('hotelId').populate('guests');
      
console.log(bookings);
    return res.status(200).json({
      user: user.toObject(),
      bookings
    });
  } catch (error) {
    console.error("Error in getBookingsForUser:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createFeedback = async (req, res) => {
  const { userId, hotelName, rating, comment } = req.body;

  try {
   
    if (!userId || !hotelName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find hotel by name
    const hotel = await Hotel.findOne({ hotelName });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    
    const feedback = await Feedback.create({
      userId,
      hotelId: hotel._id,
      rating,
      comment
    });

     
    await Hotel.findByIdAndUpdate(hotel._id, {
      $push: { feedbacks: feedback._id }
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
