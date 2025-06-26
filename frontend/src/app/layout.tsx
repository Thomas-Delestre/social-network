import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Network",
  description: "Social Network project for Z01",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/img/logo_social_network.png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} dark:bg-gray-700`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
