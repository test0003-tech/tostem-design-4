'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const quickReplies = [
  { label: '💰 Pricing', value: 'pricing', response: 'Our windows start from ₹4,500/sq.ft and doors from ₹5,200/sq.ft. The final price depends on the series, design, and customization options. Would you like a free quotation?' },
  { label: '🔧 Installation', value: 'installation', response: 'We offer professional installation across 50+ cities in India. Our certified technicians ensure perfect fitting with a 10-year warranty. Installation typically takes 1-2 days per project.' },
  { label: '🛡️ Warranty', value: 'warranty', response: 'All TOSTEM products come with a 10-year warranty covering manufacturing defects, hardware, and performance. We also offer extended warranty options up to 20 years.' },
  { label: '📏 Custom Size', value: 'custom', response: 'Yes! All our products are custom-made to your exact specifications. Simply share your window/door dimensions and we\'ll manufacture to fit perfectly. Tolerance of ±1mm.' },
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    text: 'Hello! 👋 Welcome to TOSTEM. I\'m here to help you with any questions about our premium aluminium windows and doors.',
    sender: 'bot',
    timestamp: new Date(),
  },
  {
    id: 2,
    text: 'How can I assist you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage - use lazy initializer
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return initialMessages;
    try {
      const saved = localStorage.getItem('tostem-chat-history');
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors
    }
    return initialMessages;
  });

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('tostem-chat-history', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const addBotMessage = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }, 800 + Math.random() * 600);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Smart auto-response based on keywords
    const lower = inputValue.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('quotation')) {
      addBotMessage(quickReplies[0].response);
    } else if (lower.includes('install') || lower.includes('fit') || lower.includes('delivery')) {
      addBotMessage(quickReplies[1].response);
    } else if (lower.includes('warranty') || lower.includes('guarantee')) {
      addBotMessage(quickReplies[2].response);
    } else if (lower.includes('size') || lower.includes('dimension') || lower.includes('custom')) {
      addBotMessage(quickReplies[3].response);
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
      addBotMessage('Hello! 😊 How can I help you today? Feel free to ask about our products, pricing, installation, or anything else!');
    } else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone')) {
      addBotMessage('You can reach us at 1800-266-7500 (toll-free) or email info@tostemindia.com. You can also visit our contact page for office locations. Would you like me to navigate you there?');
    } else {
      addBotMessage('Thank you for your message! For detailed assistance, I\'d recommend speaking with our experts at 1800-266-7500 or visiting our contact page. Is there anything specific about our windows and doors I can help with?');
    }
  }, [inputValue, addBotMessage]);

  const handleQuickReply = useCallback((reply: typeof quickReplies[0]) => {
    const userMsg: ChatMessage = {
      id: Date.now(),
      text: reply.label,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    addBotMessage(reply.response);
  }, [addBotMessage]);

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-tostem-blue text-white shadow-lg hover:bg-tostem-blue-light transition-colors flex items-center justify-center group"
            aria-label="Open live chat"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a]"
            style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="bg-tostem-blue text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">TOSTEM Assistant</p>
                  <p className="text-[10px] text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    Online now
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Minimize chat"
                >
                  <span className="text-xs font-bold">─</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" style={{ height: '300px' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'bot' ? 'bg-tostem-blue/10 text-tostem-blue' : 'bg-tostem-dark/10 text-tostem-dark dark:bg-white/10 dark:text-gray-300'}`}>
                      {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-tostem-blue text-white rounded-br-sm' : 'bg-gray-100 dark:bg-white/10 text-tostem-dark dark:text-gray-300 rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center bg-tostem-blue/10 text-tostem-blue">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-gray-100 dark:bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.value}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 rounded-full bg-tostem-light-gray dark:bg-white/10 text-tostem-dark dark:text-gray-300 hover:bg-tostem-blue hover:text-white transition-colors border border-gray-200 dark:border-white/10 hover:border-tostem-blue"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Type a message..."
                  className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-white/10 text-sm text-tostem-dark dark:text-gray-200 placeholder:text-tostem-text-muted dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-tostem-blue/30 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-tostem-blue text-white flex items-center justify-center hover:bg-tostem-blue-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized state */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-24 right-4 md:right-6 z-50 bg-tostem-blue text-white rounded-full px-4 py-3 shadow-lg hover:bg-tostem-blue-light transition-colors flex items-center gap-2"
            aria-label="Open chat"
          >
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">Chat</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
