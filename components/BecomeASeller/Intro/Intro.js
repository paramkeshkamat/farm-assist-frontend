/** @format */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Intro.module.css";

export default function Intro() {
  const router = useRouter();
  return (
    <div className={styles.introContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer}>
          <Image src="/farmers/farmer.jpg" alt="about" width={328 * 1.7} height={295.4 * 1.7} />
        </div>
        <div className={styles.rightContainer}>
          <h2>How to become a seller at FarmAssist?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <img
            src="/doodles/vegetable2.png"
            alt="vegetable"
            width={186}
            height={162}
            className={styles.bgImage}
          />
          <img
            src="/doodles/vegetable3.png"
            alt="vegetable"
            width={230}
            height={84}
            className={styles.bgImage2}
          />
          <img
            src="/doodles/leaves.png"
            alt="vegetable"
            width={175}
            height={211}
            className={styles.bgImage3}
          />
        </div>
      </div>
    </div>
  );
}
