
import { motion } from "framer-motion";
import AlgorithmCard from "@/components/AlgorithmCard";
import { Link } from "react-router-dom";

// These are just the few algorithms we'll show on the homepage
const featuredAlgorithms = [
  {
    id: "data-structures/binary-search",
    title: "Binary Search",
    description: "An efficient algorithm for finding an item in a sorted list",
    icon: "/placeholder.svg",
    difficulty: "Easy" as const,
  },
  {
    id: "data-structures/linked-list",
    title: "Linked List",
    description: "A linear data structure where elements are stored in nodes",
    icon: "/placeholder.svg",
    difficulty: "Easy" as const,
  },
  {
    id: "data-structures/stack",
    title: "Stack Data Structure",
    description: "A linear data structure that follows the LIFO principle",
    icon: "/placeholder.svg",
    difficulty: "Easy" as const,
  },
  {
    id: "algorithms/dijkstras-algorithm",
    title: "Dijkstra's Algorithm",
    description: "Finds shortest paths from a source node to all other nodes in a graph",
    icon: "/placeholder.svg",
    difficulty: "Medium" as const,
  },
];

const AlgorithmsSection = () => {
  // Show only 4 featured algorithms on the homepage
  const displayedAlgorithms = featuredAlgorithms;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mb-20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#260446]">Featured Algorithms</h2>
        <Link to="/computer-science" className="text-[#7e61e9] font-medium text-sm hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedAlgorithms.map((algo, index) => (
          <motion.div
            key={algo.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 } 
            }}
            className="transform transition-all duration-300"
          >
            <AlgorithmCard {...algo} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AlgorithmsSection;
