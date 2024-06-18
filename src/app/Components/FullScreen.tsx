"use client";
import React, { useEffect, useState, useRef } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Quiz from "./Quiz";

const FullScreenPage = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const handle = useFullScreenHandle();
  const full = handle.active;

  // Use useRef for intervalId and timeoutId
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const startTest = () => {
    setStart(true);
  };
  useEffect(() => {
    if (start) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      console.log("first use effect is full screen");
      timeoutIdRef.current = setTimeout(() => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      }, 2000);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [startTest]);

  return (
    <div>
      <button onClick={handle.enter}>Enter fullscreen</button>
      <div className="time">Elapsed Time: {elapsedTime} seconds</div>
      <FullScreen handle={handle} className="main">
        {full ? (
          <>
            <Quiz />
            <div className="time">Elapsed Time: {elapsedTime} seconds</div>
          </>
        ) : (
          <>
            <div className="main">
              <h1>please Enter FUll screen than start test</h1>
              <button
                onClick={startTest}
                className="bg-green-700 px-3 py-2 rounded-lg"
              >
                Start Test
              </button>
            </div>
          </>
        )}
      </FullScreen>
    </div>
  );
};

export default FullScreenPage;
