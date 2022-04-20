/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";
import axios from "../helpers/axios";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const { state, setState } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get("/user/get-user", {
          headers: {
            authorization: `Bearer ${state.user.token}`,
          },
        });
        setUserDetails(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (state.user) {
      if (state.user?.token) {
        fetchUser();
      } else {
        router.push("/");
      }
    }
  }, [state.user]);

  function handleLogout() {
    localStorage.removeItem("appstate");
    setState({ cart: [], user: null });
    router.push("/");
  }

  return (
    <div className={styles.profileContainer}>
      {userDetails && (
        <div className={styles.innerContainer}>
          <h1>User Profile</h1>
          <div className={styles.profileRow}>
            <b>Full Name:</b>&nbsp;{userDetails?.name}
          </div>
          <div className={styles.profileRow}>
            <b>Email:</b>&nbsp;{userDetails?.email}
          </div>
          <div className={styles.profileRow}>
            <b>Phone Number:</b>&nbsp;{userDetails?.phoneNumber}
          </div>
          <div className={styles.profileRow}>
            <b>Street Address:</b>&nbsp;{userDetails?.address}
          </div>
          <div className={styles.profileRow}>
            <b>City:</b>&nbsp;{userDetails?.city}
          </div>
          <div className={styles.profileRow}>
            <b>State:</b>&nbsp;{userDetails?.state}
          </div>
          <div className={styles.profileRow}>
            <b>Pincode:</b>&nbsp;{userDetails?.pincode}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
