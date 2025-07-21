// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';

function getStorageValue(key, defaultValue) {
  // Check if window is defined (for SSR environments)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    try {
      // Attempt to parse JSON, but fall back to string for simple values
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.warn(`Error parsing localStorage key "${key}":`, e);
      return saved || defaultValue; // Return raw string if JSON parsing fails
    }
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  const setStoredValue = useCallback((newValue) => {
    if (typeof window !== 'undefined') {
      try {
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        // Dispatch a custom event to notify other components in the same tab
        window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key, value: valueToStore } }));
      } catch (error) {
        console.error(`Error setting localStorage item for key "${key}":`, error);
      }
    }
  }, [key, value]); // Include 'value' in dependencies for functional updates

  useEffect(() => {
    const handleStorageChange = (event) => {
      // Listen for native 'storage' event (from other tabs/windows)
      // and our custom 'localStorageUpdated' event (from the same tab)
      if (event.key === key || (event.detail && event.detail.key === key)) {
        setValue(getStorageValue(key, defaultValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);

    // Re-check value on mount to catch any changes that happened just before mounting
    setValue(getStorageValue(key, defaultValue)); // Ensures initial value is up-to-date

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, [key, defaultValue]);

  return [value, setStoredValue];
};