/** @format */
import { useRef, useEffect, useState, useContext, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppContext } from "../../../context/AppContext";
import { FaBars } from "react-icons/fa";
import { RiUser3Fill, RiShoppingCart2Fill } from "react-icons/ri";
import styles from "./Navbar.module.css";

const pagesWithBoxshadow = [
  "/signin",
  "/register",
  "/cart",
  "/profile",
  "/shop",
  "/product/[id]",
  "/404",
  "/checkout",
];

export default memo(function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { state } = useContext(AppContext);
  const navRef = useRef();
  const navlinksRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && window.innerWidth > 998) {
        navRef.current?.classList.add(styles.smallnav);
      } else {
        navRef.current?.classList.remove(styles.smallnav);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={styles.navContainer}
      ref={navRef}
      style={{
        boxShadow: pagesWithBoxshadow.includes(router.pathname)
          ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          : "none",
        backgroundColor: router.pathname === "/" ? "transparent" : "#fff",
      }}
    >
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a>
              <h3>
                Farm<span>Assist</span>
              </h3>
            </a>
          </Link>
          <button className={styles.hamburger} onClick={() => setShowNavbar(!showNavbar)}>
            <FaBars />
          </button>
        </div>
        <div
          className={`${styles.navLinks} ${showNavbar ? styles.showNavbar : null}`}
          ref={navlinksRef}
        >
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <a
                onClick={() => setShowNavbar(false)}
                style={{
                  color: router.pathname === link.href ? "#7ea310" : "#112433",
                  fontWeight: router.pathname === link.href ? 500 : 400,
                }}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
        <div className={styles.social}>
          {state.user?.token ? (
            <>
              <Link href="/profile">
                <a>
                  <RiUser3Fill />
                </a>
              </Link>
              <Link href="/cart">
                <a>
                  <RiShoppingCart2Fill />
                </a>
              </Link>
            </>
          ) : (
            <button className={styles.signinButton} onClick={() => router.push("/signin")}>
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
});

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Become a seller",
    href: "/become-a-seller",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];
