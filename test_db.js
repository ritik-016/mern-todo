import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("SUCCESS");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR_MESSAGE:", err.message);
    if (err.reason) console.error("REASON:", err.reason.message || err.reason);
    process.exit(1);
  });
