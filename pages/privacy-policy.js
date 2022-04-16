/** @format */

import Banner from "../components/global/Banner/Banner";
import { privacyPolicy } from "../data/privacyPolicy";
import styles from "../styles/PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <div>
      <Banner title="Privacy Policy" />
      <div className={styles.container}>
        {privacyPolicy.map((data) => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
