import express from "express";
import {registerAppliance} from "../controllers/appliancesController.js";


const router = express.Router();

router.post("/", registerAppliance);

export default router;