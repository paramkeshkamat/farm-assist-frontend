/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../helpers/axios";
import styles from "../styles/Checkout.module.css";
import CheckoutForm from "../components/Checkout/CheckoutForm/CheckoutForm";

export default function Checkout() {
  const [userDetails, setUserDetails] = useState({});
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser(token) {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/user/get-user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    const appstate = JSON.parse(localStorage.getItem("appstate"));
    if (appstate) {
      if (appstate.cart?.length === 0) {
        router.push("/");
      }
      const totalPrice = sessionStorage.getItem("totalPrice");
      if (totalPrice) {
        setPrice(totalPrice);
      } else {
        router.push("/cart");
      }
      const token = appstate.user.token;
      fetchUser(token);
    } else {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.checkoutContainer}>
      {userDetails && <CheckoutForm userDetails={userDetails} price={price} />}
    </div>
  );
}
