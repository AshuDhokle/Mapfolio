import React, { createContext, useState } from 'react';

export const CoordinatesContext = createContext();

export const CoordinatesProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState([ 12.9755264,77.6067902  ]); 

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
};
