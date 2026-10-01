import express from "express";
import userRoutes from "./routes/userRoutes.js";
import appliancesRoutes from "./routes/appliancesRoutes.js"
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/appliances", appliancesRoutes);

export default app;