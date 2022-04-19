/** @format */
import { useRouter } from "next/router";
import Navbar from "./global/Navbar/Navbar";
import Footer from "./global/Footer.js/Footer";

const pagesWithoutFooter = ["/signin", "/register", "/checkout"];

export default function Layout({ children }) {
  const router = useRouter();
  // console.log(router.pathname);

  if (pagesWithoutFooter.includes(router.pathname)) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
