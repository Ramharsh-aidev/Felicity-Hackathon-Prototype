
import { motion } from "framer-motion";

const MechanicalEngineeringPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-[#260446] mb-6">Mechanical Engineering</h1>
          <p className="text-lg text-gray-600 mb-8">
            Coming soon! The Mechanical Engineering section is currently under development.
            Soon you'll have access to fluid mechanics, thermodynamics, and mechanical design tutorials!
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 mt-12"
          >
            <img 
              src="/placeholder.svg" 
              alt="Mechanical Engineering" 
              className="w-48 h-48 mx-auto mb-8 opacity-50" 
            />
            <h2 className="text-2xl font-semibold text-[#7e61e9] mb-4">
              Engineering Simulations Coming Soon
            </h2>
            <p className="text-gray-600">
              We're building interactive 3D models and physics simulations 
              to help you understand mechanical engineering concepts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MechanicalEngineeringPage;
