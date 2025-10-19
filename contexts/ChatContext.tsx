import React, { createContext, useState, ReactNode } from 'react';
import { ChatMessage } from '@/types/elevator';
import { ChatbotService } from '@/services/chatbotService';

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    ChatbotService.generateWelcomeMessage(),
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate typing delay
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = ChatbotService.processUserMessage(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([ChatbotService.generateWelcomeMessage()]);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}