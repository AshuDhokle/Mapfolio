import Express from "express";
import { AddUser, deleteUser, getAllUsers, updateUser } from "../Controllers/adminControllers.js";

const router = Express.Router();

//Fetches all users
router.get("/getAllUsers", getAllUsers);

//Adds a new user
router.post("/addUser", AddUser);

//Updates an existing user by id
router.put("/updateUser/:id", updateUser);

//Deletes a user by id
router.delete("/deleteUser/:id", deleteUser); 

export default router;
