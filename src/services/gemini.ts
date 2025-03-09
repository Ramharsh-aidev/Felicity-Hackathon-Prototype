
// Gemini AI integration service
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export interface GeminiResponse {
  text: string;
  error?: string;
}

// Track conversation history for each chat session
// Update the history format to match what the API expects
let conversationHistory: { role: 'user' | 'model', parts: { text: string }[] }[] = [];

export const generateGeminiResponse = async (
  prompt: string,
  apiKey: string
): Promise<GeminiResponse> => {
  if (!apiKey) {
    return {
      text: "API key is required to use Gemini AI. Please provide a valid API key.",
      error: "No API key provided"
    };
  }

  try {
    // Add user message to conversation history with correct format
    conversationHistory.push({ 
      role: 'user', 
      parts: [{ text: prompt }]
    });
    
    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a chat session with history
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), // Include all but the latest message
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 800,
      }
    });
    
    // Send the latest message and get response
    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();
    
    // Add model response to conversation history with correct format
    conversationHistory.push({ 
      role: 'model', 
      parts: [{ text: responseText }]
    });
    
    return {
      text: responseText,
    };
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    
    // If API call fails, try fallback to REST API
    try {
      // Using the direct API endpoint method for browser compatibility
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI assistant for VirtualLab, an educational platform that helps users learn about Computer Science, Electrical Engineering, and Mechanical Engineering through interactive simulations and tutorials.
                    
Context: ${prompt}

Keep your responses concise, helpful, and focused on directing users to relevant sections of the site. VirtualLab includes:
- Computer Science section with algorithms, data structures
- Electrical Engineering section with circuit simulations (coming soon)
- Mechanical Engineering section with physics simulations (coming soon)
                    
Your goal is to help users find the right resources or understand concepts. If you don't know the answer, direct them to the most relevant section.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              topK: 64,
              maxOutputTokens: 800,
            }
          }),
        }
      );

      const data = await response.json();
      
      // Handle different response formats based on API version
      let responseText = '';
      if (data.candidates && data.candidates.length > 0) {
        if (data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          responseText = data.candidates[0].content.parts[0].text;
        }
      } else if (data.error) {
        throw new Error(data.error.message || 'Unknown API error');
      }
      
      if (!responseText) {
        responseText = "I'm sorry, I couldn't generate a helpful response. Please try asking a different question.";
      }
      
      // Add model response to conversation history even from fallback method with correct format
      conversationHistory.push({ 
        role: 'model', 
        parts: [{ text: responseText }]
      });
      
      return {
        text: responseText,
      };
    } catch (fallbackError) {
      console.error("Fallback method also failed:", fallbackError);
      return {
        text: "Sorry, I had trouble connecting to the AI service. Please try again later.",
        error: fallbackError instanceof Error ? fallbackError.message : "Unknown error"
      };
    }
  }
};

// Function to clear conversation history
export const clearConversationHistory = () => {
  conversationHistory = [];
};
