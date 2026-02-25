"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import AuthRehydrate from "@/components/pages/AuthPages/AuthRehydrate";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthRehydrate />
      {children}
    </Provider>
  );
}