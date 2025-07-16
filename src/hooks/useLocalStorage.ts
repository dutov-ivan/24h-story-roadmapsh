import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stringifiedStorage = localStorage.getItem(key);
      const gotValue = stringifiedStorage
        ? JSON.parse(stringifiedStorage)
        : initialValue;
      return gotValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Possibly in private mode or quota exceeded
    }
  }, [key, value]);

  return [value, setValue] as const;
}
