import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import NavigationTop from "~/components/navigationTop";

export const metadata = {
  title: "Asset Management",
  description: "Asset Management System",
  icons: [{ rel: "icon", url: "/icon" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#5b21b6",
          colorBackground: "#020617",
          colorInputText: "#ffffff",
        },
      }}
    >
      <html lang="en" className={`${GeistSans.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className="flex flex-col items-center gap-4 bg-gradient-to-b from-slate-950 to-black text-white">
          <NavigationTop />
          <main className="flex min-h-screen w-screen max-w-screen-xl flex-col items-start justify-start gap-8 px-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
