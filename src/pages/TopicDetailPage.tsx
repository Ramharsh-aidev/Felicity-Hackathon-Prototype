import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { topicDetails } from "@/data/topics";
import { 
  ChevronLeft, 
  BookOpen, 
  Lightbulb, 
  Play, 
  XIcon,
  Code,
  GraduationCap,
  FileText,
  MessageCircle,
  MenuIcon,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StackAnimation from "@/components/animations/StackAnimation";
import LinkedListAnimation from "@/components/animations/LinkedListAnimation";
import BinarySearchAnimation from "@/components/animations/BinarySearchAnimation";
import TestQuestions from "@/components/TestQuestions";

type TabType = "aim" | "theory" | "animation" | "test" | "implementation";

const TopicDetailPage = () => {
  const { fieldId, topicId } = useParams<{ fieldId: string; topicId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("aim");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("javascript");
  
  const topic = topicId || "";
  const topicData = topicDetails[topic];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [topicId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#7e61e9]/30 mb-4"></div>
          <div className="text-[#7e61e9]">Loading...</div>
        </div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#260446] mb-4">Topic Not Found</h2>
          <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist or is still under development.</p>
          <Link to={`/${fieldId}`} className="glow-button purple px-6 py-2">
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  const renderAnimation = () => {
    switch (topic) {
      case "stack":
        return <StackAnimation />;
      case "linked-list":
        return <LinkedListAnimation />;
      case "binary-search":
        return <BinarySearchAnimation />;
      default:
        return (
          <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
            <div className="text-gray-500 flex flex-col items-center">
              <Play className="w-16 h-16 mb-4 text-[#7e61e9]" />
              <p>Animation visualization coming soon!</p>
            </div>
          </div>
        );
    }
  };

  // Helper function to render implementation content based on its type
  const renderImplementation = () => {
    const implementation = topicData.implementation;
    
    if (typeof implementation === 'string') {
      // If implementation is a string, render it directly
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
          {implementation}
        </pre>
      );
    } else if (typeof implementation === 'object') {
      // If implementation is an object with language keys
      const languages = Object.keys(implementation);
      
      return (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-t-md overflow-hidden">
            <div className="flex">
              {languages.map(lang => (
                <button
                  key={lang}
                  className={`px-4 py-2 text-sm focus:outline-none ${
                    activeLanguage === lang 
                      ? "bg-gray-700 text-white" 
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setActiveLanguage(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {implementation[activeLanguage]}
          </pre>
        </div>
      );
    }
    
    return null;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "aim":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#260446] mb-3">Aim</h3>
              <p className="text-gray-700">{topicData.aim}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#260446] mb-3">Objective</h3>
              <p className="text-gray-700">{topicData.objective}</p>
            </div>
          </motion.div>
        );
      case "theory":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-[#260446] mb-4">Theory</h3>
            <div className="text-gray-700 space-y-4 whitespace-pre-line">
              {topicData.theory}
            </div>
          </motion.div>
        );
      case "implementation":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-[#260446] mb-4">Implementation</h3>
            {renderImplementation()}
          </motion.div>
        );
      case "animation":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-[#260446] mb-6">Animation</h3>
            {renderAnimation()}
          </motion.div>
        );
      case "test":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-[#260446] mb-6">Test Your Knowledge</h3>
            <TestQuestions />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Mobile Header with Menu Toggle */}
      <div className="md:hidden bg-white/90 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 flex items-center justify-between">
        <Link to={`/${fieldId}`} className="flex items-center text-[#260446]">
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span className="text-sm">Back</span>
        </Link>
        <h1 className="text-lg font-bold text-[#260446] truncate max-w-[180px]">{topicData.title}</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle menu"
        >
          {isMobileSidebarOpen ? (
            <XIcon className="h-5 w-5 text-[#260446]" />
          ) : (
            <MenuIcon className="h-5 w-5 text-[#260446]" />
          )}
        </Button>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto p-4 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-[#260446]">{topicData.title}</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsMobileSidebarOpen(false)}
                      aria-label="Close menu"
                    >
                      <XIcon className="h-5 w-5 text-[#260446]" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Search in topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-purple-50 border-purple-100"
                    />
                  </div>
                  
                  <nav className="space-y-2">
                    <SidebarItem 
                      title="Aim & Objective"
                      icon={Lightbulb}
                      isActive={activeTab === "aim"}
                      onClick={() => {
                        setActiveTab("aim");
                        setIsMobileSidebarOpen(false);
                      }}
                    />
                    <SidebarItem 
                      title="Theory"
                      icon={BookOpen}
                      isActive={activeTab === "theory"}
                      onClick={() => {
                        setActiveTab("theory");
                        setIsMobileSidebarOpen(false);
                      }}
                    />
                    <SidebarItem 
                      title="Implementation"
                      icon={Code}
                      isActive={activeTab === "implementation"}
                      onClick={() => {
                        setActiveTab("implementation");
                        setIsMobileSidebarOpen(false);
                      }}
                    />
                    <SidebarItem 
                      title="Animation"
                      icon={Play}
                      isActive={activeTab === "animation"}
                      onClick={() => {
                        setActiveTab("animation");
                        setIsMobileSidebarOpen(false);
                      }}
                    />
                    <SidebarItem 
                      title="Test"
                      icon={GraduationCap}
                      isActive={activeTab === "test"}
                      onClick={() => {
                        setActiveTab("test");
                        setIsMobileSidebarOpen(false);
                      }}
                    />
                  </nav>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Related Resources</h3>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-purple-50 rounded">
                        <FileText className="w-4 h-4 text-[#7e61e9]" />
                        <span>Documentation</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-purple-50 rounded">
                        <MessageCircle className="w-4 h-4 text-[#7e61e9]" />
                        <span>Community Discussion</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar with collapsible functionality */}
          <div className={`hidden md:block ${isSidebarCollapsed ? 'md:w-16' : 'md:w-72'} flex-shrink-0 transition-all duration-300`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5 sticky top-24 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                {!isSidebarCollapsed && (
                  <Link to={`/${fieldId}`} className="flex items-center text-[#260446] hover:text-[#7e61e9] transition-colors">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Topics
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="ml-auto"
                  aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isSidebarCollapsed ? (
                    <PanelLeftOpen className="h-5 w-5 text-[#260446]" />
                  ) : (
                    <PanelLeftClose className="h-5 w-5 text-[#260446]" />
                  )}
                </Button>
              </div>
              
              {!isSidebarCollapsed && (
                <>
                  <h2 className="font-semibold text-lg text-[#260446] mb-4 border-b pb-2">{topicData.title}</h2>
                  
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Search in topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-purple-50 border-purple-100"
                    />
                  </div>
                </>
              )}
              
              <nav className="space-y-2">
                <SidebarItem 
                  title="Aim & Objective"
                  icon={Lightbulb}
                  isActive={activeTab === "aim"}
                  onClick={() => setActiveTab("aim")}
                  collapsed={isSidebarCollapsed}
                />
                <SidebarItem 
                  title="Theory"
                  icon={BookOpen}
                  isActive={activeTab === "theory"}
                  onClick={() => setActiveTab("theory")}
                  collapsed={isSidebarCollapsed}
                />
                <SidebarItem 
                  title="Implementation"
                  icon={Code}
                  isActive={activeTab === "implementation"}
                  onClick={() => setActiveTab("implementation")}
                  collapsed={isSidebarCollapsed}
                />
                <SidebarItem 
                  title="Animation"
                  icon={Play}
                  isActive={activeTab === "animation"}
                  onClick={() => setActiveTab("animation")}
                  collapsed={isSidebarCollapsed}
                />
                <SidebarItem 
                  title="Test"
                  icon={GraduationCap}
                  isActive={activeTab === "test"}
                  onClick={() => setActiveTab("test")}
                  collapsed={isSidebarCollapsed}
                />
              </nav>
              
              {!isSidebarCollapsed && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Related Resources</h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-purple-50 rounded">
                      <FileText className="w-4 h-4 text-[#7e61e9]" />
                      <span>Documentation</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-purple-50 rounded">
                      <MessageCircle className="w-4 h-4 text-[#7e61e9]" />
                      <span>Community Discussion</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 ${isSidebarCollapsed ? 'md:ml-4' : ''}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#260446]">{topicData.title}</h1>
                <div className="bg-purple-100 px-3 py-1 rounded-full text-xs font-medium text-[#7e61e9]">
                  {topicData.difficulty || "Intermediate"}
                </div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  title: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ title, icon: Icon, isActive, onClick, collapsed = false }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-md transition-all duration-200 ${
        isActive 
          ? "bg-gradient-to-r from-[#7e61e9]/20 to-purple-100 text-[#7e61e9] font-medium" 
          : "text-gray-600 hover:bg-[#7e61e9]/5 hover:text-[#7e61e9]"
      }`}
      title={collapsed ? title : undefined}
    >
      <Icon className={`h-5 w-5 ${isActive ? "text-[#7e61e9]" : "text-gray-500"}`} />
      {!collapsed && <span>{title}</span>}
      {isActive && !collapsed && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute left-0 w-1 h-8 bg-[#7e61e9] rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
};

export default TopicDetailPage;
