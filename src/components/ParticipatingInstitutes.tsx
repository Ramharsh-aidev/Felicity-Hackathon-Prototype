import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Institute data including name and logo path
const institutes = [
  {
    name: "IIT KHARAGPUR",
    logo: "/lovable-uploads/31763632-6c32-46c0-b30a-51e375dab974.png"
  },
  {
    name: "IIT MADRAS",
    logo: "/lovable-uploads/ca72a90a-7310-4337-8413-d3eb31252382.png"
  },
  {
    name: "IIT KHARAGPUR",
    logo: "/lovable-uploads/ed962566-9e08-4274-9fd0-5e9124816423.png"
  },
  {
    name: "IIT INDORE",
    logo: "/lovable-uploads/206e2869-c301-4ff7-b558-ffb5c347bd81.png"
  },
  {
    name: "IIT DELHI",
    logo: "/lovable-uploads/ab1c5304-5527-4faa-8caf-6243faa42842.png"
  },
  {
    name: "IIT ROORKEE",
    logo: "/lovable-uploads/cdafe051-425d-4494-a8f3-379a7d73181f.png"
  },
  {
    name: "IIT GUWAHATI",
    logo: "/lovable-uploads/c1c60a46-9df6-4847-87c0-5d7a3f637ec3.png"
  },
  {
    name: "IIT BOMBAY",
    logo: "https://www.iitr.ac.in/institute/imagesandfiles/posts/iit-bombay-logo-400x400.jpg"
  },
  {
    name: "IIT KANPUR",
    logo: "https://www.iitk.ac.in/new/images/article-banners/IIT_Kanpur_Logo.jpg"
  },
  {
    name: "IIT HYDERABAD",
    logo: "https://www.iith.ac.in/assets/images/logo.png"
  },
  {
    name: "AMRITA VISHWA VIDYAPEETHAM",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Amrita-vishwa-vidyapeetham-color-logo.svg/1200px-Amrita-vishwa-vidyapeetham-color-logo.svg.png"
  },
  {
    name: "DAYALBAGH EDUCATIONAL INSTITUTE",
    logo: "https://www.dei.ac.in/dei/images/dei-logo.png"
  },
  {
    name: "IIT MANDI",
    logo: "https://www.iitmandi.ac.in/institute/images/logomaster1.png"
  }
];

const ParticipatingInstitutes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 5;
  const totalItems = institutes.length;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (totalItems - maxVisibleItems + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - maxVisibleItems : prevIndex - 1
    );
  };

  // Auto-scroll the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get current visible institutes
  const visibleInstitutes = [];
  for (let i = 0; i < maxVisibleItems; i++) {
    const index = (currentIndex + i) % totalItems;
    visibleInstitutes.push(institutes[index]);
  }

  return (
    <div className="w-full py-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-[#260446] mb-8"
      >
        Participating Institutes
      </motion.h2>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          <Button
            onClick={prevSlide}
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 bg-white/80 hover:bg-white/90 shadow-md text-gray-800 rounded-full"
          >
            <ChevronLeft size={24} />
          </Button>
          
          <div className="flex justify-center items-center gap-4 overflow-hidden px-12">
            {visibleInstitutes.map((institute, index) => (
              <motion.div
                key={`${institute.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <Card className="w-44 h-44 flex items-center justify-center overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-center h-full">
                    <img 
                      src={institute.logo} 
                      alt={`${institute.name} logo`} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback image if logo fails to load
                        e.currentTarget.src = "https://via.placeholder.com/150?text=Logo";
                      }}
                    />
                  </CardContent>
                </Card>
                <p className="mt-2 text-xs font-medium text-center text-gray-700">
                  {institute.name}
                </p>
              </motion.div>
            ))}
          </div>
          
          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 bg-white/80 hover:bg-white/90 shadow-md text-gray-800 rounded-full"
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        
        {/* Carousel indicators */}
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: totalItems - maxVisibleItems + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? "bg-[#7e61e9]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipatingInstitutes;
