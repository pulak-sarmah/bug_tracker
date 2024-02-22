import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font--inter",
});

export const metadata: Metadata = {
  title: "Bug Tracker",
  description: "A simple bug tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/logo.svg" type="image/svg+xml"></link>
      </head>

      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme
              accentColor="blue"
              grayColor="sand"
              radius="medium"
              scaling="95%"
            >
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
