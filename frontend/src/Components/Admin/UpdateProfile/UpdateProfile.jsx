import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from "@mui/material";
import Axios from "axios";
import toast from "react-hot-toast";

const UpdateProfile = ({ open, handleClose, profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  // Sync formData with profile whenever profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        description: profile.description || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.put(
        `http://localhost:3000/admin/updateUser/${profile._id}`,
        formData
      );
      toast.success("User updated successfully!");
      handleClose(); // Close the dialog after successful update
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update User Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdate}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} require />
          <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth margin="normal" require />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfile;
