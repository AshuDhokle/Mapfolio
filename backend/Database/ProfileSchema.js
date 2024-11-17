import mongoose from "mongoose"
const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: "profile-pic.png", // Default profile picture
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 500, // Limit description to 500 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set creation date
    },
    Admin:{
        type: Boolean,
        default:false,
    }
});

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);


