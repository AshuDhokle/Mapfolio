import React, { useEffect, useState } from "react";
import Profile from "./profile";
import { RiMenuUnfold3Line, RiMenuFold3Line } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Profiles = () => {
  const [open, setOpen] = useState(true); 
  const [profiles, setProfiles] = useState([]); 
  const [profilePerPage] = useState(4); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [loading, setLoading] = useState(false); 

  const numberOfPages = Math.ceil(profiles.length / profilePerPage); 

  const endIdx = currentPage * profilePerPage;
  const startIdx = endIdx - profilePerPage;
  const currProfiles = profiles.slice(startIdx, endIdx); 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:3000/admin/getAllUsers"); 
      setProfiles(response.data);
    } catch (error) {
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };

  return (
    <div className="relative flex flex-row items-center">
      <Toaster />
      <div
        className={`p-1 ${open ? 'w-72' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden border-2 sidebar`}
        style={{ height: "700px" }}
      >
        <div
          className="flex flex-col items-center justify-between"
          style={{ height: "660px" }}
        >
          {loading ? (
            <p>Loading profiles...</p>
          ) : currProfiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <ul className="p-1">
              {currProfiles.map((profile, idx) => (
                <Profile key={idx} profile={profile} />
              ))}
            </ul>
          )}
          {!loading && (
            <Pagination count={numberOfPages} page={currentPage} onChange={handlePageChange} color="primary" />
          )}
        </div>
      </div>
      {/* Toggle Button */}
      <div
        className="absolute top-1 left-1 z-10 cursor-pointer"
        onClick={() => setOpen((prevState) => !prevState)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '10px',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {open ? (
          <RiMenuFold3Line className="text-xl text-gray-600 z-10" />
        ) : (
          <RiMenuUnfold3Line className="text-xl text-gray-600 z-10" />
        )}
      </div>
    </div>
  );
};

export default Profiles;
