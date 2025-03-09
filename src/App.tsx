import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import ComputerSciencePage from "./pages/ComputerSciencePage";
import ElectricalEngineeringPage from "./pages/ElectricalEngineeringPage";
import MechanicalEngineeringPage from "./pages/MechanicalEngineeringPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import MinimalChatButton from "./components/Chatbot/MinimalChatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/computer-science" element={<ComputerSciencePage />} />
            <Route path="/electrical-engineering" element={<ElectricalEngineeringPage />} />
            <Route path="/mechanical-engineering" element={<MechanicalEngineeringPage />} />
            <Route path="/algorithm/:id" element={<AlgorithmDetail />} />
            <Route path="/topic/:fieldId/:topicId" element={<TopicDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Add the chatbot component */}
          <MinimalChatButton />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
