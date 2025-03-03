
import { motion } from "framer-motion";

const ElectricalEngineeringPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-[#260446] mb-6">Electrical Engineering</h1>
          <p className="text-lg text-gray-600 mb-8">
            Coming soon! The Electrical Engineering section is currently under development.
            Check back later for circuit design, power systems, electronics, and more!
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 mt-12"
          >
            <img 
              src="/placeholder.svg" 
              alt="Electrical Engineering" 
              className="w-48 h-48 mx-auto mb-8 opacity-50" 
            />
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">
              We're working on something exciting!
            </h2>
            <p className="text-gray-600">
              Our team is building interactive simulations for electrical circuits, 
              power systems, and other electrical engineering concepts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElectricalEngineeringPage;
