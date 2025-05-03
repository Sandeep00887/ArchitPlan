import { HouseDesign, HousePreferences, LandMeasurement } from "../types";
import { v4 as uuidv4 } from 'uuid';

// Mock data for house design images
const designImages = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

// Design style descriptions
const styleDescriptions = {
  modern: "Clean lines, minimalist aesthetics, open floor plans, and integration with natural surroundings.",
  traditional: "Classic design elements, symmetrical facades, and formal room layouts that create a timeless appeal.",
  minimalist: "Simplified forms, monochromatic color schemes, and elimination of excess elements for serene living spaces.",
  colonial: "Symmetrical design, decorative crown moldings, grand entrances, and traditional room arrangements.",
  craftsman: "Hand-crafted details, natural materials, wide eaves, and cozy interior spaces with built-in features."
};

// Feature sets based on preferences
const getFeatures = (preferences: HousePreferences, landSize: number): string[] => {
  const baseFeatures: Record<string, string[]> = {
    modern: [
      "Floor-to-ceiling windows",
      "Open concept living areas",
      "Smart home technology integration",
      "Sustainable building materials"
    ],
    traditional: [
      "Formal dining room",
      "Traditional fireplace",
      "Crown molding",
      "Wainscoting details"
    ],
    minimalist: [
      "Hidden storage solutions",
      "Neutral color palette",
      "Multi-functional spaces",
      "Streamlined fixtures"
    ],
    colonial: [
      "Grand entrance foyer",
      "Symmetrical window placement",
      "Decorative columns",
      "Central staircase"
    ],
    craftsman: [
      "Exposed wooden beams",
      "Built-in cabinetry",
      "Stone fireplaces",
      "Covered front porch"
    ]
  };
  
  const budgetFeatures: Record<string, string[]> = {
    low: [
      "Energy-efficient appliances",
      "Standard finishes",
      "Practical layout"
    ],
    medium: [
      "Granite countertops",
      "Hardwood floors in main areas",
      "Walk-in closets"
    ],
    high: [
      "Custom cabinetry",
      "Premium finishes throughout",
      "Large master suite with spa bath"
    ],
    luxury: [
      "Home theater room",
      "Wine cellar",
      "Custom architectural details",
      "Heated floors"
    ]
  };
  
  const outdoorFeatures: Record<string, string[]> = {
    small: [
      "Cozy patio space",
      "Low-maintenance landscaping"
    ],
    medium: [
      "Outdoor dining area",
      "Garden spaces",
      "Landscaped yard"
    ],
    large: [
      "Swimming pool",
      "Outdoor kitchen",
      "Extensive gardens",
      "Multiple entertainment zones"
    ]
  };
  
  // Combine features based on preferences
  const features = [
    ...baseFeatures[preferences.style],
    ...budgetFeatures[preferences.budget],
    ...outdoorFeatures[preferences.outdoorSpace]
  ];
  
  // Add garage if selected
  if (preferences.garage) {
    features.push(`${preferences.floors > 1 ? 'Attached' : 'Integrated'} garage`);
  }
  
  // Add features based on land size
  if (landSize > 500) {
    features.push("Large backyard");
  }
  
  // Add floor-specific features
  if (preferences.floors > 1) {
    features.push("Primary bedroom suite on second floor");
  } else {
    features.push("Single-level living for convenience");
  }
  
  return features;
};

// Calculate estimated cost
const calculateEstimatedCost = (
  preferences: HousePreferences, 
  squareFootage: number
): string => {
  // Base cost per square meter based on budget level
  const baseCostPerSqm = {
    low: 1200,
    medium: 1800,
    high: 2500,
    luxury: 3500
  };
  
  // Adjustments based on style (percentage increase)
  const styleMultiplier = {
    modern: 1.1,
    traditional: 1.0,
    minimalist: 0.95,
    colonial: 1.15,
    craftsman: 1.2
  };
  
  // Additional cost for extra floors
  const floorMultiplier = 1 + (preferences.floors - 1) * 0.15;
  
  // Calculate total estimated cost
  const baseAmount = baseCostPerSqm[preferences.budget];
  const adjustedAmount = baseAmount * styleMultiplier[preferences.style] * floorMultiplier;
  const totalCost = adjustedAmount * squareFootage;
  
  // Format the cost as currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalCost);
};

// Get design titles based on preferences
const getDesignTitle = (preferences: HousePreferences): string => {
  const styleNames = {
    modern: ["Contemporary", "Urban", "Sleek", "Modernist"],
    traditional: ["Heritage", "Classic", "Timeless", "Elegant"],
    minimalist: ["Essential", "Pure", "Simple", "Zen"],
    colonial: ["Grand Colonial", "Heritage", "Stately", "Traditional"],
    craftsman: ["Artisan", "Handcrafted", "Rustic", "Naturalist"]
  };
  
  const styleName = styleNames[preferences.style][Math.floor(Math.random() * styleNames[preferences.style].length)];
  const sizeName = preferences.bedrooms <= 2 ? "Compact" : preferences.bedrooms >= 4 ? "Spacious" : "Balanced";
  
  return `${styleName} ${sizeName} ${preferences.floors > 1 ? "Multi-Level" : "Single-Story"} Home`;
};

/**
 * Generate house designs based on land measurements and preferences
 */
export const generateHouseDesigns = async (
  landMeasurement: LandMeasurement,
  preferences: HousePreferences
): Promise<HouseDesign[]> => {
  // In a real application, this would call an API service
  // For this demo, we'll generate mock designs
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Number of designs to generate (would be based on API response in real app)
  const numDesigns = 3;
  const designs: HouseDesign[] = [];
  
  // Calculate appropriate square footage based on land size and preferences
  const totalLandArea = landMeasurement.area;
  // Typically, house footprint is 30-50% of the total land area
  const maxFootprint = totalLandArea * 0.4;
  
  for (let i = 0; i < numDesigns; i++) {
    // Base square footage calculation with some variation
    const baseFootprint = maxFootprint * (0.7 + Math.random() * 0.3);
    
    // Multi-floor buildings have smaller footprints but larger total area
    const footprint = baseFootprint / Math.sqrt(preferences.floors);
    const totalSquareFootage = footprint * preferences.floors;
    
    // Add variation between designs
    const variationFactor = 0.9 + Math.random() * 0.2;
    const adjustedSquareFootage = Math.round(totalSquareFootage * variationFactor);
    
    // Get features for this design
    const features = getFeatures(preferences, landMeasurement.area);
    
    // Create the design
    designs.push({
      id: uuidv4(),
      title: getDesignTitle(preferences),
      description: `This ${preferences.style} home is designed to maximize your ${landMeasurement.area}m² ${landMeasurement.shape} plot. ${styleDescriptions[preferences.style]}`,
      imageUrl: designImages[i % designImages.length],
      squareFootage: adjustedSquareFootage,
      bedrooms: preferences.bedrooms,
      bathrooms: preferences.bathrooms,
      floors: preferences.floors,
      features: features,
      estimatedCost: calculateEstimatedCost(preferences, adjustedSquareFootage),
      createdAt: new Date()
    });
  }
  
  return designs;
};

/**
 * Export design as JSON
 */
export const exportDesignAsJson = (design: HouseDesign): void => {
  const jsonString = JSON.stringify(design, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${design.title.replace(/\s+/g, '_').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};