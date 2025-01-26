import React, { useState } from 'react';
import { X, Check, Briefcase, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const candidates = [
  {
    id: 1,
    skills: ['React', 'Node.js', 'AWS', 'Microservices'],
    experience: '6 years',
    expertise: 'Software Engineering',
    technicalSkills: ['Backend', 'Cloud Architecture', 'System Design']
  },
  {
    id: 2,
    skills: ['Agile', 'Product Strategy', 'UX Research', 'Market Analysis'],
    experience: '4 years',
    expertise: 'Product Management',
    technicalSkills: ['Roadmapping', 'Customer Insights', 'Prototyping']
  },
  {
    id: 3,
    skills: ['Machine Learning', 'Python', 'Data Visualization', 'Statistical Analysis'],
    experience: '5 years',
    expertise: 'Data Science',
    technicalSkills: ['Predictive Modeling', 'Deep Learning', 'Big Data']
  },
  {
    id: 4,
    skills: ['UI/UX', 'Interaction Design', 'Design Systems', 'Accessibility'],
    experience: '3 years',
    expertise: 'UX Design',
    technicalSkills: ['Figma', 'Prototyping', 'User Research']
  }
];

const EmployeeSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [likedCandidates, setLikedCandidates] = useState([]);
  const [passedCandidates, setPassedCandidates] = useState([]);

  const handleSwipe = (action) => {
    const currentCandidate = candidates[currentIndex];
    
    if (action === 'like') {
      setLikedCandidates(prev => [...prev, currentCandidate]);
    } else {
      setPassedCandidates(prev => [...prev, currentCandidate]);
    }

    setDirection(action === 'like' ? 1 : -1);
    setCurrentIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : 0));
  };

  const renderCandidateDetails = (candidate) => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-400" fill="currentColor" size={20} />
          <span className="font-semibold">{candidate.experience}</span>
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {candidate.expertise}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Core Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span 
              key={skill} 
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-2">Technical Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.technicalSkills.map((skill) => (
            <span 
              key={skill} 
              className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Briefcase size={24} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Hire Me, Maybe</h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-green-600 font-bold">{likedCandidates.length}</span>
            <span className="text-xs text-gray-600">Liked</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-600 font-bold">{passedCandidates.length}</span>
            <span className="text-xs text-gray-600">Passed</span>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center p-4">
        {candidates.length > 0 ? (
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={(event, info) => {
              setDragging(false);
              if (info.offset.x > 100) {
                handleSwipe('pass');
              } else if (info.offset.x < -100) {
                handleSwipe('like');
              }
            }}
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-96"
          >
            {renderCandidateDetails(candidates[currentIndex])}
          </motion.div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-2xl">No more candidates</p>
          </div>
        )}
      </div>

      <div className="pb-8 flex justify-center space-x-8">
        <button
          onClick={() => handleSwipe('pass')}
          disabled={dragging}
          className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
        >
          <X size={32} />
        </button>
        <button
          onClick={() => handleSwipe('like')}
          disabled={dragging}
          className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
        >
          <Check size={32} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeSwiper;