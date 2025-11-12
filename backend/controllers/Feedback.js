import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const getBookingsForUser = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const bookings = await Booking.find({ userId })
      .populate('hotelId').populate('guests');
      
console.log(bookings);
    return res.status(200).json({
      user: user.toObject(),
      bookings
    });
  } catch (error) {
    console.error("Error in getBookingsForUser:", error);
    error.statusCode = 500;
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  const { userId, hotelName, rating, comment } = req.body;

  try {
   
    if (!userId || !hotelName || !rating || !comment) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // Find hotel by name
    const hotel = await Hotel.findOne({ hotelName });
    if (!hotel) {
      const error = new Error("Hotel not found");
      error.statusCode = 404;
      return next(error);
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
    error.statusCode = 500;
    next(error);
  }
};
