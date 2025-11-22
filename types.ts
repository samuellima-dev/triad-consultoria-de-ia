import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface CaseStudy {
  client: string;
  sector: string;
  metric: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export interface SiteConfig {
  showHero: boolean;
  showDiagnostic: boolean;
  showMethodology: boolean;
  showServices: boolean;
  showCases: boolean;
  showContact: boolean;
}