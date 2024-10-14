import * as React from "react"
import React, { useState, useEffect } from "react"; 

const Gallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
  
    useEffect(() => {
      const savedImages = [
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
        'https://res.cloudinary.com/dlibdyano/image/upload/v1728796968/image_3.png',
      ];
      setImages(savedImages);
    }, []);
  
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="w-full">
            <img src={image} alt={`Thumbnail ${index}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    );
  };

export { Gallery }
