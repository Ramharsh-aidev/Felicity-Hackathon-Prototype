
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot', pending?: boolean}[]>([
    { text: "Hello! I'm your VirtualLab Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message with correct typing
    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInputValue('');
    setIsLoading(true);
    
    // Add "typing" indicator
    setMessages(prev => [...prev, { text: '', sender: 'bot' as const, pending: true }]);
    
    try {
      // Simulated response - in a real implementation, this would be an API call
      setTimeout(() => {
        // Remove typing indicator
        setMessages(prev => prev.filter(msg => !msg.pending));
        
        // Generate contextual response based on input
        const botResponse = generateResponse(inputValue);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' as const }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.pending),
        { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' as const }
      ]);
      setIsLoading(false);
    }
  };

  const generateResponse = (message: string) => {
    // Simple response logic based on keywords
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('algorithm') || lowerMsg.includes('algorithms')) {
      return "You can find our algorithms in the Computer Science section. We have various algorithms like sorting, searching, and graph algorithms.";
    } else if (lowerMsg.includes('computer science')) {
      return "Our Computer Science section includes topics like algorithms, data structures, and more. You can navigate there from the main page.";
    } else if (lowerMsg.includes('electrical') || lowerMsg.includes('engineering')) {
      return "Our Electrical Engineering section is coming soon! It will include topics on circuit design, power systems, and electronics.";
    } else if (lowerMsg.includes('mechanical')) {
      return "Our Mechanical Engineering section is under development and will include fluid mechanics, thermodynamics, and mechanical design tutorials.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! How can I help you with VirtualLab today?";
    } else if (lowerMsg.includes('help')) {
      return "I can help you navigate through different sections like Computer Science, Electrical Engineering, or Mechanical Engineering. What are you interested in learning about?";
    } else {
      return "I'm not sure I understand. Could you try rephrasing your question? You can ask about our Computer Science topics, engineering sections, or how to navigate the site.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 p-0 shadow-lg ${
            isOpen ? 'bg-[#260446] hover:bg-[#7e61e9]' : 'glow-button purple'
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-2rem)] glass-card rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-4 bg-[#260446] text-white font-medium flex justify-between items-center">
              <span>VirtualLab Assistant</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-[#7e61e9]/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="h-[350px] overflow-y-auto p-4 scrollbar-hide bg-purple-50/50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#7e61e9] text-white rounded-br-none'
                        : 'bg-white shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    {message.pending ? (
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }} />
                      </div>
                    ) : (
                      <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7e61e9] focus:border-transparent"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="rounded-l-none bg-[#260446] hover:bg-[#7e61e9]"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
