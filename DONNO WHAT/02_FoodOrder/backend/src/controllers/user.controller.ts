import User from "../models/user.model";
import mongoose from "mongoose";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ User: newUser, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong on server side!");
  }
};

const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating user!");
  }
};

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on server side!" });
  }
};

export { createUser, updateCurrentUser, getCurrentUser };
