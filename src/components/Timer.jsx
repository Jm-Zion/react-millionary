import { useEffect, useState } from 'react';

const DEFAULT_TIMER = 60;
export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(DEFAULT_TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(DEFAULT_TIMER);
  }, [questionNumber]);

  return timer;
}
