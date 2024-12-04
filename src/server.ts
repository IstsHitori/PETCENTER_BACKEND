import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import veterinaryRoutes from "./routes/VeterinaryRoutes";
import patientRoutes from "./routes/patientRoutes";
import historiesRoutes from "./routes/historiesRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productsRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";
//Para utilizar variables de entorno
dotenv.config();
//Conectarse a la base de datos
connectDB();
const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/veterinaries", veterinaryRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/histories", historiesRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product",productRoutes );
export default app;
