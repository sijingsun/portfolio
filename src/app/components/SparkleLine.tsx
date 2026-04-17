import React, { useState, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SparkleLineProps {
  children: React.ReactNode;
}

export function SparkleLine({ children }: SparkleLineProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.li 
      className="flex items-center gap-3 cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
    >
      <SparkleIcon isHovered={isHovered} />
      {children}
    </motion.li>
  );
}

function SparkleIcon({ isHovered }: { isHovered: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      // Start sequence: Wind up -> Fast Loop
      const sequence = async () => {
        // Phase 1: Wind up (0 to 180 over 0.5s)
        await controls.start({
          rotate: 180,
          scale: 1.2,
          transition: { duration: 0.5, ease: "easeIn" }
        });
        
        // Phase 2: Accelerate to fast spin (180 to 540 over 0.3s)
        await controls.start({
          rotate: 540,
          transition: { duration: 0.3, ease: "linear" }
        });

        // Phase 3: Fast Continuous Spin
        // We set rotate to relative increment to keep spinning
        controls.start({
          rotate: 540 + 360,
          transition: { 
            repeat: Infinity, 
            duration: 0.4, // Fast speed
            ease: "linear",
          }
        });
      };
      sequence();
    } else {
      // Stop sequence: Slow down and return to 0
      controls.start({
        rotate: 0,
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: "easeOut", // Slow down as it approaches 0
          type: "tween" 
        }
      });
    }
  }, [isHovered, controls]);

  return (
    <motion.div
      animate={controls}
      className="shrink-0"
    >
      <Sparkles size={18} strokeWidth={1} className="text-foreground" fill="currentColor" />
    </motion.div>
  );
}
