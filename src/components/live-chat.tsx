'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: number;
}

const CHAT_HISTORY_KEY = 'tostem-chat-history';

const quickReplies = [
  { label: 'Pricing', query: 'Can you tell me about pricing?' },
  { label: 'Installation', query: 'How does installation work?' },
  { label: 'Warranty', query: 'What warranty do you offer?' },
  { label: 'Custom Size', query: 'Do you offer custom sizes?' },
];

const botResponses: Record<string, string> = {
  'pricing': "Tostem offers premium aluminium windows and doors starting from ₹4,500 for windows and ₹5,200 for doors. Prices vary based on series (ATIS, GRANTS, WE-70, WE+), design type, and customization options. Would you like a personalized quote? Click 'Get Free Quotation' or call us at 1800-123-4567!",
  'installation': "Tostem provides professional installation by certified technicians across India. Our pre-engineered system windows are manufactured in controlled factory environments, ensuring perfect fits. Installation typically takes 1-2 days for a standard residential project. All installations come with a comprehensive service warranty.",
  'warranty': "Tostem offers industry-leading warranty coverage: up to 10 years on hardware, 7 years on the product, and 5 years on installation service. Our anodized finish is 5x harder than untreated aluminium, ensuring long-lasting beauty. We also provide after-sales maintenance support across 100+ cities in India.",
  'custom': "Absolutely! Tostem specializes in custom-sized windows and doors. As a pre-engineered system, we manufacture to your exact specifications in our factory. Whether you need non-standard dimensions, special configurations, or unique finishes, we can accommodate your requirements. Contact us for a custom consultation!",
  'default': "Thank you for your interest in Tostem! We're Japan's leading aluminium windows and doors brand, now in India. Our products feature Japanese precision engineering, superior soundproofing (up to 40dB), and 100+ quality checks. How can I help you today? You can ask about pricing, installation, warranty, or custom sizes.",
};

function getBotResponse(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('rate') || lower.includes('quot')) {
    return botResponses['pricing'];
  }
  if (lower.includes('install') || lower.includes('fit') || lower.includes('setup') || lower.includes('deliver')) {
    return botResponses['installation'];
  }
  if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('warran')) {
    return botResponses['warranty'];
  }
  if (lower.includes('custom') || lower.includes('size') || lower.includes('dimension') || lower.includes('special')) {
    return botResponses['custom'];
  }
  return botResponses['default'];
}

function loadChatHistory(): ChatMessage[] {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore parse errors
  }
  return [];
}

function saveChatHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    // Ignore storage errors
  }
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'bot',
        text: "👋 Welcome to Tostem! I'm your virtual assistant. How can I help you today?",
        timestamp: Date.now(),
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: getBotResponse(text),
        timestamp: Date.now(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }, []);

  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleQuickReply = useCallback(
    (query: string) => {
      sendMessage(query);
    },
    [sendMessage]
  );

  const handleClearChat = useCallback(() => {
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'bot',
      text: "👋 Chat cleared! How can I help you today?",
      timestamp: Date.now(),
    };
    setMessages([welcomeMsg]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed right-4 md:right-6 bottom-32 md:bottom-36 z-50 w-14 h-14 rounded-full bg-tostem-blue text-white shadow-lg shadow-tostem-blue/30 flex items-center justify-center hover:bg-tostem-blue-light transition-colors group"
            aria-label="Open live chat"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 md:right-6 bottom-32 md:bottom-36 z-50 w-[calc(100vw-2rem)] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] flex flex-col"
            style={{ maxHeight: isMinimized ? 'none' : '520px' }}
          >
            {/* Header */}
            <div className="bg-tostem-blue text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Tostem Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online now
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" style={{ maxHeight: '320px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'bot'
                            ? 'bg-tostem-blue/10 text-tostem-blue'
                            : 'bg-tostem-dark/10 text-tostem-dark dark:bg-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {msg.role === 'bot' ? (
                          <Bot className="w-3.5 h-3.5" />
                        ) : (
                          <User className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Message bubble */}
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'bot'
                            ? 'bg-tostem-light-gray dark:bg-gray-800 text-tostem-dark dark:text-gray-200 rounded-tl-sm'
                            : 'bg-tostem-blue text-white rounded-tr-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-tostem-blue/10 text-tostem-blue flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-tostem-light-gray dark:bg-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1.5">
                          <motion.div
                            className="w-2 h-2 bg-tostem-text-muted rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-tostem-text-muted rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-tostem-text-muted rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-t border-gray-100 dark:border-gray-700">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleQuickReply(reply.query)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-tostem-blue bg-tostem-blue/10 hover:bg-tostem-blue/20 rounded-full transition-colors whitespace-nowrap"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 text-sm bg-tostem-light-gray dark:bg-gray-800 text-tostem-dark dark:text-gray-200 placeholder:text-tostem-text-muted rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-tostem-blue/30 transition-shadow"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="w-10 h-10 rounded-full bg-tostem-blue hover:bg-tostem-blue-light text-white disabled:opacity-40 flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
