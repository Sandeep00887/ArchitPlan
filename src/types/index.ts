export interface LandMeasurement {
  width: number;
  length: number;
  area: number;
  shape: 'rectangular' | 'square' | 'irregular';
  slope: 'flat' | 'gentle' | 'steep';
}

export interface HousePreferences {
  style: 'modern' | 'traditional' | 'minimalist' | 'colonial' | 'craftsman';
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: boolean;
  outdoorSpace: 'small' | 'medium' | 'large';
  budget: 'low' | 'medium' | 'high' | 'luxury';
}

export interface HouseDesign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  features: string[];
  estimatedCost: string;
  createdAt: Date;
}

export interface HistoryItem {
  id: string;
  landMeasurement: LandMeasurement;
  preferences: HousePreferences;
  designs: HouseDesign[];
  createdAt: Date;
}