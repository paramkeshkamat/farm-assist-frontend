/** @format */

import { useState } from "react";
import Loader from "../Loader/Loader";
import Image from "next/image";
import axios from "../../../helpers/axios";
import styles from "./Contact.module.css";

const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$");

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      setIsLoading(true);
      if (!name) {
        setErrorMessage("Name is required!");
        setIsLoading(false);
      } else if (!email) {
        setErrorMessage("Email is required!");
        setIsLoading(false);
      } else if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email!");
        setIsLoading(false);
      } else if (!message) {
        setErrorMessage("Message is required!");
        setIsLoading(false);
      } else {
        const response = await axios.post("/api/contactus", { name, email, message });
        if (response.status === 201) {
          setIsLoading(false);
          setShowSuccessModal(true);
        }
      }
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  }

  function clearInputs() {
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <>
      {/* Loader */}
      {isLoading && <Loader />}

      {/* Modal */}
      {showSuccessModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <Image src="/illustrations/success.png" alt="success" width={100} height={100} />
            <p>Thanks for contacting us! We&apos;ll get back to you shortly via email.</p>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  clearInputs();
                }}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className={styles.container}>
        <h2>Leave a Message</h2>
        <form onSubmit={handleSubmit}>
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
    </>
  );
}
