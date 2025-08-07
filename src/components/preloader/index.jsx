import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import Loader from "./loader";

const PreloaderContext = createContext();

const INITIAL = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

const LOADING_TIME = 12; // Increased to allow for longer animations and delays

function Preloader({ children, disabled = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const loadingTween = useRef();

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
  };

  const loadingPercentRef = useRef({ value: 0 });

  useEffect(() => {
    if (disabled) {
      setIsLoading(false);
      return;
    }

    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "slow(0.7,0.7,false)",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // Add keyboard shortcut to bypass loading
    const handleKeyPress = () => {
      if (isLoading) {
        bypassLoading();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [disabled, isLoading]);

  return (
    <PreloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
