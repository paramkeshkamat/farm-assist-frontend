/** @format */
/* eslint-disable @next/next/no-img-element */

import { useContext, memo } from "react";
import { AppContext } from "../../../context/AppContext";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import styles from "./SingleCartItem.module.css";

export default memo(function SingleCartItem({
  _id,
  productImage,
  productName,
  productPrice,
  measurement,
  quantity,
  cartItems,
  setCartItems,
  index,
}) {
  const { state, setState } = useContext(AppContext);

  function removeItem() {
    const updatedCartState = state.cart.filter((item) => item.id !== _id);
    const updatedCartItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCartItems);
    const updatedState = {
      ...state,
      cart: updatedCartState,
    };
    setState(updatedState);
    localStorage.setItem("appstate", JSON.stringify(updatedState));
  }

  function increaseQuantity() {
    sessionStorage.removeItem("totalPrice");
    const updatedCart = state.cart.map((item) => {
      if (item.id === _id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });
    const updatedState = { ...state, cart: updatedCart };
    setState(updatedState);
    localStorage.setItem("appstate", JSON.stringify(updatedState));
  }

  function decreaseQuantity() {
    sessionStorage.removeItem("totalPrice");
    const updatedCart = state.cart.map((item) => {
      if (item.id === _id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });
    const updatedState = { ...state, cart: updatedCart };
    setState(updatedState);
    localStorage.setItem("appstate", JSON.stringify(updatedState));
  }

  return (
    <div className={styles.itemCard}>
      <div className={styles.leftContainer}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.centerContainer}>
        <h3>{productName}</h3>
        <p>
          ₹{productPrice} per {measurement}
        </p>
        <button className={styles.removeButton} onClick={removeItem}>
          Remove
        </button>
      </div>
      <div className={styles.rightContainer}>
        <button disabled={state.cart[index].quantity === quantity} onClick={increaseQuantity}>
          <IoAddSharp />
        </button>
        <p>{state.cart[index].quantity}</p>
        <button disabled={state.cart[index].quantity === 1} onClick={decreaseQuantity}>
          <IoRemoveSharp />
        </button>
      </div>
    </div>
  );
});
