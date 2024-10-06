export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//? SET To LocalStorage
export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const saveToSessionStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getFromSessionStorage = (key: any) => {
  return typeof window !== "undefined"
    ? sessionStorage.getItem(key) ?? null
    : null;
};

export const removeSessionStorage = (key: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

//? GET From LocalStorage
export const getFromLocalStorage = (key: any) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key) ?? null
    : null;
};

//? Remove from LocalStorage
export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
