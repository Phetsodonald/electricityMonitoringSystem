import { createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        if(!email.includes("@")){
            return res.status(400).json({
                message: "Invalid email address."
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword);

        res.status(201).json({
            message: "User created successfully.",
            user
        });
    } catch (error) {
        console.error(error.message);

        if(error.code === "23505"){
            return res.status(409).json({
                message: "Email already exists."
            })
        }
        res.status(500).json({
            message: "Failed to create user."
        })
    }
}