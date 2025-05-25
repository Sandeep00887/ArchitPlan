import React, { useState } from 'react';
import { Ruler, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import { LandMeasurement } from '../../types';
import LandPlotVisualization from '../visualization/LandPlotVisualization';

interface LandMeasurementFormProps {
  onSubmit: (measurement: LandMeasurement) => void;
}

const LandMeasurementForm: React.FC<LandMeasurementFormProps> = ({ onSubmit }) => {
  const [width, setWidth] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [shape, setShape] = useState<'rectangular' | 'square' | 'irregular'>('rectangular');
  const [slope, setSlope] = useState<'flat' | 'gentle' | 'steep'>('flat');
  
  const [errors, setErrors] = useState<{
    width?: string;
    length?: string;
  }>({});
  
  const calculateArea = (): number => {
    if (typeof width === 'number' && typeof length === 'number') {
      return width * length;
    }
    return 0;
  };
  
  const validateForm = (): boolean => {
    const newErrors: {width?: string; length?: string} = {};
    
    if (width === '') {
      newErrors.width = 'Width is required';
    } else if (width <= 0) {
      newErrors.width = 'Width must be greater than 0';
    }
    
    if (length === '') {
      newErrors.length = 'Length is required';
    } else if (length <= 0) {
      newErrors.length = 'Length must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // If we got here, we know width and length are numbers
    const measurement: LandMeasurement = {
      width: width as number,
      length: length as number,
      area: calculateArea(),
      shape,
      slope
    };
    
    onSubmit(measurement);
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Land Measurements</h2>
        <p className="text-gray-500 mt-1">Enter the dimensions of your land</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Width (meters)"
              type="number"
              value={width === '' ? '' : width.toString()}
              onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
              error={errors.width}
              leftIcon={<Ruler size={18} className="text-gray-400" />}
              placeholder="Enter width"
              fullWidth
            />
            
            <Input
              label="Length (meters)"
              type="number"
              value={length === '' ? '' : length.toString()}
              onChange={(e) => setLength(e.target.value === '' ? '' : Number(e.target.value))}
              error={errors.length}
              leftIcon={<Ruler size={18} className="text-gray-400" />}
              placeholder="Enter length"
              fullWidth
            />
            
            <Select
              label="Land Shape"
              options={[
                { value: 'rectangular', label: 'Rectangular' },
                { value: 'square', label: 'Square' },
                { value: 'irregular', label: 'Irregular' }
              ]}
              value={shape}
              onChange={(value) => setShape(value as 'rectangular' | 'square' | 'irregular')}
              fullWidth
            />
            
            <Select
              label="Terrain Slope"
              options={[
                { value: 'flat', label: 'Flat' },
                { value: 'gentle', label: 'Gentle Slope' },
                { value: 'steep', label: 'Steep Slope' }
              ]}
              value={slope}
              onChange={(value) => setSlope(value as 'flat' | 'gentle' | 'steep')}
              fullWidth
            />
          </div>
          
          {width && length && width > 0 && length > 0 && (
            <div className="mt-6">
              <p className="text-gray-700 font-medium">Total Area: <span className="font-bold">{calculateArea()} square meters</span></p>
              
              <div className="mt-4">
                <LandPlotVisualization 
                  width={typeof width === 'number' ? width : 0} 
                  length={typeof length === 'number' ? length : 0}
                  shape={shape}
                  houseModelPath="/models/house.gltf"
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          rightIcon={<ArrowRight size={18} />}
        >
          Continue to Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LandMeasurementForm;