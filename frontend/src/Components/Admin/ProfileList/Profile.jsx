import React, { useState } from 'react';
import { Button } from '@mui/material';
import { IoLocationSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from 'axios';
import DeleteUser from '../DeleteUser/DeleteUser';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
const Profile = ({ profile }) => {
  const [openUpdate, setOpenUpdate] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false);

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await Axios.delete(`http://localhost:3000/admin/deleteUser/${profile._id}`);
      toast.success(response.data.message || "User deleted successfully!");
      window.location.reload(true); 
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
      <img
        src={profile.image}
        alt={profile.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800">{profile.name}</h1>
        <p className="text-sm text-gray-600">{profile.description}</p>
        <span className="text-sm text-gray-500 flex flex-row items-center">
          <IoLocationSharp className="m-1 size-6 text-red-500" /> <p>{profile.location}</p>
        </span>

        <div className="mt-4 flex space-x-4">
          <Button variant="outlined" color="primary" onClick={() => setOpenUpdate(true)}
            className="hover:bg-blue-100"
          >
            Update 
          </Button>
          <Button variant="outlined" color="secondary" onClick={()=>setOpenDelete(true)}
            className="hover:bg-red-100"
          > 
           Delete 
          </Button>
        </div>
      </div>
      
      <UpdateProfile open={openUpdate} handleClose={() => setOpenUpdate(false)} profile={profile} />
      <DeleteUser open={openDelete} handleClose={() => setOpenDelete(false)} profile={profile}
      />
    </div>
  );
};

export default Profile;
