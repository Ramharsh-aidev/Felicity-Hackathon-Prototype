
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import { generateGeminiResponse, clearConversationHistory } from "@/services/gemini";

const GEMINI_API_KEY = "AIzaSyDG_6Y-iY2Ezjkad8go62wv7JcpOioRIgZA"; // add your own API key

const MinimalChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot', pending?: boolean}[]>([
    { text: "Hello! I'm your VirtualLab Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      clearConversationHistory();
      setMessages([{ text: "Hello! I'm your VirtualLab Assistant. How can I help you today?", sender: 'bot' }]);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    setMessages(prev => [...prev, { text: '', sender: 'bot' as const, pending: true }]);
    
    try {
      // Get current path and page title to provide context
      const currentPath = location.pathname;
      const pageTitle = document.title;
      
      // Get any selected text or visible content on the page for additional context
      const selectedText = window.getSelection()?.toString() || '';
      const visibleContentSample = document.body.innerText.substring(0, 500); // First 500 chars
      
      // Extract topic info from URL if possible
      const pathSegments = currentPath.split('/').filter(Boolean);
      const topicInfo = pathSegments.length > 0 ? 
        `Current topic: ${pathSegments.join(' > ')}` : 
        'On main page';
      
      // Create a detailed context prompt
      const contextPrompt = `
User is currently on page: ${currentPath} (${pageTitle})
${topicInfo}
Context clues from page: ${selectedText || visibleContentSample.substring(0, 100) + '...'}

Remember you are an AI assistant for VirtualLab, an educational platform that helps users learn about Computer Science, Electrical Engineering, and Mechanical Engineering.

Their question is: ${inputValue}
      `.trim();
      
      const response = await generateGeminiResponse(contextPrompt, GEMINI_API_KEY);
      
      setMessages(prev => prev.filter(msg => !msg.pending));
      setMessages(prev => [...prev, { text: response.text, sender: 'bot' as const }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.pending),
        { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' as const }
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
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={toggleChat}
            className="bg-white hover:bg-gray-50 shadow-md rounded-full py-3 px-4 flex items-center gap-2 transition-all duration-300"
          >
            <MessageSquare className="h-5 w-5 text-[#260446]" />
            <span className="text-[#260446] font-medium">Ask AI Assistant</span>
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-2rem)] glass-card rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 bg-[#260446] text-white font-medium flex justify-between items-center">
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

export default MinimalChatButton;
