// Types for the chatbot system
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  media?: {
    type: 'image' | 'avatar';
    url: string;
    alt?: string;
  };
}

export interface ChatOption {
  id: string;
  text: string;
  icon?: string; // Icon component name from heroicons
  action: 'navigate' | 'regenerate' | 'custom';
  target?: string; // For navigation
  payload?: any; // Additional data
}

export interface CEOPersona {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  style: 'humanist' | 'corporate' | 'visionary' | 'ruthless';
  bio: string;
}

export interface ChatFlow {
  id: string;
  title: string;
  description: string;
  icon: string;
  responses: ChatResponse[];
}

export interface ChatResponse {
  id: string;
  content: string;
  options: ChatOption[];
  conditions?: {
    persona?: string;
    style?: string;
  };
}
