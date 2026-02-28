const isClient = () => typeof window !== "undefined";

export const setStorageItem = (key: string, value: string) => {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.warn("localStorage setItem failed:", e);
  }
};

export const getStorageItem = (key: string): string | null => {
  if (!isClient()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.warn("localStorage getItem failed:", e);
    return null;
  }
};

export const removeStorageItem = (key: string) => {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.warn("localStorage removeItem failed:", e);
  }
};
