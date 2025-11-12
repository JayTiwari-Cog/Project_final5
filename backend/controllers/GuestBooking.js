import express from "express";
import GuestSchema from "../models/GuestSchema.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import hotel from "../routes/hotelRoute.js";
import { validationResult } from 'express-validator';

  // adjust path as needed
  // adjust path as needed

export const createGuest = async (req, res, next) => {
    console.log("Inside createGuest");
    const { fullName, email, country, phone, guestDetails } = req.body;

    console.log("Guest details received:", { fullName, email, country, phone, guestDetails });

    try {
        const guestDetail = await GuestSchema.create({
            
            fullName,
            email,
            country,
            phone,
            guestDetails

        });

        return res.status(201).json({
            message: "Guest details added successfully",
            guestDetail
        });

    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            const duplicateError = new Error(`Guest with this ${duplicateField} already exists.`);
            duplicateError.statusCode = 409;
            duplicateError.field = duplicateField;
            duplicateError.value = error.keyValue[duplicateField];
            return next(duplicateError);
        }

        console.error("Error creating guest:", error);
        error.statusCode = 500;
        next(error);
    }
};


export const createBooking= async(req,res,next)=>{
    console.log("Inside createBooking");
    const {userId,hotelName,fullName,startDate,endDate}=req.body;

    console.log("Booking details received:", {userId,hotelName,fullName,startDate,endDate});

    try{
        if(!userId || !hotelName || !fullName || !startDate || !endDate){
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }
        let bookingtype;
        const user = await User.findById(userId);
        console.log(user._id);
        const hotelId = await Hotel.findOne({ hotelName: hotelName });
        console.log(hotelId._id);
        const guestId = await GuestSchema.findOne({ fullName: fullName });
        console.log(guestId._id);
        
        if(user.role== 'user'){
            bookingtype='online';
        }
        else if(user.role=='manager'){
            bookingtype='walk-in';
        }

        console.log(user.role);
         console.log(bookingtype);
          
        const newBooking = await Booking.create({
            userId: user._id,
            hotelId: hotelId._id,
            guests: guestId._id,
            bookingType: bookingtype,
            bookedBy: user.role,
            startDate,
            endDate,
            price: hotelId.pricePerNight,
            status: 'pending'
        });

        return res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
        
    }

    catch(error){
        error.statusCode = 500;
        next(error);
    }
}

export const getBookings= async(req,res,next)=>{
    try{
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const skip=(page-1)*limit;
        const returnbookings = await Booking.find().skip(skip).limit(limit).populate('userId').populate('hotelId').populate('guests').exec();

        const total = await Booking.countDocuments();

        const totalPages = Math.ceil(total / limit);


        res.status(200).json({
            bookings: returnbookings,
            pagination:{
                currentPage: page,
                totalPages,
            }
        
        }
        );
    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }
}

    export const updateBookingStatus = async (req, res, next) => {
        const  {bookingId}  = req.params;
         const { status } = req.body;
        console.log("Updating booking status:", bookingId, status);
        try{
            if(!bookingId){
                const error = new Error("Booking not found");
                error.statusCode = 404;
                return next(error);
            }
            await Booking.findByIdAndUpdate(bookingId, {$set: {status: status}});

            return res.status(200).json({message: "Booking status updated successfully"});

        }
        catch(error){
            error.statusCode = 500;
            next(error);
        }


    }

    export const createBookingByManager= async(req,res,next)=>{
        const {userId,hotelName,guests,startDate,endDate}=req.body;

        console.log("Booking by manager details received:", {userId,hotelName,guests,startDate,endDate});
        try{
            if(!userId || !hotelName || !guests || !startDate || !endDate){
                const error = new Error("All fields are required");
                error.statusCode = 400;
                return next(error);
            } 
             

            const guestByManager= await GuestSchema.create({
                fullName:guests.name,
                email:guests.email,
                country:"India",
                phone:guests.phone,
                guestDetails:{
                    adults:guests.guestDetails.numberOfPeople,
                    children:0,
                    rooms:guests.guestDetails.numberOfRooms
                }

            })

            const hotelId = await Hotel.findOne({ hotelName: hotelName });
            const guest= await GuestSchema.findOne({ fullName: guests.name });
            const bookingByManager= await Booking.create({
                userId,
                hotelId: hotelId._id,
                guests: guest._id,
                bookingType: 'walk-in',
                bookedBy: 'manager',
                startDate,
                endDate,
                price: hotelId.pricePerNight,
                status: 'confirmed'
            })

            return res.status(201).json({
                message: "Booking created successfully by manager",
                bookingByManager
            });

        }catch(error){
            console.error("Error creating guest by manager:", error);
            error.statusCode = 500;
            next(error);
        }
    }