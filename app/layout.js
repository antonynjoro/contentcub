import { Fira_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterContext from "./context/ToasterContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Head from "next/head";
import HotjarContext from "./context/HotjarContext.jsx";
import MixpanelContext from "./context/MixpanelContext.jsx";
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google'




const fira_sans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-fira_sans",
  weight: ['100','200','300','400','500','600','700','800','900'],

});


export const metadata = {
  title: "ContentCub",
  description: "The easiest way to gather content from your clients.",
};

export default function RootLayout({ children }) {
  return (

   
    <ClerkProvider>
      <html lang="en" className={`h-full ${fira_sans.variable}` }>
        
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
        <meta name="msapplication-TileColor" content="#ffc40d"/>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
        <body className="h-full">
        <HotjarContext />
        <MixpanelContext />
          <ToasterContext />
          {children}
          <Analytics/>
          <GoogleTagManager gtmId="GTM-N2JR9NTV" />
        </body>
      </html>
    </ClerkProvider>
  );
}
