
// Import React to provide the React namespace for React.ReactNode
import React from 'react';

export type Theme = 'dark' | 'light';

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}