import mongoose from 'mongoose';
 
const guestSchema = new mongoose.Schema({
  
  fullName: { 
    type: String, 
    required: true 
  },
   
  email: {
    type: String,
    required: true,
     
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  guestDetails: {
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    rooms: { type: Number, required: true }
  }
});
 
const Guest = mongoose.model('GuestSchema', guestSchema);
export default Guest;