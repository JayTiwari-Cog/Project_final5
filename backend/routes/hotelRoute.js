import { Router } from "express";
import { addHotel, getAllHotels, getHotelById, getHotelByLocation, getHotelByName } from "../controllers/HotelController.js";

const hotel = Router();


hotel.get('/hotel',getAllHotels);

hotel.get('/hotels/:city',getHotelByLocation);

hotel.post('/hotel',addHotel);

hotel.post('/hotelName',getHotelByName);

hotel.get('/hotel/:hotelId',getHotelById);

export default hotel;