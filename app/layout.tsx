import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antioch Independent Baptist Churches of Kenya",
  description: "A Christ-centered church network focused on Bible-based teaching, missions, community service, and evangelism in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
