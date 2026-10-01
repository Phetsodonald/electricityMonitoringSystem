import {createAppliance, getAppliances, getAppliancesById, updateApplianceById, removeApplianceById} from "../models/appliancesModel.js";

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

        if(voltage <= 0 || current <= 0){
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


export const readAppliances = async (req, res) => {

    try {
        const {user_id} = req.query;

        if(!user_id){
            return res.status(400).json({
                message: "User ID is required."
            })
        }

        if(isNaN(user_id)){
            return res.status(400).json({
                message: "User ID must be a number."
            })
        }

        const appliances = await getAppliances(user_id); 
        return res.status(200).json({
            appliances
        })
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message: "Failed to get appliances."
        })
    }
}


export const readAppliancesById = async (req, res) => {

    try {
        const {user_id} = req.query;
        const {id} = req.params;

        if(!user_id || !id){
            return res.status(400).json({
                message: "User ID and id are required."
            })
        }

        if(isNaN(user_id) || isNaN(id)){
            return res.status(400).json({
                message: "User ID and appliance ID must be numbers."
            })
        }

        const appliance = await getAppliancesById(user_id, id);

        if(!appliance){
            return res.status(400).json({
                message: "Appliance not Found"
            })
        }
        return res.status(200).json({
            appliance
        }); 
    } catch (error) {
       console.error(error.message) 

       return res.status(500).json({
        message: "Failed to get appliance."
       })
    }
}

export const updatesApplianceById = async (req, res) => {

    try {

        const {user_id} = req.query;
        const {id} = req.params;
        const updates = req.body;

        if(!user_id || !id || !updates){
            return res.status(400).json({
                message: "User ID, appliance ID, and updates are required."
            })
        }

        if(isNaN(user_id) || isNaN(id)){
            return res.status(400).json({
                message: "User ID and appliance Id must be a number."
            })
        }

        if(typeof updates !== 'object' || Array.isArray(updates)){
            return res.status(400).json({
                message: "Updates must be of type object."
            })
        }

        const appliance = await updateApplianceById(user_id, id, updates);
        
        if(!appliance){
            return res.status(400).json({
                message: "Appliance not Found."
            })
        }
        
        return res.status(200).json({
            message: "Appliance updated successfully",
            appliance
        })
    } catch (error) {
        console.log(error.message);

        if(error.code === "23505"){
            return res.status(409).json({
                message: "This appliance name already exist for this user."
            })
        }

        return res.status(500).json({
            message: "Failed to update appliance."
        })
    }
}


export const deleteApplianceById = async (req, res) => {
    try {
        const {user_id} = req.query;
        const {id} = req.params;

        if(!user_id || !id){
            return res.status(400).json({
                message: "User ID and appliance ID are required."
            })
        }

        if(isNaN(user_id) || isNaN(id)){
            return res.status(400).json({
                message: "User ID and appliance ID must be a number."
            })
        }

        const appliance = await removeApplianceById(user_id, id);

        if(!appliance){
            return res.status(400).json({
                message: "Appliance not found."
            })
        }

        return res.status(200).json({
            message: "Appliance deleted successfully",
            appliance
        })

    } catch (error) {
        console.error(message.error);

        return res.status(500).json({
            message: "Failed to delete appliance."
        })
    }
}