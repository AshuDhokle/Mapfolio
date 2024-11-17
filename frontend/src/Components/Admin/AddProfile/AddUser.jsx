import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, location, description } = formData;

    // Validation
    if (!name || !location || !description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/admin/addUser", formData); 
      toast.success(response.data.message || "User added successfully!");
      setFormData({ name: "", image: "", location: "", description: "" }); 
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.response?.data?.message || "Failed to add user. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Profile</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Enter name" 
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500" 
            maxLength={50} 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input 
            type="text" 
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleInputChange} 
            placeholder="Enter image URL" 
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500" 
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-gray-500 mb-2 text-sm">Image Preview:</p>
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md border" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/150?text=Image+Not+Available";
                }}
              />
            </div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            placeholder="Enter location"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Enter description" 
            rows={4}
            maxLength={50} 
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Submitting..." : "Add Profile"}
        </button>
      </form>
    </div>
  );
};

export default AddProfile;
