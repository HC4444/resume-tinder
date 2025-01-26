import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

// Sample image array (replace with your actual images)
const images = [
  '/api/placeholder/400/300',
  '/api/placeholder/400/300?1',
  '/api/placeholder/400/300?2',
  '/api/placeholder/400/300?3'
];

const ImageSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNo = () => {
    setCurrentIndex((prev) => 
      prev > 0 ? prev - 1 : images.length - 1
    );
  };

  const handleYes = () => {
    setCurrentIndex((prev) => 
      prev < images.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <img 
          src={images[currentIndex]} 
          alt="Swipeable" 
          className="w-96 h-72 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex gap-4">
        <button 
          onClick={handleNo} 
          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
        >
          <X size={24} />
        </button>
        <button 
          onClick={handleYes} 
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageSwiper;