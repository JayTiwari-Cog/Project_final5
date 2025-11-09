import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Hotel from '../models/Hotel.js';
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const down = Router();
const upload = multer();

export const downloadFile =  async (req, res) => {
  try {
    const { hotelName, bookingDate, guestName, rooms } = req.body;

    const pricePerRoom = await Hotel.findOne({ hotelName: hotelName });
   console.log(pricePerRoom);
    const price = pricePerRoom.pricePerNight * parseInt(rooms);

    const invoiceText = `
Hotel Booking Invoice
----------------------
Hotel Name: ${hotelName}
Booking Date: ${bookingDate}
Guest Name: ${guestName}
Rooms: ${rooms}
Price: ${price}
----------------------
Thank you for choosing our hotel!
`;

    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileName = `invoice_${timestamp}.txt`;
    const filePath = path.join(__dirname, fileName);
    
    fs.writeFileSync(filePath, invoiceText);

     
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading file');
      } else {
        console.log('File sent for download');
        // Clean up the file after download
        setTimeout(() => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }, 5000);
      }
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ error: 'Failed to generate invoice' });
  }
};