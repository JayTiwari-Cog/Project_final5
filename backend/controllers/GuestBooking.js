import express from "express";
import GuestSchema from "../models/GuestSchema.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import hotel from "../routes/hotelRoute.js";
import { validationResult } from 'express-validator';

  // adjust path as needed
  // adjust path as needed

export const createGuest = async (req, res) => {
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
            return res.status(409).json({
                message: `Guest with this ${duplicateField} already exists.`,
                field: duplicateField,
                value: error.keyValue[duplicateField]
            });
        }

        console.error("Error creating guest:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const createBooking= async(req,res)=>{
    console.log("Inside createBooking");
    const {userId,hotelName,fullName,startDate,endDate}=req.body;

    console.log("Booking details received:", {userId,hotelName,fullName,startDate,endDate});

    try{
        if(!userId || !hotelName || !fullName || !startDate || !endDate){
            return res.status(400).json({message: "All fields are required"});
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
        return res.status(500).json({message: "Server error"});
    }
}

export const getBookings= async(req,res)=>{

 const returnbookings = await Booking.find().populate('userId').populate('hotelId').populate('guests');

 res.status(200).json({bookings: returnbookings});
       
    }

    export const updateBookingStatus = async (req, res) => {
        const  {bookingId}  = req.params;
         const { status } = req.body;
        console.log("Updating booking status:", bookingId, status);
        try{
            if(!bookingId){
                return res.status(404).json({message: "Booking not found"});
            }
            await Booking.findByIdAndUpdate(bookingId, {$set: {status: status}});

            return res.status(200).json({message: "Booking status updated successfully"});

        }
        catch(error){
            return res.status(500).json({message: "Server error"});
        }


    }

    export const createBookingByManager= async(req,res)=>{
        const {userId,hotelName,guests,startDate,endDate}=req.body;

        console.log("Booking by manager details received:", {userId,hotelName,guests,startDate,endDate});
        try{
            if(!userId || !hotelName || !guests || !startDate || !endDate){
                return res.status(400).json({message: "All fields are required"});
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
            return res.status(500).json({message: "Server error"});
        }
    }