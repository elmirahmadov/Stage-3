"use client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Provider store={store}>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
