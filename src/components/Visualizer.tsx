/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface VisualizerProps {
  isPlaying: boolean;
  type: 'compact' | 'full' | 'radial';
  equalizerPreset?: string;
  volumeMultiplier?: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  isPlaying,
  type,
  equalizerPreset = 'flat',
  volumeMultiplier = 0.8,
}) => {
  const [heights, setHeights] = useState<number[]>([]);
  const barCount = type === 'compact' ? 4 : 24;

  useEffect(() => {
    // Initialize heights
    setHeights(Array.from({ length: barCount }, () => Math.random() * 100));
  }, [barCount]);

  useEffect(() => {
    if (!isPlaying) {
      // Return to resting position
      const timer = setTimeout(() => {
        setHeights(Array.from({ length: barCount }, () => 15));
      }, 30);
      return () => clearTimeout(timer);
    }

    // Determine speed and heights based on EQ preset
    let speed = 80;
    let baseHeightMin = 20;
    let baseHeightMax = 80;

    if (equalizerPreset === 'fullbass') {
      speed = 40;
      baseHeightMin = 50;
      baseHeightMax = 100;
    } else if (equalizerPreset === 'bass') {
      speed = 60;
      baseHeightMin = 40;
      baseHeightMax = 100;
    } else if (equalizerPreset === 'treble') {
      speed = 100;
      baseHeightMin = 10;
      baseHeightMax = 90;
    } else if (equalizerPreset === 'chill') {
      speed = 120;
      baseHeightMin = 10;
      baseHeightMax = 50;
    }

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          // Bass EQ boosts lower frequencies
          const isBassFreq = i < barCount / 2;
          const boost = equalizerPreset === 'fullbass' ? (isBassFreq ? 1.8 : 1.3) : (equalizerPreset === 'bass' && isBassFreq ? 1.4 : 1.0);
          const factor = Math.random() * (baseHeightMax - baseHeightMin) + baseHeightMin;
          return Math.min(100, factor * boost * Math.min(1.5, volumeMultiplier + 0.2));
        })
      );
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, barCount, equalizerPreset, volumeMultiplier]);

  if (type === 'compact') {
    return (
      <div className="flex items-end gap-[2px] h-3 w-4" id="visualizer-compact">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            id={`visualizer-bar-${i}`}
            className="w-[2px] bg-[#FF3B5C] rounded-t"
            animate={{ height: `${Math.max(20, h)}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center gap-1.5 h-36 w-full max-w-xl mx-auto px-4" id="visualizer-full">
      {heights.map((h, i) => {
        // Neon color gradient map for gorgeous layout aesthetics
        let barColor = 'bg-[#FF3B5C] shadow-[0_0_12px_rgba(255,59,92,0.5)]';
        if (i % 3 === 0) {
          barColor = 'bg-[#FF6B81] shadow-[0_0_12px_rgba(255,107,129,0.5)]';
        } else if (i % 3 === 1) {
          barColor = 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]';
        }

        return (
          <motion.div
            key={i}
            id={`visualizer-full-bar-${i}`}
            className={`w-1.5 rounded-full ${barColor}`}
            animate={{ height: `${Math.max(8, h)}%` }}
            transition={{ type: 'tween', duration: 0.08 }}
          />
        );
      })}
    </div>
  );
};
