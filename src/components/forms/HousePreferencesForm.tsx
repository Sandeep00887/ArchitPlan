import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Bed, Bath, Building, Car, Tree, Wallet } from 'lucide-react';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import { HousePreferences, LandMeasurement } from '../../types';

interface HousePreferencesFormProps {
  landMeasurement: LandMeasurement;
  onBack: () => void;
  onSubmit: (preferences: HousePreferences) => void;
}

const HousePreferencesForm: React.FC<HousePreferencesFormProps> = ({ 
  landMeasurement, 
  onBack, 
  onSubmit 
}) => {
  const [style, setStyle] = useState<'modern' | 'traditional' | 'minimalist' | 'colonial' | 'craftsman'>('modern');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [floors, setFloors] = useState<number>(1);
  const [garage, setGarage] = useState<boolean>(true);
  const [outdoorSpace, setOutdoorSpace] = useState<'small' | 'medium' | 'large'>('medium');
  const [budget, setBudget] = useState<'low' | 'medium' | 'high' | 'luxury'>('medium');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const preferences: HousePreferences = {
      style,
      bedrooms,
      bathrooms,
      floors,
      garage,
      outdoorSpace,
      budget
    };
    
    onSubmit(preferences);
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">House Preferences</h2>
        <p className="text-gray-500 mt-1">
          Customize your dream home for a {landMeasurement.area} square meter plot
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="House Style"
              options={[
                { value: 'modern', label: 'Modern' },
                { value: 'traditional', label: 'Traditional' },
                { value: 'minimalist', label: 'Minimalist' },
                { value: 'colonial', label: 'Colonial' },
                { value: 'craftsman', label: 'Craftsman' }
              ]}
              value={style}
              onChange={(value) => setStyle(value as any)}
              fullWidth
            />
            
            <Select
              label="Number of Bedrooms"
              options={[
                { value: '1', label: '1 Bedroom' },
                { value: '2', label: '2 Bedrooms' },
                { value: '3', label: '3 Bedrooms' },
                { value: '4', label: '4 Bedrooms' },
                { value: '5', label: '5+ Bedrooms' }
              ]}
              value={bedrooms.toString()}
              onChange={(value) => setBedrooms(parseInt(value, 10))}
              fullWidth
            />
            
            <Select
              label="Number of Bathrooms"
              options={[
                { value: '1', label: '1 Bathroom' },
                { value: '2', label: '2 Bathrooms' },
                { value: '3', label: '3 Bathrooms' },
                { value: '4', label: '4+ Bathrooms' }
              ]}
              value={bathrooms.toString()}
              onChange={(value) => setBathrooms(parseInt(value, 10))}
              fullWidth
            />
            
            <Select
              label="Number of Floors"
              options={[
                { value: '1', label: 'Single Story' },
                { value: '2', label: 'Two Stories' },
                { value: '3', label: 'Three Stories' }
              ]}
              value={floors.toString()}
              onChange={(value) => setFloors(parseInt(value, 10))}
              fullWidth
            />
            
            <Select
              label="Garage"
              options={[
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' }
              ]}
              value={garage.toString()}
              onChange={(value) => setGarage(value === 'true')}
              fullWidth
            />
            
            <Select
              label="Outdoor Space"
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
              value={outdoorSpace}
              onChange={(value) => setOutdoorSpace(value as any)}
              fullWidth
            />
            
            <Select
              label="Budget"
              options={[
                { value: 'low', label: 'Economic' },
                { value: 'medium', label: 'Standard' },
                { value: 'high', label: 'Premium' },
                { value: 'luxury', label: 'Luxury' }
              ]}
              value={budget}
              onChange={(value) => setBudget(value as any)}
              fullWidth
              className="md:col-span-2"
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        
        <Button
          type="button"
          onClick={handleSubmit}
          rightIcon={<ArrowRight size={18} />}
        >
          Generate Designs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HousePreferencesForm;