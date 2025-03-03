
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComputerScienceFields } from "@/data/topics";
import AlgorithmCard from "@/components/AlgorithmCard";
import { ChevronDown } from "lucide-react";

const ComputerSciencePage = () => {
  const [selectedField, setSelectedField] = useState(ComputerScienceFields[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#260446] mb-4">Computer Science</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore various fields in Computer Science and learn about algorithms,
              data structures, artificial intelligence, and more.
            </p>
          </div>

          {/* Field Selector Dropdown */}
          <div className="mb-12 flex justify-center">
            <div className="relative inline-block min-w-[240px]">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-left bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#7e61e9]"
              >
                <span className="font-medium text-[#260446]">{selectedField.title}</span>
                <ChevronDown className={`ml-2 h-5 w-5 text-[#7e61e9] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white/90 backdrop-blur-sm border border-purple-100 py-1 overflow-hidden"
                  >
                    {ComputerScienceFields.map((field) => (
                      <button
                        key={field.id}
                        onClick={() => {
                          setSelectedField(field);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedField.id === field.id
                            ? 'bg-[#7e61e9]/10 text-[#260446] font-medium'
                            : 'text-gray-700 hover:bg-purple-50'
                        }`}
                      >
                        {field.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Topics Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedField.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {selectedField.topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2 } 
                  }}
                  className="transform transition-all duration-300"
                >
                  <AlgorithmCard {...topic} id={`${selectedField.id}/${topic.id}`} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ComputerSciencePage;
