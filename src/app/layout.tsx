import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/contexts/I18nContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rkhamiconsulting-group.com'),
  title: "Rkhami Consulting Group – Business Consulting Services",
  description: "Rkhami Consulting Group helps businesses grow with expert consulting solutions.",
  keywords: ["business consulting", "automation", "robotics", "strategy", "innovation"],
  authors: [{ name: "Rkhami Consulting Group" }],
  creator: "Rkhami Consulting Group",
  publisher: "Rkhami Consulting Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rkhamiconsulting-group.com",
    title: "Rkhami Consulting Group – Business Consulting Services",
    description: "Rkhami Consulting Group helps businesses grow with expert consulting solutions.",
    siteName: "Rkhami Consulting Group",
    images: [
      {
        url: "/images/craiyon_162456_image.png",
        width: 1200,
        height: 630,
        alt: "Rkhami Consulting Group Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rkhami Consulting Group – Business Consulting Services",
    description: "Rkhami Consulting Group helps businesses grow with expert consulting solutions.",
    images: ["/images/craiyon_162456_image.png"],
    creator: "@rkhamiconsulting",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/craiyon_162456_image.png" />
        <link rel="preload" as="image" href="/images/human-robot-handshake-collaboration-digital-age.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
