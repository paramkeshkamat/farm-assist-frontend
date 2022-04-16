/** @format */

import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "../helpers/axios";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const { state, setState } = useContext(AppContext);
  const router = useRouter();

  console.log(state);

  if (!state.user) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCart}>
          <Image src="/illustrations/login.png" alt="empty cart" width={400} height={400} />
          <h2>Please signin to access the cart!</h2>
          <button onClick={() => router.push("/signin")}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      {state.cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <Image
            src="/illustrations/emptyCart.png"
            alt="empty cart"
            width={199.9 * 2.3}
            height={165.7 * 2.3}
          />
          <h2>Your cart is empty!</h2>
          <button onClick={() => router.push("/shop")}>Shop Now</button>
        </div>
      ) : (
        <p>cart</p>
      )}
    </div>
  );
}
