/** @format */

import { useState, useEffect, useContext, memo } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import axiosL from "../../../helpers/axios";
import CartItems from "../CartItems/CartItems";
import PriceDetails from "../PriceDetails/PriceDetails";
import styles from "./NonEmptyCart.module.css";

export default memo(function NonEmptyCart() {
  const [cartItems, setCartItems] = useState([]);
  const { state } = useContext(AppContext);

  useEffect(() => {
    function fetchCartItems() {
      axios
        .all(state.cart.map((item) => axiosL.get(`/api/products/${item.id}`)))
        .then(
          axios.spread((...responses) => {
            const tempCart = responses.map((c) => c.data);
            setCartItems(tempCart);
          }),
        )
        .catch((err) => console.log(err.message));
    }
    if (state.user !== null) {
      if (state.cart?.length > 0) {
        fetchCartItems();
      }
    }
  }, [state.cart, state.user]);

  return (
    <div className={styles.cart}>
      <CartItems cartItems={cartItems} setCartItems={setCartItems} />
      <PriceDetails cartItems={cartItems} />
    </div>
  );
});
