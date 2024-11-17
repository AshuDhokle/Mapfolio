import React, { useState } from 'react'
import {Tabs,Tab} from '@mui/material'
import ProfileList from './ProfileList/ProfileList'
import AddProfile from './AddProfile/AddUser'
const Admin = () => {
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Profiles"  />
        <Tab label="Add Profile"  />
      </Tabs>
      {
        value == 0 && <ProfileList/> 
      }
      {
        value == 1 && <AddProfile />
      }
      
    </div>
  )
}

export default Admin