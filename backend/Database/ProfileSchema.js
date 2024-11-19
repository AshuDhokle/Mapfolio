import mongoose from "mongoose"

const imageSchema = mongoose.Schema({
    path:{type:String, required:true},
    filename:{type:String, required:true}
})

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: imageSchema,
        default: {
            path: "/images/default/profile-pic.png",
            filename: "profile-pic.png",
        },
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


