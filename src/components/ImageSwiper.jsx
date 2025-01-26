import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample image array (replace with your actual data)
const images = [
  { src: '/api/placeholder/400/300' },
  { src: '/api/placeholder/400/300?1' },
  { src: '/api/placeholder/400/300?2' },
  { src: '/api/placeholder/400/300?3' },
];

const ImageSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [dragging, setDragging] = useState(false);

  const handleSwipe = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev < images.length - 1 ? prev + 1 : 0;
      } else {
        return prev > 0 ? prev - 1 : images.length - 1;
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Image container with swipe animations */}
      <motion.div
        key={currentIndex}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={(event, info) => {
          setDragging(false);
          if (info.offset.x > 100) {
            handleSwipe(-1); // Swipe left
          } else if (info.offset.x < -100) {
            handleSwipe(1); // Swipe right
          }
        }}
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-4 cursor-grab active:cursor-grabbing"
      >
        <img
          src={images[currentIndex].src}
          alt="Swipeable"
          className="w-96 h-72 object-cover rounded-lg shadow-md"
        />
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => handleSwipe(-1)}
          disabled={dragging}
          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <X size={24} />
        </button>
        <button
          onClick={() => handleSwipe(1)}
          disabled={dragging}
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageSwiper;
