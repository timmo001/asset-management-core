import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
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
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <NavigationTop />
        <main className="flex min-h-screen flex-col items-center justify-start p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
