import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider, Language } from "../contexts/language-context";
import { getTranslation } from "../lib/i18n"; // Import getTranslation
import { headers, cookies } from 'next/headers'; // Import headers and cookies

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Helper function to determine initial language, adapted for generateMetadata
async function getMetadataLanguage(): Promise<Language> {
  const acceptLanguageHeader = (await headers()).get('Accept-Language');
  const languageCookie = (await cookies()).get('language')?.value as Language;

  if (languageCookie && ['en', 'ko', 'th'].includes(languageCookie)) {
    return languageCookie;
  }

  if (acceptLanguageHeader) {
    const preferredLanguage = acceptLanguageHeader.split(',')[0].split('-')[0].split(';')[0];
    if (['en', 'ko', 'th'].includes(preferredLanguage)) {
      return preferredLanguage as Language;
    }
  }
  return 'en'; // Default to English
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getMetadataLanguage();
  const title = getTranslation(lang, 'app_title');
  const description = getTranslation(lang, 'app_description');

  return {
    title: title,
    description: description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider> {/* Wrap ThemeProvider with LanguageProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}