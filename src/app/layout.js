import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import { getGlobalPageData, getGlobalPageMetadata } from "@/data/loaders";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const metadata = await getGlobalPageMetadata();
  return {
    title: metadata?.title,
    description: metadata?.description,
  }
}


export default async function RootLayout({ children }) {
  const globalData = await getGlobalPageData();
  console.log(globalData);
  return (
    <html lang="en">
      <Head>
        <meta name="description" content={globalData.description} />
        <title>{globalData.title}</title>
      </Head>
      <body className={inter.className}>
        <Header data={globalData.header} />
        <main>{children}</main>
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
