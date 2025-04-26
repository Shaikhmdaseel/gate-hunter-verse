
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';

interface ThreeDungeonProps {
  gateLevel: 'D' | 'C' | 'B' | 'A' | 'S';
  timeRemaining?: number;
}

const getGateColor = (level: 'D' | 'C' | 'B' | 'A' | 'S'): string => {
  const colors = {
    'D': '#3498db',
    'C': '#2ecc71',
    'B': '#f39c12',
    'A': '#c0392b',
    'S': '#8e44ad',
  };
  return colors[level];
};

export default function ThreeDungeon({ gateLevel = 'D', timeRemaining }: ThreeDungeonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0f0f13');
    
    // Add fog for atmosphere
    scene.fog = new THREE.Fog('#0f0f13', 5, 15);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Create portal/gate
    const portalGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const portalMaterial = new THREE.MeshStandardMaterial({ 
      color: getGateColor(gateLevel),
      emissive: getGateColor(gateLevel),
      emissiveIntensity: 0.5,
      metalness: 0.7,
      roughness: 0.2,
    });
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.castShadow = true;
    scene.add(portal);
    
    // Create inner portal glow
    const portalLight = new THREE.PointLight(getGateColor(gateLevel), 2, 10);
    portalLight.position.set(0, 0, 0);
    scene.add(portalLight);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111, 
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const time = Date.now() * 0.001;
      
      // Rotate portal
      if (portal) {
        portal.rotation.z = time * 0.5;
        portal.rotation.x = Math.sin(time * 0.3) * 0.2;
        portal.rotation.y = Math.cos(time * 0.4) * 0.2;
        
        // Pulse effect
        const pulseScale = 1 + 0.05 * Math.sin(time * 2);
        portal.scale.set(pulseScale, pulseScale, 1);
        
        // Adjust light intensity for pulsing effect
        portalLight.intensity = 1.5 + 0.5 * Math.sin(time * 2);
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
      
      // Dispose of resources
      if (portalGeometry) portalGeometry.dispose();
      if (portalMaterial) portalMaterial.dispose();
      if (floorGeometry) floorGeometry.dispose();
      if (floorMaterial) floorMaterial.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [gateLevel]);
  
  return (
    <Card className="glass-card overflow-hidden border-accent/20">
      <CardContent className="p-0">
        <div className="relative">
          <div ref={containerRef} className="w-full h-[300px]"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">{gateLevel}-Rank Gate</h3>
                <p className="text-muted-foreground text-sm">Hunter Entry Authorized</p>
              </div>
              {timeRemaining && (
                <div className="bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-mono">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
