
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  pending?: boolean;
}

const ChatbotWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([{ text: welcomeMessage, sender: 'bot' }]);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getWelcomeMessage = () => {
    // Customize welcome message based on current route
    const path = location.pathname;
    
    if (path.includes('computer-science')) {
      return "Welcome to the Computer Science section! I can help you find information about algorithms, data structures, and programming concepts. What would you like to learn about?";
    } else if (path.includes('electrical-engineering')) {
      return "Welcome to the Electrical Engineering section! While this section is under development, I can still help with basic questions. What are you interested in?";
    } else if (path.includes('mechanical-engineering')) {
      return "Welcome to the Mechanical Engineering section! This section is coming soon, but I can still assist with general questions. How can I help you?";
    } else if (path === '/') {
      return "Hello! I'm your VirtualLab Assistant. I can help you navigate our site and find resources on Computer Science, Electrical Engineering, and Mechanical Engineering. What are you looking for today?";
    } else {
      return "Hello! I'm your VirtualLab Assistant. How can I help you today?";
    }
  };

  const processWithAI = async (userQuery: string) => {
    if (!apiKey) {
      return "To use AI-powered responses, please enter your Gemini API key in the settings. For now, I can still help with basic navigation questions!";
    }
    
    // In a real implementation, this would contact the Gemini API
    // For now, we'll simulate an enhanced response
    try {
      const currentPage = location.pathname;
      const prompt = `
        User is on page: ${currentPage}
        User query: ${userQuery}
        
        You are the VirtualLab Assistant, an educational platform that covers Computer Science, Electrical Engineering, and Mechanical Engineering topics. 
        Respond concisely and helpfully. Maximum 3 sentences. Focus on directing users to relevant sections of the site.
      `;
      
      // For demo purposes, we'll simulate the API call
      return "I'd need to integrate with the Gemini API for advanced responses. For now, this is a simulated AI response based on your query. Check our Computer Science section for algorithms and data structures!";
    } catch (error) {
      console.error('Error with AI processing:', error);
      return "I'm having trouble connecting to my AI services right now. Is there anything specific about VirtualLab I can help you with?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInputValue('');
    setIsLoading(true);
    
    // Add "typing" indicator
    setMessages(prev => [...prev, { text: '', sender: 'bot', pending: true }]);
    
    try {
      // Get AI-enhanced response
      const aiResponse = await processWithAI(inputValue);
      
      // Remove typing indicator and add response
      setMessages(prev => [
        ...prev.filter(msg => !msg.pending),
        { text: aiResponse, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.pending),
        { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
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
            <div className="p-4 bg-gradient-to-r from-[#260446] to-[#7e61e9] text-white font-medium flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span>VirtualLab Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-white/10"
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
              <div ref={messagesEndRef} />
            </div>

            {/* API Key input (would be hidden in production) */}
            {!apiKey && (
              <div className="px-3 pt-2 bg-yellow-50 border-t border-yellow-100">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter Gemini API Key (optional)"
                  className="w-full border border-yellow-200 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                />
              </div>
            )}

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
                  className="rounded-l-none bg-[#260446] hover:bg-[#7e61e9] transition-colors"
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

export default ChatbotWithAI;
