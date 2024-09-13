import "@/styles/globals.css";

import { type Metadata } from "next";
import { Comfortaa } from 'next/font/google'

const font = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        <TRPCReactProvider>
          <div className="flex flex-col min-h-screen items-center bg-background text-foreground">
            <header className="sticky top-0 z-20 bg-background w-full border-b">
              <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                  <MicIcon className="w-6 h-6" />
                  <span className="font-bold text-lg">Memo</span>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <form>
                      <Input
                        type="search"
                        placeholder="Search transcripts..."
                        name="q"
                        className="pl-10 pr-4 rounded-md bg-muted text-sm"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 container px-4 md:px-6 py-12">
              {children}
            </main>
            <footer className="bg-muted border-t w-full">
              <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                <p className="text-muted-foreground text-sm">&copy; 2023 Transcribe. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Privacy
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Terms
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Contact
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
