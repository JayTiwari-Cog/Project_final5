import mongoose from "mongoose";
 
const HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: [true, 'Hotel name is required']
    },
   
    roomType: {
        type: [{
            type: String,
            enum: ["Single", "Double", "Deluxe","Twin", "Suite" ]
        }],
        required: [true, 'At least one room type is required'],
       
    },
    amenities: {
        type: [{
            type: String,
            enum: ['WiFi','Parking','Swimming Pool', 'Gym','Restaurant', ]
        }],
        required: [true, 'At least one amenity is required'],
       
    },
    address: {
     
        street: {
            type: String,
            required: [true, 'Street address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        postalCode: {
            type: String,
            required: [true, 'Postal code is required'],
            match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit postal code']
        }
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Price per night is required']
    },
     feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
}, { timestamps: true });
 
const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
 