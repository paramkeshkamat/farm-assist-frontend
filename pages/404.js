/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/ErrorPage.module.css";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className={styles.errorPageContainer}>
      <Image src="/404.png" alt="404 page not found" width={204 * 2.5} height={145 * 2.5} />
      <h1>404 Page Not Found</h1>
      <button onClick={() => router.push("/")}>Home Page</button>
    </div>
  );
}
