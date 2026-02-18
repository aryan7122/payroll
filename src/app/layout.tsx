import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto, Outfit, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { DesignProvider } from "@/components/theme/design-provider";
import { GoogleTranslator } from "@/components/theme/google-translator";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accounting System | Digital Accountant",
  description: "Advanced Payroll Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${outfit.variable} ${montserrat.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: 'var(--font-primary)' } as any}
      >


        <GoogleTranslator />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <DesignProvider>
              {children}
            </DesignProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
