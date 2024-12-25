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
            return res.status(400).send({message: 'User already exists'})
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

const updateCurrentUser = async(req: Request, res: Response) => {
    try{
        //get email, auth0Id,name, address, city, state, zipCode, country from req.body
        //find user by auth0Id
        //update fields and save
        //return updated user object to frontend

        const {name, addressLine1, city, country} = req.body;
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).send({message: 'User not found'});
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.status(201).send(user)

    }catch(error){    
        console.error(error)
        res.status(500).send("Error while updating user!") 
    }
}

const getCurrentUser = async(req: Request, res: Response) => {
    //find user by auth0 id
    //return details of user to frontend

    try {
        const currentUser = await User.findById(req.userId);
    
        if(!currentUser){
            return res.status(404).json({message: 'User not found'});
        }
    
        return res.status(200).json(currentUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Something went wrong on server side!"});
    }

}

export { createUser, updateCurrentUser, getCurrentUser}