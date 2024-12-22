import User from "../models/user.model";
import mongoose from "mongoose";
import { Request, Response } from "express";

const createUser = async(req: Request, res: Response) => {
    //1)Check if user exsists if yes return user already exists
    //2)Else create user 
    //3)Return user object to frontend
    try {
        
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id })

        if(existingUser){
            res.status(400).send({message: 'User already exists'})
        }

        const newUser = new User(req.body); 
        await newUser.save();

        res
        .status(201)
        .json({"User": newUser, "message": "User created successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).send("Something Went Wrong on server side!") 
    }
}

export { createUser}