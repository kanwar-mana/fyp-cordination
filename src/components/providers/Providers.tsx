"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { store } from "@/store";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <PwaRegister />
        {children}
      </Provider>
    </ThemeProvider>
  );
}
