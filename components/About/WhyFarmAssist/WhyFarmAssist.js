/** @format */

import Image from "next/image";
import { whyFarmAssist } from "../../../data/whyFarmAssist";
import styles from "./WhyFarmAssist.module.css";

export default function WhyFarmAssist() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2>Why FarmAssist?</h2>
        <div className={styles.cardContainer}>
          {whyFarmAssist.map((data) => (
            <div key={data.id} className={styles.card}>
              <Image src={data.image} alt={data.title} width={100} height={100} />
              <h3>{data.title}</h3>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
