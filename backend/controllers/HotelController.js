import Hotel from "../models/Hotel.js";

 

export const getHotelByLocation = async(req,res)=>{
     
    const { city } = req.params;
    try {
        const hotels = await Hotel.find({ "address.city": city });
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 
export const getAllHotels = async (req, res) => {
  try {
    console.log("Before DB call");
    const hotels = await Hotel.find();
    console.log("After DB call", hotels);
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: error.message });
  }

};
// export const createGuest= async(req,res)=>{
//   const 
// }
export const addHotel= async(req,res)=>{
    try{
        const newHotel= await Hotel.create(req.body);
        console.log("New Hotel Created:", newHotel);
        return res.status(201).json({message: "Hotel added successfully", hotelId: newHotel._id});
    }
    catch(error){
        console.error("Error creating hotel:", error);
        return res.status(500).json({message: "Server error", error: error.message});
    }
}
export const getHotelByName= async(req,res)=>{
    const {hotelName}= req.body;
    try{
        const hotelDetails= await Hotel.findOne({hotelName: hotelName});
        if(!hotelDetails){
            return res.status(404).json({message: "Hotel not found"});
        }
        return res.status(200).json(hotelDetails.pricePerNight);

    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}

export const getHotelById= async(req,res)=>{
  console.log("Inside getHotelById controller");
    const hotelId= req.params.hotelId;
    console.log("Hotel ID:", hotelId);
    try{console.log(hotelId);
        const hotelDetails= await Hotel.findById(hotelId);
        console.log(hotelDetails);
        if(!hotelDetails){
            return res.status(404).json({message: "Hotel not found"});
        }
        
        
        return res.status(200).json( {hotelDetails: hotelDetails} );

    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}