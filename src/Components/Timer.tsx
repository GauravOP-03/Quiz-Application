import React, { useEffect, useState } from "react";

interface TimerProps {
  timeLeft: number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  handleNextQuestion: () => void;
}

export default function Timer({timeLeft, setTimeLeft, handleNextQuestion}: TimerProps){

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev-1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount or reset
    } else {
      // Move to next question when time runs out

      handleNextQuestion();
    }
  }, [timeLeft]);

  return (
    <div>time left: {timeLeft}</div>
  )
}
