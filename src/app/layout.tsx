import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import NavigationTop from "~/components/navigationTop";

export const metadata = {
  title: "Asset Management",
  description: "Asset Management System Written with the T3 stack",
  icons: [{ rel: "icon", url: "/icon" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col items-center gap-4 bg-gradient-to-b from-slate-950 to-black text-white">
          <NavigationTop />
          <main className="flex min-h-screen max-w-screen-xl flex-col items-start justify-start gap-8 px-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
