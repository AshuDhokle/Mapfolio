import { UserProfile } from "../Database/ProfileSchema.js";

// Fetches all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Adds a new user
export const AddUser = async (req, res) => {
  try {
    const { name, image, location, description } = req.body;

    const newUser = new UserProfile({
      name,
      image,
      location,
      description,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};

//Updates the existing User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await UserProfile.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Deletes a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserProfile.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
