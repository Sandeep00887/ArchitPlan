import React from 'react';
import { Download, Heart, Share2 } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { HouseDesign } from '../../types';

interface HouseDesignGalleryProps {
  designs: HouseDesign[];
  onBack: () => void;
  onExport: (design: HouseDesign) => void;
}

const HouseDesignGallery: React.FC<HouseDesignGalleryProps> = ({ 
  designs, 
  onBack, 
  onExport 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your House Designs</h2>
          <p className="text-gray-600 mt-1">Based on your specifications, we've created these designs for you</p>
        </div>
        <Button variant="outline" onClick={onBack} className="mt-4 sm:mt-0">
          Modify Requirements
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((design) => (
          <DesignCard 
            key={design.id} 
            design={design} 
            onExport={() => onExport(design)} 
          />
        ))}
      </div>
    </div>
  );
};

interface DesignCardProps {
  design: HouseDesign;
  onExport: () => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, onExport }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={design.imageUrl} 
          alt={design.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
            <Heart size={16} className="text-gray-700" />
          </button>
          <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
            <Share2 size={16} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mt-2">{design.title}</h3>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {design.bedrooms} Bedrooms
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {design.bathrooms} Bathrooms
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {design.floors} {design.floors === 1 ? 'Floor' : 'Floors'}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {design.squareFootage} m²
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mt-3">{design.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Key Features:</h4>
          <ul className="mt-1 text-sm text-gray-600 space-y-1">
            {design.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
            {design.features.length > 3 && (
              <li className="text-blue-600 text-xs cursor-pointer hover:underline">
                + {design.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">Estimated Cost</p>
            <p className="text-lg font-bold text-blue-700">{design.estimatedCost}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Download size={16} />}
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseDesignGallery;