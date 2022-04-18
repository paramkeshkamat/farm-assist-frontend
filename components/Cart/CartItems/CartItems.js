/** @format */

import { memo } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import styles from "./CartItems.module.css";

export default memo(function CartItems({ cartItems, setCartItems }) {
  return (
    <div className={styles.cartItemsContainer}>
      {cartItems?.map((item, index) => (
        <SingleCartItem
          key={item._id}
          {...item}
          index={index}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </div>
  );
});
