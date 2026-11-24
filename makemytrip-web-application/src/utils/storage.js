// Small helpers to read/write JSON in the browser's localStorage.
// localStorage keeps data after a page refresh, so we use it instead of a backend.

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked (private mode). Ignore and carry on.
  }
}
