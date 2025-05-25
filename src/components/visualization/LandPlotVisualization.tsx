import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface LandPlotVisualizationProps {
  width: number;
  length: number;
  shape: 'rectangular' | 'square' | 'irregular';
  houseModelPath: string; // Path to the 3D house model
}

const LandPlotVisualization: React.FC<LandPlotVisualizationProps> = ({ width, length, shape, houseModelPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(100, 10, 0xcccccc, 0xeeeeee);
    scene.add(gridHelper);

    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create land plot geometry
    let geometry: THREE.Shape;
    if (shape === 'rectangular' || shape === 'square') {
      geometry = new THREE.Shape();
      geometry.moveTo(0, 0);
      geometry.lineTo(width, 0);
      geometry.lineTo(width, length);
      geometry.lineTo(0, length);
      geometry.lineTo(0, 0);
    } else if (shape === 'irregular') {
      geometry = new THREE.Shape();
      geometry.moveTo(0, length * 0.3);
      geometry.lineTo(width * 0.2, 0);
      geometry.lineTo(width * 0.8, 0);
      geometry.lineTo(width, length * 0.3);
      geometry.lineTo(width * 0.7, length);
      geometry.lineTo(width * 0.3, length);
      geometry.lineTo(0, length * 0.3);
    }

    const extrudeSettings = { depth: 0.1, bevelEnabled: false };
    const landGeometry = new THREE.ExtrudeGeometry(geometry, extrudeSettings);
    const landMaterial = new THREE.MeshStandardMaterial({ color: 0x2563eb, transparent: true, opacity: 0.8 });
    const landMesh = new THREE.Mesh(landGeometry, landMaterial);
    landMesh.rotation.x = -Math.PI / 2;
    scene.add(landMesh);

    // Add compass
    const compassRadius = 5;
    const compassGeometry = new THREE.CircleGeometry(compassRadius, 32);
    const compassMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const compass = new THREE.Mesh(compassGeometry, compassMaterial);
    compass.position.set(width / 2 + 10, 0.1, length / 2 + 10);
    compass.rotation.x = -Math.PI / 2;
    scene.add(compass);

    // Add compass directions
    const compassText = (text: string, x: number, z: number) => {
      const loader = new THREE.FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new THREE.TextGeometry(text, {
          font: font,
          size: 0.5,
          height: 0.1,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x111827 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(x, 0.2, z);
        scene.add(textMesh);
      });
    };

    compassText('N', compass.position.x, compass.position.z - compassRadius);
    compassText('S', compass.position.x, compass.position.z + compassRadius);
    compassText('E', compass.position.x + compassRadius, compass.position.z);
    compassText('W', compass.position.x - compassRadius, compass.position.z);

    // Add house model
    const loader = new GLTFLoader();
    loader.load(houseModelPath, (gltf) => {
      const house = gltf.scene;
      house.position.set(width / 2, 0.1, length / 2); // Center the house on the plot
      house.scale.set(5, 5, 5); // Adjust the scale of the house
      scene.add(house);
    });

    // Set up camera position
    camera.position.set(width / 2, Math.max(width, length), length * 1.5);
    camera.lookAt(width / 2, 0, length / 2);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, [width, length, shape, houseModelPath]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Land Plot Visualization</h3>
      <div ref={containerRef} style={{ width: '100%', height: '500px' }} />
      <p className="text-sm text-gray-500 mt-2">
        Note: This is a simplified 3D visualization. Actual plot and house may vary.
      </p>
    </div>
  );
};

export default LandPlotVisualization;