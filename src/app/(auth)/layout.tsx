import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Login - MyFroggap",
  description: "Inicia sesión para acceder al CMS",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} antialiased min-h-screen bg-white dark:bg-slate-950`}>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
