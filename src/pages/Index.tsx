import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import EngineeringFieldsSection from "@/components/home/EngineeringFieldsSection";
import AlgorithmsSection from "@/components/home/AlgorithmsSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <SearchBar />
        </motion.div>

        {/* Engineering Fields Section */}
        <EngineeringFieldsSection />

        {/* Algorithm Cards Section */}
        <AlgorithmsSection />

        {/* Announcements Section */}
        <AnnouncementsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
