
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Megaphone } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "New Algorithm Visualizations",
    text: "We've added 5 new algorithm visualizations including AVL Trees and Dijkstra's Algorithm!",
    date: "June 10, 2024"
  },
  {
    id: 2,
    title: "Workshop: DSA for Placements",
    text: "Join our free online workshop on mastering DSA for placements on June 15th.",
    date: "June 5, 2024"
  }
];

const AnnouncementsSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#260446]">Latest Announcements</h2>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-sm">
        {announcements.map((announcement, index) => (
          <div key={announcement.id}>
            <div className="flex items-start gap-4 py-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Megaphone className="h-6 w-6 text-[#7e61e9]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-[#260446]">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-600 mt-1">{announcement.text}</p>
              </div>
            </div>
            {index < announcements.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnnouncementsSection;
