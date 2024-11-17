import React, { useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Typography} from "@mui/material";
import Axios from "axios";
import toast from "react-hot-toast";

const DeleteUser = ({ open, handleClose, profile }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await Axios.delete(
        `http://localhost:3000/admin/deleteUser/${profile._id}`
      );
      toast.success(response.data.message || "User deleted successfully!");
      handleClose(); 
      window.location.reload(true); 
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{profile.name}</strong>?
          <br />
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" disabled={loading} variant="contained"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
