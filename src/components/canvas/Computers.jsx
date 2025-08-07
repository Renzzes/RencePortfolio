import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const getScreenConfig = (width) => {
  if (width < 500) return { scale: 0.6, position: [0, -3.25, -2.2], fov: 30 }; // Mobile
  if (width < 768) return { scale: 0.65, position: [0, -3.5, -2.0], fov: 28 }; // Tablet Small
  if (width < 1024) return { scale: 0.7, position: [0, -3.6, -1.8], fov: 26 }; // Tablet Large
  if (width < 1280) return { scale: 0.75, position: [0, -3.7, -1.6], fov: 25 }; // Laptop
  return { scale: 0.75, position: [0, -3.8, -1.5], fov: 25 }; // Desktop
};

const Computers = ({ screenConfig }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = React.useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [elapsedTime, setElapsedTime] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    setElapsedTime(prev => prev + delta);
    const floatOffset = Math.sin(elapsedTime * 2) * 0.1;
    
    if (visible) {
      // Initial entrance animation
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z =
        Math.min(meshRef.current.scale.x + delta * 0.8, hovered ? 1.1 : 1);
      
      // Combine entrance, floating and mouse-based position
      const targetY = Math.min(meshRef.current.position.y + delta * 2, floatOffset);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
      
      // Smooth follow mouse movement with gentle rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        -0.2 + mousePosition.x * 0.1 + Math.sin(elapsedTime) * 0.02,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0 + mousePosition.y * 0.05 + Math.cos(elapsedTime) * 0.02,
        0.1
      );
    } else {
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 0;
      meshRef.current.position.y = -2;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      scale={[0, 0, 0]} 
      position={[0, -2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={screenConfig.scale}
        position={screenConfig.position}
        rotation={[-0.00, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [screenConfig, setScreenConfig] = useState(getScreenConfig(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setScreenConfig(getScreenConfig(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: screenConfig.fov }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers screenConfig={screenConfig} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
