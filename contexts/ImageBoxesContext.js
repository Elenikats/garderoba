import React from "react";
import { useState } from "react";

export const ImageBoxesContext = React.createContext();

export default function ImageBoxesProvider({ children }) {
  const [imagesBoxTop, setImagesBoxTop] = useState(null);
  const [imagesBoxBottom, setImagesBoxBottom] = useState(null);

  const value = {
    imagesBoxTop,
    setImagesBoxTop,
    imagesBoxBottom,
    setImagesBoxBottom,
  };

  return (
    <ImageBoxesContext.Provider value={value}>
      {children}
    </ImageBoxesContext.Provider>
  );
}
