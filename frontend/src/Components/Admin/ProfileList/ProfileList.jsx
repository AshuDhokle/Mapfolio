import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Profile from "./Profile";

const ProfileList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7); 

  const numberOfPages = Math.ceil(users.length / usersPerPage);
  
  const endIdx = currentPage * usersPerPage;
  const startIdx = endIdx - usersPerPage;
  const currentUsers = users.slice(startIdx, endIdx);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/admin/getAllUsers"); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Profiles</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div>
            {
              currentUsers.map((user,idx)=>(
                <Profile profile={user} key={idx}/>
              ))
            }
          </div> 
      
          <Pagination count={numberOfPages} page={currentPage} onChange={handlePageChange} color="primary" sx={{m:2}}
          />
        </>
      )}
    </div>
  );
};

export default ProfileList;
