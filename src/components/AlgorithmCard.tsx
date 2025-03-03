
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AlgorithmCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: "Easy" | "Medium" | "Hard";
  id?: string;
}

const AlgorithmCard = ({ title, description, icon, difficulty, id }: AlgorithmCardProps) => {
  const navigate = useNavigate();
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  const handleClick = () => {
    if (id) {
      if (id.includes('/')) {
        // Format: field/topicId
        const [fieldId, topicId] = id.split('/');
        navigate(`/topic/${fieldId}/${topicId}`);
      } else {
        // Legacy format: just the algorithm id
        navigate(`/algorithm/${id}`);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="relative overflow-hidden h-full bg-white/80 backdrop-blur-sm border border-[#7e61e9]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={handleClick}>
        <div className="p-6">
          <div className="mb-4">
            <img src={icon} alt={title} className="w-12 h-12 animate-float" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#260446]">{title}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glow-button purple mt-4 px-4 py-2"
          >
            Learn More
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AlgorithmCard;
