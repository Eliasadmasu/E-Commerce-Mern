import express from "express";
import "dotenv/config";
import connectToDatabase from "./config/db.js";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes/UserRoute.js";
import { productRouter } from "./routes/ProductRoute.js";
import { CartRouter } from "./routes/ShoppingCartRoute.js";
import { DashboardRouter } from "./routes/dashboardstatRoute.js";
import { ProfileRouter } from "./routes/profileRoute.js";

const app = express();

//mongodb connection
connectToDatabase();

// Middleware for JSON parsing
app.use(express.json());

const corsOptions = {
  origin: "https://e-commerce-mern-8qowaxlws-eliasadmasu.vercel.app", // Allow requests from localhost:3000
  credentials: true, // Enable CORS credentials (e.g., cookies)
};

// Middleware for handling CORS
app.use(cors(corsOptions));

// Helmet for security headers
app.use(helmet());

app.use(
  "/public",
  express.static("public", {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api", router);
//product
app.use("/product", productRouter);
//cart
app.use("/cart", CartRouter);

//cart
app.use("/dashboard", DashboardRouter);

//user
app.use("/user", ProfileRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Started On Port Number: ${PORT}`);
});
