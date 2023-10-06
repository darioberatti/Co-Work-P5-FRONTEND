import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { Flex, Theme } from "@radix-ui/themes";
import Menu from "@/components/Menubar";
import { Providers } from "@/redux/provider";
import Footer from "@/components/Footer";
import Header from "../components/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  description: "Práctica Profesional JSBC P5 Julio 2023",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Co-Work P5</title>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="bodyMain">
        <Providers>
          <Theme>
            <Flex justify={"center"} width={"90%"}>
              <header>
                <Menu />
              </header>
            </Flex>
            <Header />
            <Flex justify={"center"} style={{ margin: "2%" }}>
              {children}
              <Toaster position="bottom-center" />
            </Flex>
          </Theme>
          <div style={{ marginBottom: "100px" }}></div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
