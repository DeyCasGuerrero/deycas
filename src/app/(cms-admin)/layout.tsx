import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/auth-context";
import SideNav from "@/modules/cms/ui/SideNav";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CMS Dashboard - MyFroggap",
  description: "Panel de administración",
};

export default function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} antialiased min-h-screen bg-white dark:bg-slate-950`}>
        <AuthProvider>
          <SideNav />
          <main className="md:ml-64 p-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
