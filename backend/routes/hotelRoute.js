import { Router } from "express";
import { addHotel, getAllHotels, getHotelById, getHotelByName} from "../controllers/HotelController.js";
 

import passport from "passport"
import hotelValidator from "../validators/hotelValidator.js";
import checkBlacklist from "../middleware/blacklisting_token.js";
import verifyTokenWithRole from "../middleware/verifyWithRole.js";

const hotel = Router();


hotel.get('/hotel',passport.authenticate('jwt', { session: false }),hotelValidator,checkBlacklist,getAllHotels);

hotel.post('/hotel',passport.authenticate('jwt', { session: false }),hotelValidator,verifyTokenWithRole(['manager']),addHotel);
hotel.post('/hotelName',passport.authenticate('jwt', { session: false }),verifyTokenWithRole(['user']),getHotelByName);
hotel.get('/hotel/:hotelId',passport.authenticate('jwt', { session: false }),hotelValidator,verifyTokenWithRole(['user']),getHotelById);
export default hotel;