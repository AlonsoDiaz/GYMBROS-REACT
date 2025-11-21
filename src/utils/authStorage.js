const STORAGE_KEY = "gymbroUser";
const AUTH_EVENT = "gymbro-auth-changed";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAuthUser() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("No fue posible leer el usuario desde localStorage", error);
    return null;
  }
}

export function saveAuthUser(user) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthUser() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function subscribeToAuthChanges(callback) {
  if (!isBrowser()) {
    return () => {};
  }

  const handler = () => {
    callback(getAuthUser());
  };

  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export { STORAGE_KEY, AUTH_EVENT };
