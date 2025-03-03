
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#260446] mb-6 text-center">Terms and Conditions</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              Welcome to Virtual Lab. These terms and conditions outline the rules and regulations 
              for the use of our website.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing this website, you agree to be bound by these Terms and Conditions and 
              agree that you are responsible for compliance with any applicable local laws.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">2. Use License</h2>
            <p className="text-gray-700 mb-6">
              Permission is granted to temporarily download one copy of the materials on Virtual Lab's 
              website for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">3. Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              The materials on Virtual Lab's website are provided on an 'as is' basis. Virtual Lab makes 
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, fitness 
              for a particular purpose, or non-infringement of intellectual property.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">4. Limitations</h2>
            <p className="text-gray-700 mb-6">
              In no event shall Virtual Lab or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on Virtual Lab's website.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">5. Accuracy of Materials</h2>
            <p className="text-gray-700 mb-6">
              The materials appearing on Virtual Lab's website could include technical, typographical, 
              or photographic errors. Virtual Lab does not warrant that any of the materials on its 
              website are accurate, complete or current.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">6. Changes</h2>
            <p className="text-gray-700 mb-6">
              Virtual Lab may revise these terms of service for its website at any time without notice. 
              By using this website you are agreeing to be bound by the then current version of these 
              terms of service.
            </p>
            
            <h2 className="text-xl font-semibold text-[#7e61e9] mb-3">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
