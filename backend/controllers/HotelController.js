import Hotel from "../models/Hotel.js";

 

// export const getHotelByLocation = async(req,res)=>{
     
//     const { city } = req.params;
//     try {
//         const hotels = await Hotel.find({ "address.city": city });
//         res.status(200).json(hotels);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
 
export const getAllHotels = async (req, res, next) => {
  try {
    console.log("Before DB call");
    
    // Get pagination parameters from query string
    const page = parseInt(req.query.page) ;
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const total = await Hotel.countDocuments();
    
    // Fetch hotels with pagination
    const hotels = await Hotel.find()
      .skip(skip)
      .limit(limit)
      .exec();
    
    console.log("After DB call", hotels);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    
    res.status(200).json({
      hotels,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    error.statusCode = 500;
    next(error);
  }
};
// export const createGuest= async(req,res)=>{
//   const 
// }
export const addHotel= async(req,res,next)=>{
    try{
        const newHotel= await Hotel.create(req.body);
        console.log("New Hotel Created:", newHotel);
        return res.status(201).json({message: "Hotel added successfully", hotelId: newHotel._id});
    }
    catch(error){
        console.error("Error creating hotel:", error);
        error.statusCode = 500;
        next(error);
    }
}
export const getHotelByName= async(req,res,next)=>{
    const {hotelName}= req.body;
    try{
        const hotelDetails= await Hotel.findOne({hotelName: hotelName});
        if(!hotelDetails){
            const error = new Error("Hotel not found");
            error.statusCode = 404;
            return next(error);
        }
        return res.status(200).json(hotelDetails.pricePerNight);

    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }
}

export const getHotelById= async(req,res,next)=>{
  console.log("Inside getHotelById controller");
    const hotelId= req.params.hotelId;
    console.log("Hotel ID:", hotelId);
    try{console.log(hotelId);
        const hotelDetails= await Hotel.findById(hotelId);
        console.log(hotelDetails);
        if(!hotelDetails){
            const error = new Error("Hotel not found");
            error.statusCode = 404;
            return next(error);
        }
        
        
        return res.status(200).json( {hotelDetails: hotelDetails} );

    }
    catch(error){
        error.statusCode = 500;
        next(error);
    }
}