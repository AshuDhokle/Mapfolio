import React, { useContext } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { CoordinatesContext } from '../../../Context/coordinateContext';
import Axios from 'axios';
const Profile = ({profile}) => {
  const {setCoordinates} = useContext(CoordinatesContext);
  const getCoordinates = async(location) =>{
    try {
      const response = await Axios.get(`https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=3bbf0c35949d4f12b399631ccc1c2cdf`);
      setCoordinates([response.data.features[0].properties.lat,response.data.features[0].properties.lon]); 
    } catch (error) {
      console.error("Someting went wrong", error);
    }
  }
  return (
    <div className='flex flex-row m-2 p-2 border-2'>
        
        <img src={profile.image} alt={profile.name} className='size-12 m-2'/>
        <div>
            <div className='flex flex-row items-center justify-between'>
            <h1 className='text-xl font-semibold'>{profile.name}</h1>
            <FaMapMarkerAlt className='text-red-500 size-6 cursor-pointer' onClick={()=>getCoordinates(profile.location)}/>
            </div>
            <p>{profile.description}</p>
        </div>
    </div>
  )
}

export default Profile