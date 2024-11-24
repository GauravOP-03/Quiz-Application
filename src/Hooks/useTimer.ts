import { useEffect, useState } from "react";

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(20);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount or reset
    } else {
      // Move to next question when time runs out

      handleNextQuestion();
    }
  }, [timeLeft]);
}
