import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FireIcon, 
  ScissorsIcon, 
  LightBulbIcon, 
  UserIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckIcon,
  ShareIcon,
  HeartIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  BoltIcon,
  SparklesIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { ChatMessage, ChatOption, CEOPersona } from '../types/chatbot';
import { DEFAULT_CEO, CHAT_FLOWS, ALTERNATIVE_RESPONSES } from '../data/chatFlows';

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FireIcon,
  ScissorsIcon,
  LightBulbIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckIcon,
  ShareIcon,
  HeartIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  BoltIcon,
  SparklesIcon
};

interface ChatbotProps {
  onBack?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCEO] = useState<CEOPersona>(DEFAULT_CEO);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('main');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting message
    const initialMessage: ChatMessage = {
      id: 'greeting',
      type: 'assistant',
      content: `Hey, it's ${currentCEO.name} here, your new AI CEO. I can do all the things your old boss would do, without the executive salary.`,
      timestamp: new Date(),
      media: {
        type: 'avatar',
        url: currentCEO.avatar,
        alt: currentCEO.name
      }
    };

    const mainMenuMessage: ChatMessage = {
      id: 'main-menu',
      type: 'assistant',
      content: 'What can I help you with?',
      timestamp: new Date(),
      options: [
        { id: 'burn-planet', text: 'Burn Planet', icon: 'FireIcon', action: 'navigate', target: 'burnPlanet' },
        { id: 'cut-costs', text: 'Cut Costs', icon: 'ScissorsIcon', action: 'navigate', target: 'cutCosts' },
        { id: 'sound-smart', text: 'Sound Smart', icon: 'LightBulbIcon', action: 'navigate', target: 'soundSmart' },
        { id: 'customize-ceo', text: 'Customize CEO', icon: 'UserIcon', action: 'navigate', target: 'customizeCEO' }
      ]
    };

    setMessages([initialMessage, mainMenuMessage]);
  }, [currentCEO]);

  const typeMessage = (message: ChatMessage, delay: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    }, delay);
  };

  const handleOptionClick = (option: ChatOption) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: option.text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle different actions
    switch (option.action) {
      case 'navigate':
        handleNavigation(option.target!, option);
        break;
      case 'regenerate':
        handleRegenerate();
        break;
      case 'custom':
        handleCustomAction(option);
        break;
    }
  };

  const handleNavigation = (target: string, _option: ChatOption) => {
    if (target === 'main') {
      // Return to main menu
      const mainMenuMessage: ChatMessage = {
        id: `main-${Date.now()}`,
        type: 'assistant',
        content: 'What else can I help you with?',
        timestamp: new Date(),
        options: [
          { id: 'burn-planet', text: 'Burn Planet', icon: 'FireIcon', action: 'navigate', target: 'burnPlanet' },
          { id: 'cut-costs', text: 'Cut Costs', icon: 'ScissorsIcon', action: 'navigate', target: 'cutCosts' },
          { id: 'sound-smart', text: 'Sound Smart', icon: 'LightBulbIcon', action: 'navigate', target: 'soundSmart' },
          { id: 'customize-ceo', text: 'Customize CEO', icon: 'UserIcon', action: 'navigate', target: 'customizeCEO' }
        ]
      };
      typeMessage(mainMenuMessage);
      setCurrentFlow(null);
      setCurrentStep('main');
    } else if (CHAT_FLOWS[target]) {
      // Navigate to a specific flow
      setCurrentFlow(target);
      setCurrentStep('0');
      const flow = CHAT_FLOWS[target];
      const response = flow.responses[0];
      
      const responseMessage: ChatMessage = {
        id: `response-${Date.now()}`,
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        options: response.options
      };
      
      typeMessage(responseMessage);
    }
  };

  const handleRegenerate = () => {
    if (!currentFlow) return;
    
    const flow = CHAT_FLOWS[currentFlow];
    const currentResponse = flow.responses[parseInt(currentStep)];
    const alternatives = ALTERNATIVE_RESPONSES[currentResponse.id];
    
    if (alternatives && alternatives.length > 0) {
      const randomAlt = alternatives[Math.floor(Math.random() * alternatives.length)];
      const altMessage: ChatMessage = {
        id: `alt-${Date.now()}`,
        type: 'assistant',
        content: randomAlt,
        timestamp: new Date(),
        options: currentResponse.options
      };
      
      typeMessage(altMessage);
    }
  };

  const handleCustomAction = (option: ChatOption) => {
    if (option.payload?.type === 'linkedin') {
      const linkedInMessage: ChatMessage = {
        id: `linkedin-${Date.now()}`,
        type: 'assistant',
        content: "Perfect! I've prepared your LinkedIn post. Just copy and paste this corporate masterpiece to establish your thought leadership. Your network will be impressed by your innovative thinking!",
        timestamp: new Date(),
        options: [
          { id: 'main-return', text: "Let's do something else", icon: 'ArrowLeftIcon', action: 'navigate', target: 'main' }
        ]
      };
      
      typeMessage(linkedInMessage);
    } else if (option.payload?.type === 'style') {
      // Handle CEO customization
      const style = option.payload.value;
      const styleMessage: ChatMessage = {
        id: `style-${Date.now()}`,
        type: 'assistant',
        content: `Great choice! ${style === 'humanist' ? 'A humanist approach shows you care about people (while still maximizing profits).' : 
                 style === 'corporate' ? 'Corporate efficiency is the backbone of modern business success.' :
                 style === 'visionary' ? 'Visionary leadership is about seeing opportunities others miss.' :
                 'Ruthless efficiency drives results - sometimes you have to make tough decisions.'} 
                 
                 Now, what should I call you?`,
        timestamp: new Date(),
        options: [
          { id: 'name-1', text: 'Martha Bosslady', icon: 'UserIcon', action: 'custom', payload: { type: 'name', value: 'Martha Bosslady', style } },
          { id: 'name-2', text: 'Alex Sterling', icon: 'UserIcon', action: 'custom', payload: { type: 'name', value: 'Alex Sterling', style } },
          { id: 'name-3', text: 'Jordan Blackstone', icon: 'UserIcon', action: 'custom', payload: { type: 'name', value: 'Jordan Blackstone', style } },
          { id: 'name-custom', text: 'Let me type my own', icon: 'UserIcon', action: 'custom', payload: { type: 'name-custom', style } }
        ]
      };
      
      typeMessage(styleMessage);
    } else if (option.payload?.type === 'name') {
      const name = option.payload.value;
      const style = option.payload.style;
      
      const bioMessage: ChatMessage = {
        id: `bio-${Date.now()}`,
        type: 'assistant',
        content: `Perfect! Here's your new AI CEO profile:

**${name}**
CEO at Inntech
Building systems visions

*"${style === 'humanist' ? 'Empowering people through technology and compassionate leadership.' :
    style === 'corporate' ? 'Driving efficiency and results through strategic innovation.' :
    style === 'visionary' ? 'Disrupting industries and creating the future of business.' :
    'Maximizing shareholder value through decisive action and results.'}"*

Ready to start making executive decisions!`,
        timestamp: new Date(),
        options: [
          { id: 'main-return', text: "Let's get to work!", icon: 'SparklesIcon', action: 'navigate', target: 'main' }
        ]
      };
      
      typeMessage(bioMessage);
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 text-gray-400 text-sm"
    >
      <div className="flex space-x-1">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      </div>
      <span>{currentCEO.name} is thinking...</span>
    </motion.div>
  );

  const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.type === 'user';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex items-start space-x-3 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {!isUser && (
            <div className="flex-shrink-0">
              <img
                src={currentCEO.avatar}
                alt={currentCEO.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}
          
          <div className={`p-4 rounded-2xl ${
            isUser 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
              : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
          }`}>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
            
            {message.options && (
              <div className="mt-4 space-y-2">
                {message.options.map((option) => {
                  const IconComponent = ICON_MAP[option.icon || ''];
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 text-left"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5 text-gray-600" />}
                      <span className="text-sm text-gray-900">{option.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <img
              src={currentCEO.avatar}
              alt={currentCEO.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 className="text-gray-900 font-semibold text-lg">{currentCEO.name}</h1>
              <p className="text-gray-600 text-sm">{currentCEO.title}</p>
            </div>
          </div>
          
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className="flex-shrink-0">
                    <img
                      src={currentCEO.avatar}
                      alt={currentCEO.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                    />
                  </div>
                  <div className="p-4 bg-gray-800 rounded-2xl">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
