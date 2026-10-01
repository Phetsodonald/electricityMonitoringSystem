import express from "express";
import {registerAppliance, readAppliances, readAppliancesById, updatesApplianceById, deleteApplianceById} from "../controllers/appliancesController.js";


const router = express.Router();

router.post("/", registerAppliance);
router.get("/", readAppliances);
router.get("/:id", readAppliancesById);
router.patch("/:id", updatesApplianceById);
router.delete("/:id", deleteApplianceById);

export default router;