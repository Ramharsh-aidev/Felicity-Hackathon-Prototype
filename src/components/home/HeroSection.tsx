
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMouseX(event.clientX - centerX);
    setMouseY(event.clientY - centerY);
  };

  useEffect(() => {
    x.set(mouseX);
    y.set(mouseY);
  }, [mouseX, mouseY, x, y]);

  const scrollToEngineering = () => {
    const section = document.getElementById('engineering-fields-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-left"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-[#7e61e9]">Virtual</span>
          <br />
          <span className="text-[#7e61e9]">Lab</span>
          <br />
          <span className="text-[#260446]">is here!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Virtual Lab - An Animated DSA Learning Platform
          <br />
          <span className="text-[#7e61e9] font-semibold">DSA</span> Content Exclusively
          <br />
          Designed for Placements
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glow-button purple px-8 py-4 text-lg"
            onClick={scrollToEngineering}
          >
            Start Learning
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-lg rounded-md border-2 border-[#260446] text-[#260446] bg-transparent backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#260446] hover:to-[#7e61e9] hover:text-white transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setMouseX(0);
          setMouseY(0);
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-auto"
        >
          <img
            src="/img-uploads/c91e8334-dc52-4abe-89d6-125061e6fccb.png"
            alt="Virtual Lab Illustration"
            className="w-full h-auto max-w-[600px] mx-auto drop-shadow-xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
