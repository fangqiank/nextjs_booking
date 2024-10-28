import {Inter} from "next/font/google";
import "@/assets/styles/globals.css";
import { Header } from "@/components/Header";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Footer } from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
}); 

export const metadata = {
  title: "Bookie App | Book a room",
  description: "Book a meeting for your team",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body
          className={inter.className}
        >
          <Header />

          <main className="mx-auto max-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
          
          <ToastContainer />
        </body>
      </html>
    </AuthWrapper>
  );
}
