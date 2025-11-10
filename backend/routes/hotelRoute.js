import { Router } from "express";
import { addHotel, getAllHotels, getHotelById, getHotelByLocation, getHotelByName } from "../controllers/HotelController.js";
import verify from "../middleware/verify_Token.js";

import passport from "passport"
import hotelValidator from "../validators/hotelValidator.js";

const hotel = Router();


hotel.get('/hotel',passport.authenticate('jwt', { session: false }),hotelValidator,getAllHotels);

hotel.get('/hotels/:city',verify,hotelValidator,getHotelByLocation);

hotel.post('/hotel',verify,hotelValidator,addHotel);

hotel.post('/hotelName',verify,hotelValidator,getHotelByName);

hotel.get('/hotel/:hotelId',verify,hotelValidator,getHotelById);

export default hotel;