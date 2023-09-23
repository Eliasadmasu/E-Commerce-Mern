import express from "express";
import "dotenv/config";
import connectToDatabase from "./config/db.js";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes/UserRoute.js";
import { productRouter } from "./routes/ProductRoute.js";

const app = express();

//mongodb connection
connectToDatabase();

// Middleware for JSON parsing
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from localhost:3000
  credentials: true, // Enable CORS credentials (e.g., cookies)
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};

// Middleware for handling CORS
app.use(cors(corsOptions));

// Helmet for security headers
app.use(helmet());

app.use(express.static("public"));

app.use("/api", router);
//product
app.use("/product", productRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Started On Port Number: ${PORT}`);
});
