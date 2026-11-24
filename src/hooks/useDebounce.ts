import { useEffect, useState } from "react";

// Повертає значення із затримкою — щоб не робити запит на кожну натиснуту клавішу
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
