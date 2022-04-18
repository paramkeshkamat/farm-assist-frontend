/** @format */

import { useState, useEffect, memo } from "react";
import axios from "axios";
import axiosL from "../../../helpers/axios";
import CartItems from "../CartItems/CartItems";
import PriceDetails from "../PriceDetails/PriceDetails";
import styles from "./NonEmptyCart.module.css";

export default memo(function NonEmptyCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    function fetchCartItems(c) {
      axios
        .all(c.map((item) => axiosL.get(`/api/products/${item.id}`)))
        .then(
          axios.spread((...responses) => {
            const tempCart = responses.map((c) => c.data);
            setCartItems(tempCart);
          }),
        )
        .catch((err) => console.log(err.message));
    }
    const appstate = JSON.parse(localStorage.getItem("appstate"));
    if (appstate) {
      fetchCartItems(appstate.cart);
    }
  }, []);

  return (
    <div className={styles.cart}>
      <CartItems cartItems={cartItems} setCartItems={setCartItems} />
      <PriceDetails cartItems={cartItems} />
    </div>
  );
});
