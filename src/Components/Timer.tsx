import React, { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number;
  onTimeEnd: () => void;
  onTick?: (timeLeft: number) => void; // Optional callback for each tick
  setTimer: (value: number) => void;
}

export const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeEnd,
  onTick,
  setTimer,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTimer(timeLeft);
        if (onTick) onTick(timeLeft - 1); // Notify parent on tick
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer
    } else {
      onTimeEnd();
    }
  }, [timeLeft, onTimeEnd, onTick]);

  return <h3>Time Left: {timeLeft}s</h3>;
};
