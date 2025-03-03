
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Virtual Lab helped me visualize complex algorithms that I had been struggling with for months. The animations make everything so much clearer!",
    author: "Priya S.",
    role: "CS Student, IIT Delhi",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    text: "As a teaching assistant, I recommend Virtual Lab to all my students. The interactive visualizations make teaching DSA concepts so much easier.",
    author: "Rahul K.",
    role: "Teaching Assistant, NIT Trichy",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    text: "I landed my dream job at Google after practicing algorithms on Virtual Lab. The platform made complex concepts accessible and fun to learn.",
    author: "Aisha M.",
    role: "Software Engineer, Google",
    avatar: "/placeholder.svg"
  },
];

const TestimonialsSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mb-24"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#260446]">Student Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-sm"
          >
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
            <div className="flex items-center">
              <div className="mr-3 rounded-full overflow-hidden w-10 h-10 bg-gray-200">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#260446]">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
