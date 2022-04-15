/** @format */
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  const router = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer}>
          <h1>Buy Fresh and Healthy Groceries</h1>
          <p>Fresh Fruits and vegetables straight from farm to your doorstep.</p>
          <button onClick={() => router.push("/shop")}>Shop Now</button>
        </div>
        <div className={styles.rightContainer}>
          <Image src="/vegetables/vegetables.png" alt="banner" width={640} height={430} />
        </div>
      </div>
    </div>
  );
}
