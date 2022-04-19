/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext, memo } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../context/AppContext";
import styles from "./PriceDetails.module.css";

export default memo(function PriceDetails({ cartItems }) {
  const [price, setPrice] = useState(0);
  const { state } = useContext(AppContext);
  const router = useRouter();

  function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].productPrice * state.cart[i]?.quantity;
    }
    setPrice(totalPrice);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, state.cart]);

  return (
    <div className={styles.priceDetailsCard}>
      <h2>Price Details</h2>
      <div className={styles.upperDiv}>
        <div className={styles.row}>
          <b>Price</b> <p>₹{price}</p>
        </div>
        <div className={styles.row}>
          <b>Discount</b>
          <p>-₹0</p>
        </div>
        <div className={styles.row}>
          <b>Delivery Charges</b>
          <p>FREE</p>
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <div className={styles.row}>
          <b>Total Amount</b> <p>₹{price}</p>
        </div>
      </div>
      <button
        className={styles.chekoutButton}
        onClick={() => {
          sessionStorage.setItem("totalPrice", price);
          router.push("/checkout");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
});
