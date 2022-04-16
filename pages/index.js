/** @format */

import HomeBanner from "../components/Home/HomeBanner/HomeBanner";
import About from "../components/Home/About/About";
import Categories from "../components/Home/Categories/Categories";
import Contact from "../components/global/Contact/Contact";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <About />
      <Categories />
      <Contact />
    </div>
  );
}
