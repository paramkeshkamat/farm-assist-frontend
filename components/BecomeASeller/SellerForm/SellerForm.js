/** @format */

import { useState } from "react";
import styles from "./SellerForm.module.css";

export default function SellerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <h2>Request for becoming a seller</h2>
      <form>
        <div className={styles.group}>
          <div className={styles.inputField}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name*"
            />
          </div>
          <div className={styles.inputField}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email*"
            />
          </div>
        </div>
        <div className={styles.inputField}>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Phone Number*"
          />
        </div>
        <div className={styles.inputField}>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Street Address*"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.inputField}>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City/Town/District*"
            />
          </div>
          <div className={styles.inputField}>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="State*"
            />
          </div>
          <div className={styles.inputField}>
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              placeholder="Pincode*"
            />
          </div>
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
