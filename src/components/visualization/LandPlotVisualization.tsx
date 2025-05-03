import React, { useRef, useEffect } from 'react';

interface LandPlotVisualizationProps {
  width: number;
  length: number;
  shape: 'rectangular' | 'square' | 'irregular';
}

const LandPlotVisualization: React.FC<LandPlotVisualizationProps> = ({ width, length, shape }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions and padding
    const padding = 40;
    const maxDimension = Math.max(width, length);
    const scale = (canvas.width - padding * 2) / maxDimension;
    
    // Calculate scaled dimensions
    const scaledWidth = width * scale;
    const scaledLength = length * scale;
    
    // Calculate starting position to center the plot
    const startX = (canvas.width - scaledWidth) / 2;
    const startY = (canvas.height - scaledLength) / 2;
    
    // Draw based on shape
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2563eb'; // Blue
    ctx.fillStyle = 'rgba(219, 234, 254, 0.6)'; // Light blue, semi-transparent
    
    ctx.beginPath();
    
    if (shape === 'rectangular' || shape === 'square') {
      // Draw rectangle or square
      ctx.rect(startX, startY, scaledWidth, scaledLength);
    } else if (shape === 'irregular') {
      // Draw irregular shape (simplified as a pentagon)
      ctx.moveTo(startX, startY + scaledLength * 0.3);
      ctx.lineTo(startX + scaledWidth * 0.2, startY);
      ctx.lineTo(startX + scaledWidth * 0.8, startY);
      ctx.lineTo(startX + scaledWidth, startY + scaledLength * 0.3);
      ctx.lineTo(startX + scaledWidth * 0.7, startY + scaledLength);
      ctx.lineTo(startX + scaledWidth * 0.3, startY + scaledLength);
      ctx.closePath();
    }
    
    ctx.fill();
    ctx.stroke();
    
    // Draw dimensions
    ctx.fillStyle = '#1e40af'; // Darker blue
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    // Width label
    ctx.fillText(
      `${width}m`,
      startX + scaledWidth / 2,
      startY + scaledLength + 25
    );
    
    // Length label (rotated)
    ctx.save();
    ctx.translate(startX - 25, startY + scaledLength / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${length}m`, 0, 0);
    ctx.restore();
    
    // Add grid lines
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)'; // Light gray
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    const gridStep = maxDimension / 10;
    for (let i = 1; i < 10; i++) {
      const x = startX + (gridStep * i) * scale;
      if (x < startX + scaledWidth) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + scaledLength);
        ctx.stroke();
      }
    }
    
    // Horizontal grid lines
    for (let i = 1; i < 10; i++) {
      const y = startY + (gridStep * i) * scale;
      if (y < startY + scaledLength) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + scaledWidth, y);
        ctx.stroke();
      }
    }
    
    // Add compass indicator
    const compassRadius = 20;
    const compassX = startX + scaledWidth - compassRadius - 10;
    const compassY = startY + compassRadius + 10;
    
    // Draw compass circle
    ctx.beginPath();
    ctx.arc(compassX, compassY, compassRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw N, S, E, W
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', compassX, compassY - compassRadius + 8);
    ctx.fillText('S', compassX, compassY + compassRadius - 8);
    ctx.fillText('E', compassX + compassRadius - 8, compassY);
    ctx.fillText('W', compassX - compassRadius + 8, compassY);
    
    // Draw compass needle
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - compassRadius + 10);
    ctx.lineTo(compassX - 4, compassY);
    ctx.lineTo(compassX, compassY + 5);
    ctx.lineTo(compassX + 4, compassY);
    ctx.closePath();
    ctx.fillStyle = '#ef4444'; // Red
    ctx.fill();
    
    // Add area text at the center
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      `Area: ${width * length}m²`,
      startX + scaledWidth / 2,
      startY + scaledLength / 2
    );
    
  }, [width, length, shape]);
  
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Land Plot Visualization</h3>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={300}
        className="w-full h-auto"
      />
      <p className="text-sm text-gray-500 mt-2">
        Note: This is a simplified visualization. Actual plot may vary.
      </p>
    </div>
  );
};

export default LandPlotVisualization;