/** @format */
import Link from "next/link";
import { MdCall, MdMailOutline } from "react-icons/md";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperContainer}>
        <div className={styles.about}>
          <Link href="/">
            <a>
              <h3>
                Farm<span style={{ fontSize: 25 }}>Assist</span>
              </h3>
            </a>
          </Link>
          <p>A Shop where you can buy groceries fresh and healthy directly from farmers</p>
        </div>
        <div className={styles.navLinks}>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div>
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
          </div>
          <div>
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </div>
          <div>
            <Link href="/cart">
              <a>Cart</a>
            </Link>
          </div>
        </div>
        <div className={styles.navLinks}>
          <div>
            <Link href="/contact-us">
              <a>Contact Us</a>
            </Link>
          </div>
          <div>
            <Link href="/become-a-seller">
              <a>Become a seller</a>
            </Link>
          </div>
          <div>
            <Link href="/terms-of-use">
              <a>Terms of Use</a>
            </Link>
          </div>
          <div>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </div>
        </div>
        <div className={styles.navLinks}>
          <h3 style={{ fontweight: 200 }}>Contact Info</h3>
          <div className={styles.social}>
            <div>
              <p className={styles.contactLink}>
                <MdMailOutline />
                &nbsp; support@farmassist.com
              </p>
            </div>
            <div>
              <p className={styles.contactLink}>
                <MdCall />
                &nbsp; +91 9989899889
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div>
          <p>Copyright &copy; {new Date().getFullYear()}, FarmAssist</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
