import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

const Stars = (props) => {
  const ref = useRef();
  const count = 1500;
  const [sphere] = useState(() => {
    const positions = new Float32Array(count * 3);
    const radius = 1.5;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * radius;
      positions[i3 + 2] = (Math.random() - 0.5) * radius;
    }
    
    return positions;
  });
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Base rotation
    ref.current.rotation.x -= delta / (hovered ? 5 : 10);
    ref.current.rotation.y -= delta / (hovered ? 7.5 : 15);

    // Wave effect when hovered
    if (hovered) {
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        positions[i] = x + Math.sin(time * 2 + y) * 0.02;
        positions[i + 1] = y + Math.cos(time * 2 + x) * 0.02;
        positions[i + 2] = z + Math.sin(time * 2 + x) * 0.02;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }

    // Subtle movement towards mouse position
    ref.current.position.x += (mousePosition[0] * 0.1 - ref.current.position.x) * 0.1;
    ref.current.position.y += (mousePosition[1] * 0.1 - ref.current.position.y) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled 
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          color={hovered ? '#915EFF' : '#fff'}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-full absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
