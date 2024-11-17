import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { CoordinatesContext } from '../../../Context/coordinateContext';

const Map = () => {
  const [address, setAddress] = useState('Click on the map to set a marker!');
  const { coordinates, setCoordinates } = useContext(CoordinatesContext);

  return (
    <div className='m-2 z-0' style={{ width: '100%', height: '700px' }}> 
      <MapContainer
        center={coordinates}
        zoom={20}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={coordinates}>
          <Popup>{address}</Popup>
        </Marker>

        
        <RecenterMap coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

const RecenterMap = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, map.getZoom());
  }, [coordinates, map]);

  return null;
};

export default Map;
