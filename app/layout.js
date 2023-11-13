import { Fira_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterContext from "./context/ToasterContext.jsx";
import NavBar from "./components/NavBar.jsx";

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
        <body className="h-full">
          <ToasterContext />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
