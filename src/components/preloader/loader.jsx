import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePreloader } from "./index";
import styles from "./style.module.css";
import gsap from "gsap";

export default function Loader() {
  const { bypassLoading } = usePreloader();
  const logoTextRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set(logoTextRef.current, {
      opacity: 0
    });

    // Fade in the container with longer duration
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    })
    
    // Add longer delay before starting text animation
    .to({}, { duration: 1.5 })
    
    // Fade in and animate logo text with smooth typewriter effect
    .to(logoTextRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(logoTextRef.current, {
      duration: 4,
      ease: 'steps(15)',
      onUpdate: () => {
        const progress = tl.progress();
        const fullText = '<> Hello,...Renz';
        const currentLength = Math.floor(progress * fullText.length);
        const text = fullText.slice(0, currentLength);
        const cursorChar = Math.floor(Date.now() / 500) % 2 === 0 ? '|' : '';
        logoTextRef.current.textContent = text + (currentLength < fullText.length ? cursorChar : '');
      },
      onComplete: () => {
        // Start cursor blinking after typing is complete
        const blinkCursor = () => {
          if (logoTextRef.current) {
            const cursorChar = Math.floor(Date.now() / 500) % 2 === 0 ? '|' : '';
            logoTextRef.current.textContent = '<> Hello,...Renz' + cursorChar;
          }
        };
        const blinkInterval = setInterval(blinkCursor, 50);
        // Clean up interval when component unmounts
        return () => clearInterval(blinkInterval);
      }
    })
    
    // Add longer delay after typing animation
    .to({}, { duration: 7 });

    return () => tl.kill();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className={styles.introduction}
      onClick={bypassLoading}
      style={{ cursor: "pointer" }}
    >
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <span
          ref={logoTextRef}
          className="mb-8 text-4xl md:text-6xl font-bold text-white font-mono"
        ></span>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-sm text-gray-400"
        >
          Click or press any key to skip
        </motion.div>
      </div>
    </motion.div>
  );
}
