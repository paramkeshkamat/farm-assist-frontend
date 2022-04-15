/** @format */

import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../context/AppContext";
import axios from "../helpers/axios";
import styles from "../styles/Register.module.css";

const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$");
const pincodeRegex = new RegExp("^[1-9][0-9]{5}$");
const availablePinCodes = ["400076", "400070", "40037"];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state1, SetState1] = useState("");
  const [pincode, setPinCode] = useState("");

  const [showRequestModal, setShowrequestModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { state, setState } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (!name) {
      setErrorMessage("Name is required!");
    } else if (!email) {
      setErrorMessage("Email is required!");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email!");
    } else if (!address) {
      setErrorMessage("Street Address is required!");
    } else if (!city) {
      setErrorMessage("City is required!");
    } else if (!state1) {
      setErrorMessage("State is required!");
    } else if (!pincode) {
      setErrorMessage("Pin Code is required!");
    } else if (!pincodeRegex.test(pincode)) {
      setErrorMessage("Please enter a valid pincode!");
    } else {
      if (availablePinCodes.includes(pincode)) {
        axios
          .post("/auth/register", {
            name,
            email,
            phoneNumber: "+91 " + localStorage.getItem("USXn0oGA9t3ejTdH6ZVd"),
            address,
            city,
            state: state1,
            pincode,
          })
          .then(({ data }) => {
            if (data.message === "User created successfully") {
              const updated = {
                ...state,
                user: {
                  token: data.accessToken,
                },
              };
              setState(updated);
              localStorage.setItem("appstate", JSON.stringify(updated));
              localStorage.removeItem("USXn0oGA9t3ejTdH6ZVd");
              router.push("/");
            }
          })
          .catch((err) => {
            const statusCode = err.message.split(" ")[err.message.split(" ").length - 1];
            if (statusCode === "409") {
              setErrorMessage("User with this email already exists!");
            }
            console.log(err.message);
          });
      } else {
        setShowrequestModal(true);
      }
    }
  }

  if (state?.user?.token) {
    router.push("/");
  }

  return (
    <>
      {/* Modal */}
      {showRequestModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <h2>Uh Oh!</h2>
            <p>
              Sorry! We do not operate in your location as of now. We&apos;ll work our best to
              service you ASAP!
            </p>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setShowrequestModal(false);
                  localStorage.removeItem("USXn0oGA9t3ejTdH6ZVd");
                  router.push("/");
                }}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className={styles.registerContainer}>
        <div className={styles.innerContainer}>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name*"
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
            <div className={styles.inputField}>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Street Address*"
              />
            </div>
            <div className={styles.inputField}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City*"
              />
            </div>
            <div className={styles.inputField}>
              <input
                value={state1}
                onChange={(e) => SetState1(e.target.value)}
                type="text"
                placeholder="State*"
              />
            </div>
            <div className={styles.inputField}>
              <input
                value={pincode}
                onChange={(e) => setPinCode(e.target.value)}
                type="text"
                placeholder="Pin Code*"
              />
            </div>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <button type="submit">CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
    </>
  );
}
