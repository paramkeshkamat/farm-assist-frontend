/** @format */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, useContext, memo } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "../../../helpers/axios";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import styles from "./SingleCartItem.module.css";

export default memo(function SingleCartItem({ id, quantity, setCart, index }) {
  const [item, setItem] = useState({});
  const { state, setState } = useContext(AppContext);

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setItem(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchItem();
  }, [id]);

  function removeItem() {
    const updatedCart = state.cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    const updatedState = {
      ...state,
      cart: updatedCart,
    };
    setState(updatedState);
    localStorage.setItem("appstate", JSON.stringify(updatedState));
  }

  function increaseQuantity() {
    const updatedCart = state.cart.map((item) => {
      if (item.id === id) {
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
    const updatedCart = state.cart.map((item) => {
      if (item.id === id) {
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
        <img src={item.productImage} alt={item.productname} />
      </div>
      <div className={styles.centerContainer}>
        <h3>{item.productName}</h3>
        <p>
          ₹{item.productPrice} per {item.measurement}
        </p>
        <p className={styles.removeButton} onClick={removeItem}>
          Remove
        </p>
      </div>
      <div className={styles.rightContainer}>
        <button disabled={state.cart[index].quantity === item.quantity} onClick={increaseQuantity}>
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
