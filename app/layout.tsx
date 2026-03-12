import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StPeterProvider } from "st-peter-ui";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "sonner";
import Login from "@/components/login/page";
import RootLayoutClient from "./root-layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BPIS v6",
  description: "Branch Planholder Information System Version 6.0",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ background: "#fff" }}
      >
        <RootLayoutClient>
          <StPeterProvider font="Open Sans" theme="green">
            <AppLayout>{children}</AppLayout>
            <Toaster position="top-right" richColors />
          </StPeterProvider>
        </RootLayoutClient>
      </body>
    </html>
  );
}
