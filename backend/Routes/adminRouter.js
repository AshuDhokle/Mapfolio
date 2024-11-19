import Express from "express";
import { AddUser, deleteUser, getAllUsers, getImage, updateUser } from "../Controllers/adminControllers.js";
import multer from 'multer'

const router = Express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage })

//Fetches all users
router.get("/getAllUsers", getAllUsers);

//Adds a new user
router.post("/addUser", upload.single('image'),AddUser);

//Updates an existing user by id
router.put("/updateUser/:id", updateUser);

//Deletes a user by id
router.delete("/deleteUser/:id", deleteUser); 

router.post("/getImage", getImage)
export default router;
