/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";
import axios from "../helpers/axios";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const { state, setState } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser(token) {
      try {
        const { data } = await axios.get("/user/get-user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    const appstate = localStorage.getItem("appstate");
    if (appstate) {
      const token = JSON.parse(appstate).user.token;
      fetchUser(token);
    } else {
      router.push("/");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("appstate");
    setState({ cart: [], user: null });
    router.push("/");
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.innerContainer}>
        <h1>User Profile</h1>
        <div className={styles.profileRow}>
          <b>Full Name:</b>&nbsp;{user?.name}
        </div>
        <div className={styles.profileRow}>
          <b>Email:</b>&nbsp;{user?.email}
        </div>
        <div className={styles.profileRow}>
          <b>Phone Number:</b>&nbsp;{user?.phoneNumber}
        </div>
        <div className={styles.profileRow}>
          <b>Street Address:</b>&nbsp;{user?.address}
        </div>
        <div className={styles.profileRow}>
          <b>City:</b>&nbsp;{user?.city}
        </div>
        <div className={styles.profileRow}>
          <b>State:</b>&nbsp;{user?.state}
        </div>
        <div className={styles.profileRow}>
          <b>Pincode:</b>&nbsp;{user?.pincode}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
