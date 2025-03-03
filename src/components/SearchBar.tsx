
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div
        className={`relative flex items-center p-2 rounded-2xl transition-all duration-300 ${
          isFocused
            ? "bg-white shadow-lg ring-2 ring-primary/20"
            : "bg-gray-50/80"
        }`}
      >
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search algorithms, data structures..."
          className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
