import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import userService from '../../services/userService.js';


const CategoryCarousel = () => {
  const carouselRef = useRef(null);
  const [categories,setCategories]=useState([]);

  useEffect(()=>{
    const fetchCategories = async()=>{
      const response = await userService.getCategories();
      setCategories(response.categories);
    }
    fetchCategories();
  },[])

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-32 p-2">
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
      >
        <FaArrowRight />
      </button>
      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-hidden px-4"
      >
        {categories.map((category) => (
          <motion.div
            animate={{ x: [300, 0] }}
            transition={{ duration: 2 }}
            key={category._id}
            className="w-48 flex-shrink-0 bg-white rounded-lg"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="text-center text-lg font-semibold mt-2">
              {category.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
