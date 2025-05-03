import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandMeasurementForm from './components/forms/LandMeasurementForm';
import HousePreferencesForm from './components/forms/HousePreferencesForm';
import HouseDesignGallery from './components/visualization/HouseDesignGallery';
import HistorySidebar from './components/history/HistorySidebar';
import { LandMeasurement, HousePreferences, HouseDesign, HistoryItem } from './types';
import { generateHouseDesigns, exportDesignAsJson } from './services/designService';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Application state
  const [step, setStep] = useState<'land' | 'preferences' | 'designs'>('land');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [landMeasurement, setLandMeasurement] = useState<LandMeasurement | null>(null);
  const [preferences, setPreferences] = useState<HousePreferences | null>(null);
  const [designs, setDesigns] = useState<HouseDesign[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  
  // Handle land measurement submission
  const handleLandMeasurementSubmit = (measurement: LandMeasurement) => {
    setLandMeasurement(measurement);
    setStep('preferences');
  };
  
  // Handle house preferences submission
  const handlePreferencesSubmit = async (prefs: HousePreferences) => {
    if (!landMeasurement) return;
    
    setPreferences(prefs);
    setIsLoading(true);
    
    try {
      // Generate designs based on measurements and preferences
      const generatedDesigns = await generateHouseDesigns(landMeasurement, prefs);
      setDesigns(generatedDesigns);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: uuidv4(),
        landMeasurement,
        preferences: prefs,
        designs: generatedDesigns,
        createdAt: new Date()
      };
      
      setHistory(prev => [historyItem, ...prev]);
      setStep('designs');
    } catch (error) {
      console.error('Error generating designs:', error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle going back to land measurement form
  const handleBackToLand = () => {
    setStep('land');
  };
  
  // Handle going back to preferences form
  const handleBackToPreferences = () => {
    setStep('preferences');
  };
  
  // Handle export of a design
  const handleExportDesign = (design: HouseDesign) => {
    exportDesignAsJson(design);
  };
  
  // Handle export of a history item
  const handleExportHistoryItem = (item: HistoryItem) => {
    const jsonString = JSON.stringify(item, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `design_history_${item.createdAt.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Handle selecting a history item
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setLandMeasurement(item.landMeasurement);
    setPreferences(item.preferences);
    setDesigns(item.designs);
    setStep('designs');
    setIsHistoryOpen(false);
  };
  
  // Toggle history sidebar
  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onToggleHistory={toggleHistory} />
      
      <main className="flex-grow py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-700">Generating your dream home designs...</p>
          </div>
        ) : (
          <>
            {step === 'land' && (
              <div className="container mx-auto px-4">
                <LandMeasurementForm onSubmit={handleLandMeasurementSubmit} />
              </div>
            )}
            
            {step === 'preferences' && landMeasurement && (
              <div className="container mx-auto px-4">
                <HousePreferencesForm 
                  landMeasurement={landMeasurement}
                  onBack={handleBackToLand}
                  onSubmit={handlePreferencesSubmit}
                />
              </div>
            )}
            
            {step === 'designs' && designs.length > 0 && (
              <HouseDesignGallery 
                designs={designs}
                onBack={handleBackToPreferences}
                onExport={handleExportDesign}
              />
            )}
          </>
        )}
      </main>
      
      <HistorySidebar 
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onSelectItem={handleSelectHistoryItem}
        onExport={handleExportHistoryItem}
      />
      
      <Footer />
    </div>
  );
}

export default App;