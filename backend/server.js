import app from "./app.js";
import {connectDb} from "./config/connectDb.js"
 import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDb();
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
