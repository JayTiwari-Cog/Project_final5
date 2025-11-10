import express from "express";
import dotenv from "dotenv";
import routes from "./routes/userRoute.js";
import passport from "passport";
import cors from "cors";
import hotel from "./routes/hotelRoute.js";
import guest from "./routes/guestRoute.js";
import feedback from "./routes/feedbackRoute.js";
import booking from "./routes/BookingRoute.js";
import down from "./routes/Invoice_download.js";
// import down from "./routes/fileDown.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
}));
app.use(passport.initialize());
app.use("/api",routes);


app.use('/api',hotel);
app.use('/api',guest);
app.use('/api',feedback);
app.use('/api',booking);
app.use('/file',down);



export default app;