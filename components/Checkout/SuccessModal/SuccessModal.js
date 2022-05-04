/** @format */

import { memo, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppContext } from "../../../context/AppContext";
import styles from "./SuccessModal.module.css";

export default memo(function SuccessModal({ setShowSuccessModal }) {
  const router = useRouter();
  const { state, setState } = useContext(AppContext);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <Image src="/illustrations/success.png" alt="success" width={100} height={100} />
        <p>Your order has been placed Successfully!</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              const updatedState = {
                ...state,
                cart: [],
              };
              localStorage.setItem("appstate", JSON.stringify(updatedState));
              setState(updatedState);
              setShowSuccessModal(false);
              sessionStorage.removeItem("totalPrice");
              router.push("/");
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
});
