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
      <body className="flex flex-col gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white items-center">
        <NavigationTop />
        <main className="flex min-h-screen max-w-screen-xl flex-col items-center justify-start gap-4 px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
