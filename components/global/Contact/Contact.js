/** @format */

import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <h2>Leave a Message</h2>
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
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Message*"
          />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
