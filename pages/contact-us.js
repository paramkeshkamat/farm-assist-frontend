/** @format */

import Banner from "../components/global/Banner/Banner";
import Contact from "../components/global/Contact/Contact";
import styles from "../styles/ContactUs.module.css";

export default function ContactUs() {
  return (
    <div className={styles.contactContainer}>
      <Banner title="Contact Us" />
      <Contact />
    </div>
  );
}
