"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import makeStore from "@/redux/store"; // Adjust path to your store.js
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  const persistorRef = useRef();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      {/* ✅ PersistGate ensures app doesn't load until state is restored */}
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}