"use client";
import { useState, useEffect, useRef } from "react";

const useCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [secondsLeft]);

  const start = (seconds: number) => {
    setSecondsLeft(seconds);
  };

  const reset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSecondsLeft(0);
  };

  return { secondsLeft, start, reset };
};

export default useCountdown;
