/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./SuccessModal.module.css";

export default function SuccessModal({ setShowSuccessModal }) {
  const router = useRouter();
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <Image src="/illustrations/success.png" alt="success" width={100} height={100} />
        <p>Your order has been placed Successfully!</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              sessionStorage.removeItem("totalPrice")
              router.push("/");
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
