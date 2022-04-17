/** @format */

import { useState, useEffect, memo } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import styles from "./CartItems.module.css";

export default memo(function CartItems() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const appstate = JSON.parse(localStorage.getItem("appstate"));
    if (appstate) {
      setCart(appstate.cart);
    }
  }, []);

  return (
    <div className={styles.cartItemsContainer}>
      {cart?.map((item, index) => (
        <SingleCartItem key={item.id} {...item} setCart={setCart} index={index} />
      ))}
    </div>
  );
});
