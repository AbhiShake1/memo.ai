import "@/styles/globals.css";

import { type Metadata } from "next";
import { Comfortaa } from 'next/font/google'

const font = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Memo",
  description: "Audio browsing simplified",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(font.className, "dark")}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
