/** @format */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./About.module.css";

export default function About() {
  const router = useRouter();
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer}>
          <Image src="/vegetables/vegetables2.jpg" alt="about" width={640} height={430} />
        </div>
        <div className={styles.rightContainer}>
          <h2>What is FarmAssist?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <button onClick={() => router.push("/about-us")}>Read More</button>
          <img
            src="/doodles/vegetable1.png"
            alt="vegetable"
            width={225}
            height={333}
            className={styles.bgImage}
          />
        </div>
      </div>
    </div>
  );
}
