import {createAppliance} from "../models/appliancesModel.js";

export const registerAppliance = async (req, res) => {
    try {
        const {user_id, name, voltage, current} = req.body;

        if(!user_id || !name || !voltage || !current){
            return res.status(400).json({
                message: "User ID, name, voltage, and current are required."
            })
        }

        if(isNaN(voltage) || isNaN(current)){
            return res.status(400).json({
                message: "Voltage and current must be numbers."
            })
        }

        if(current <= 0 || current <= 0){
            return res.status(400).json({
                message: "Voltage and current must be greater than 0."
            })
        }

        const appliance = await createAppliance(user_id, name, voltage, current);

        res.status(201).json({
            message: "Appliance created successfully.",
            appliance
        })
    } catch (error) {
        console.error(error.message);

        if(error.code === "23505"){
            return res.status(409).json({
                message: "This appliance name already exists for this user."
            })
        }

        res.status(500).json({
            message: "Failed to create appliance."
        })
    }
}