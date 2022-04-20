/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../context/AppContext";
import CheckoutForm from "../components/Checkout/CheckoutForm/CheckoutForm";
import axios from "../helpers/axios";
import styles from "../styles/Checkout.module.css";

export default function Checkout() {
  const [userDetails, setUserDetails] = useState(null);
  const [price, setPrice] = useState("");
  const { state } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get("/user/get-user", {
          headers: {
            authorization: `Bearer ${state.user.token}`,
          },
        });
        // console.log(data);
        setUserDetails(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (state.user !== null) {
      if (state.user?.token) {
        if (state.cart?.length === 0) {
          router.push("/");
        }
        const totalPrice = sessionStorage.getItem("totalPrice");
        if (totalPrice) {
          setPrice(totalPrice);
        } else {
          router.push("/cart");
        }
        fetchUser();
      } else {
        router.push("/");
      }
    }
  }, [state.user]);

  return (
    <div className={styles.checkoutContainer}>
      {userDetails && <CheckoutForm userDetails={userDetails} price={price} />}
    </div>
  );
}
