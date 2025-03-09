import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Cpu, 
  Zap, 
  Cog, 
  Beaker, 
  Dna, 
  Building, 
  Atom
} from "lucide-react";

const engineeringFields = [
  {
    id: "electronics-communications",
    title: "Electronics & Communications",
    description: "Signal Processing, Communication Systems, Circuit Design",
    icon: <Cpu className="h-10 w-10 text-white" />,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "computer-science",
    title: "Computer Science & Engineering",
    description: "Algorithms, Data Structures, Programming, and more",
    icon: <Cpu className="h-10 w-10 text-white" />,
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    description: "Circuits, Electronics, Power Systems, and more",
    icon: <Zap className="h-10 w-10 text-white" />,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    description: "Mechanics, Thermodynamics, Fluid Dynamics, and more",
    icon: <Cog className="h-10 w-10 text-white" />,
    color: "from-emerald-500 to-green-600"
  },
  {
    id: "chemical-engineering",
    title: "Chemical Engineering",
    description: "Chemical Processes, Reactions, and Transformations",
    icon: <Beaker className="h-10 w-10 text-white" />,
    color: "from-red-500 to-pink-600"
  },
  {
    id: "biotechnology",
    title: "Biotechnology & Biomedical Engineering",
    description: "Biological Systems, Medical Devices, and Healthcare Solutions",
    icon: <Dna className="h-10 w-10 text-white" />,
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: "civil-engineering",
    title: "Civil Engineering",
    description: "Structures, Infrastructure, and Construction",
    icon: <Building className="h-10 w-10 text-white" />,
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: "physical-sciences",
    title: "Physical Sciences",
    description: "Physics, Astronomy, and Material Science",
    icon: <Atom className="h-10 w-10 text-white" />,
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "chemical-sciences",
    title: "Chemical Sciences",
    description: "Chemistry, Biochemistry, and Analytical Methods",
    icon: <Beaker className="h-10 w-10 text-white" />,
    color: "from-pink-500 to-rose-600"
  },
];

const EngineeringFieldsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 400; // Adjust as needed
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      id="engineering-fields-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mb-20 relative"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#260446]">Explore Engineering Fields</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#260446]" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-[#260446]" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {engineeringFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 } 
            }}
            className="transform transition-all duration-300 min-w-[300px] flex-shrink-0"
          >
            <Link to={`/${field.id}`}>
              <div className={`relative overflow-hidden rounded-xl p-6 h-full bg-gradient-to-br ${field.color} text-white shadow-lg`}>
                <div className="mb-4">{field.icon}</div>
                <h3 className="text-xl font-bold mb-2">{field.title}</h3>
                <p className="text-white/80 mb-4">{field.description}</p>
                <div className="flex items-center text-sm font-medium">
                  Explore Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EngineeringFieldsSection;
