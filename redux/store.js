import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { 
  persistReducer, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) { return Promise.resolve(null); },
    setItem(_key, value) { return Promise.resolve(value); },
    removeItem(_key) { return Promise.resolve(); },
  };
};

const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

// ✅ FIX IS HERE
const persistConfig = {
  key: "auth", // Change key to 'auth' to store it as "persist:auth" in LS
  storage,
  // ❌ REMOVE: whitelist: ["auth"], 
  // ✅ OPTION A: Remove whitelist entirely to persist all auth state
  // ✅ OPTION B: Whitelist actual keys inside authSlice
  whitelist: ["token", "isAuthenticated", "role", "orgData"], 
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export default makeStore;