import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

const RefreshRateMonitor = () => {
  const [refreshRate, setRefreshRate] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let prevTimestamp = performance.now();
    let animationFrameId;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      const delta = now - prevTimestamp;

      if (delta >= 1000) {
        const currentRefreshRate = Math.round((frameCount * 1000) / delta);
        setRefreshRate(currentRefreshRate);
        frameCount = 0;
        prevTimestamp = now;
      }

      animationFrameId = requestAnimationFrame(measure);
    };

    measure();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <View>
      <Text>Refresh Rate: {refreshRate} FPS</Text>
    </View>
  );
};

export default RefreshRateMonitor;