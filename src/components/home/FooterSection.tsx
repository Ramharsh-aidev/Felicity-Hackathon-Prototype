
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-20 pt-10 border-t border-purple-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-[#260446]">Virtual Lab</h3>
          <p className="text-gray-600">Animated DSA learning platform designed for placements</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#260446]">Engineering Fields</h4>
          <ul className="space-y-2">
            <li><Link to="/computer-science" className="text-gray-600 hover:text-[#7e61e9]">Computer Science</Link></li>
            <li><Link to="/electrical-engineering" className="text-gray-600 hover:text-[#7e61e9]">Electrical Engineering</Link></li>
            <li><Link to="/mechanical-engineering" className="text-gray-600 hover:text-[#7e61e9]">Mechanical Engineering</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#260446]">Resources</h4>
          <ul className="space-y-2">
            <li><Link to="/algorithm/binary-search" className="text-gray-600 hover:text-[#7e61e9]">Algorithms</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-[#7e61e9]">DSA Cheat Sheet</a></li>
            <li><a href="#" className="text-gray-600 hover:text-[#7e61e9]">Placement Prep</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#260446]">About</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-[#7e61e9]">About Us</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-[#7e61e9]">Terms & Conditions</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-[#7e61e9]">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-purple-100 pt-6 pb-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Virtual Lab. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default FooterSection;
