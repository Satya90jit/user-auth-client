import { USER_TYPE } from "@/types";
import {
  getFromLocalStorage,
  getFromSessionStorage,
  removeFromLocalStorage,
  removeSessionStorage,
} from "@/utils";
import { create } from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: Partial<USER_TYPE>;
  setUser: (user: Partial<USER_TYPE>) => Promise<void>;
  logOut: (redirectPath?: string) => Promise<void>;
  getUser: () => Promise<void>;
};

const useAuth: any = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},

  // Set user after login
  setUser: async (user: Partial<USER_TYPE>) => {
    set({ user: { ...user }, isUserLoading: false });
  },

  // Log out user
  logOut: async () => {
    // Clear user data
    set({ user: {} });

    // Clear session/local storage
    removeSessionStorage("ACCESS_TOKEN");
    removeFromLocalStorage("USER_DATA");

    // Redirect to login or custom path
    // window.location.replace(redirectPath);
  },

  // Get user from session storage/local storage
  getUser: async () => {
    const accessToken = getFromSessionStorage("ACCESS_TOKEN");

    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }

    // Get the user data from local storage
    const userDataString = getFromLocalStorage("USER_DATA");

    // Parse the user data, but only if it exists
    let userData = null;
    if (userDataString) {
      try {
        userData = JSON.parse(userDataString);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        userData = null; // Handle the error and reset to null if parsing fails
      }
    }

    if (userData) {
      set({ user: userData, isUserLoading: false });
    } else {
      set({ user: {}, isUserLoading: false });
    }
  },
}));

export default useAuth;
