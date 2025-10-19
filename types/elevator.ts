export interface ElevatorModel {
  id: string;
  name: string;
  type: 'G+1' | 'G+2' | 'G+3';
  category: 'Classic' | 'Ultra';
  sizes: string[];
  doorType: 'Manual' | 'Auto';
  enclosure: 'ACP' | 'Glass-1Side' | 'Glass-2Sides';
  basePrice: number;
  description: string;
  features: string[];
}

export interface CabinOption {
  id: string;
  name: string;
  material: 'MS' | 'SS' | 'Gold';
  description: string;
  priceModifier: number;
}

export interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

export interface QuoteRequest {
  model: string;
  size: string;
  doorType: string;
  enclosure: string;
  accessories: string[];
  customerName: string;
  phone: string;
  email: string;
  address: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}