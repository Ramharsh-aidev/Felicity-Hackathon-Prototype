
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticipatingInstitutes from "@/components/ParticipatingInstitutes";
import Map from "@/components/Map";

const teamImages = [
  "/img-uploads/526f3020-4148-4fbe-9419-7c751e063d27.png",
  "/img-uploads/9790ce8a-aab8-442e-a866-8d14129d44e0.png",
  "/img-uploads/4fdc8256-1c10-4c40-853a-4535d6f14200.png",
  "/img-uploads/3c1c2619-c631-4a95-a5ac-a5a750ccbf8c.png",
  "/img-uploads/a17adaea-3ca6-46f2-9b5c-556c01a66ab2.png"
];

const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === teamImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? teamImages.length - 1 : prevIndex - 1
    );
  };

  // Auto slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#260446] mb-6 text-center">About Virtual Lab</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Virtual Lab was created with a simple mission: to make learning complex engineering 
              concepts intuitive and engaging through interactive visualizations and animations.
              We believe that seeing algorithms and processes in action is the best way to truly 
              understand how they work.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Interactive visualizations of algorithms and data structures</li>
              <li>Step-by-step explanations of complex engineering concepts</li>
              <li>Comprehensive content for computer science, electrical engineering, and mechanical engineering</li>
              <li>Practice tests and quizzes to reinforce your learning</li>
              <li>Content designed specifically for placement preparation</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Virtual Lab is developed by a team of passionate engineers and educators 
              who believe in the power of visual learning. Our team combines expertise in 
              computer science, engineering, and education to create the best learning 
              experience possible.
            </p>
            
            {/* Image Slideshow/Carousel */}
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-7 relative">
                <img 
                  src={teamImages[currentImageIndex]} 
                  alt="Virtual Lab Team" 
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-between">
                  <Button
                    onClick={prevImage}
                    variant="ghost" 
                    size="icon"
                    className="ml-2 bg-black/20 text-white hover:bg-black/40"
                  >
                    <ChevronLeft size={24} />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="ghost" 
                    size="icon"
                    className="mr-2 bg-black/20 text-white hover:bg-black/40"
                  >
                    <ChevronRight size={24} />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center mt-2 gap-1">
                {teamImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-[#7e61e9]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Section */}
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">Watch Our Introduction</h2>
            <div className="rounded-xl overflow-hidden mb-6 bg-black/5 p-4 flex flex-col items-center">
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="aspect-video bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <Button className="glow-button purple flex items-center gap-2">
                    <Play size={20} className="ml-1" />
                    Watch Video
                  </Button>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Learn more about our approach to visual learning and see examples of our interactive animations.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">Get Started Today</h2>
            <p className="text-gray-700 mb-6">
              Whether you're preparing for placement interviews, studying for exams, or simply curious 
              about how algorithms work, Virtual Lab has something for you. Browse our collection of 
              topics and start your visual learning journey today.
            </p>

            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">Our Partners</h2>
            <p className="text-gray-700 mb-4">
              We collaborate with leading educational institutions and industry experts to ensure our content 
              is accurate, up-to-date, and aligned with current industry requirements. Our partnership program 
              helps us bring the best learning resources to students worldwide.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-[#260446] font-bold text-3xl">25+</div>
                <div className="text-gray-500 text-sm">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="text-[#260446] font-bold text-3xl">100k+</div>
                <div className="text-gray-500 text-sm">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-[#260446] font-bold text-3xl">50+</div>
                <div className="text-gray-500 text-sm">Course Modules</div>
              </div>
            </div>
            
            {/* Add the ParticipatingInstitutes component */}
            <ParticipatingInstitutes />
            
            {/* Contact Us Section with Map */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-[#7e61e9] mb-6">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 text-[#7e61e9]" />
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <a href="mailto:support@vlab.co.in" className="text-[#7e61e9] hover:underline">
                        support@vlab.co.in
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 text-[#7e61e9]" />
                    <div>
                      <p className="font-medium text-gray-700">Phone</p>
                      <a href="tel:01126582050" className="text-gray-600">
                        011-26582050
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-[#7e61e9]" />
                    <div>
                      <p className="font-medium text-gray-700">Address</p>
                      <address className="not-italic text-gray-600">
                        Wireless Research Lab<br />
                        Room No - 206/IIA<br />
                        Bharti School of Telecom<br />
                        Indian Institute of Technology Delhi<br />
                        Hauz Khas, New Delhi-110016
                      </address>
                    </div>
                  </div>
                </div>
                
                {/* Map Component */}
                <Map className="min-h-[300px] shadow-md" />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glow-button purple px-8 py-4 text-lg"
            >
              Start Learning
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
