/** @format */

import Banner from "../components/global/Banner/Banner";
import { termsOfUse } from "../data/termsOfUse";
import styles from "../styles/TermsOfUse.module.css";

export default function TermsOfUse() {
  return (
    <div>
      <Banner title="Terms of Use" />
      <div className={styles.container}>
        {termsOfUse.map((data) => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
