/** @format */

import React from "react";
import styles from "./PriceDetails.module.css";

export default function PriceDetails() {
  return (
    <div className={styles.priceDetailsCard}>
      <h2>Price Details</h2>
      <div className={styles.upperDiv}>
        <div className={styles.row}>
          <b>Price</b> <p>₹1000</p>
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
          <b>Total Amount</b> <p>₹1000</p>
        </div>
      </div>
      <button className={styles.chekoutButton}>Proceed to Checkout</button>
    </div>
  );
}
