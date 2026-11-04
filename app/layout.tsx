import type { Metadata } from "next";
import "./globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ProfileContextProvider } from "@/context/profileContext";

export const metadata: Metadata = {
  title: "Project 4",
  description: "Dan is cool",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ProfileContextProvider>
            {children}
          </ProfileContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
