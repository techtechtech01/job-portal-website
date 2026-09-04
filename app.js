import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.routes.js";
import companyRoutes from "./routes/Company.routes.js";
import jobRoutes from "./routes/Job.routes.js";
import applicationRoutes from "./routes/Application.routes.js";
import cors from "cors";

const app = express();

app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));




app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);


export default app;