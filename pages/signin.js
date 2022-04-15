/** @format */

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../helpers/axios";
import { firebase, auth } from "../utils/firebase";
import { AppContext } from "../context/AppContext";
import PinInput from "react-pin-input";
import styles from "../styles/Signin.module.css";

export default function Signin() {
  const [phonenumber, setPhonenumber] = useState("");
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { state, setState } = useContext(AppContext);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (phonenumber.length < 10) {
      setErrorMessage("Please enter a valid mobile number (10 digits)");
      return;
    }
    const verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber("+91" + phonenumber, verify)
      .then((result) => {
        setFinal(result);
        setShow(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function validateOtp(otp) {
    final
      .confirm(otp)
      .then((result) => {
        // success
        axios
          .post("/auth/checkAuth", {
            phoneNumber: "+91 " + phonenumber,
          })
          .then(({ data }) => {
            if (data.message === "User does not exist") {
              localStorage.setItem("USXn0oGA9t3ejTdH6ZVd", phonenumber);
              router.push("/register");
            } else {
              const updated = {
                ...state,
                user: {
                  token: data.accessToken,
                },
              };
              setState(updated);
              localStorage.setItem("appstate", JSON.stringify(updated));
              router.push("/");
            }
          });
      })
      .catch((err) => {
        // failure
        setErrorMessage("Invalid Otp");
        console.log(err.message);
      });
  }

  if (state?.user?.token) {
    router.push("/");
  }

  return (
    <div className={styles.signinContainer}>
      {!show && (
        <div className={styles.innerContainer}>
          <h1>
            Login <span>or</span> Signup
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <span>+91</span>
              <input
                value={phonenumber}
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                  setErrorMessage("");
                }}
                type="text"
                placeholder="Phone Number"
              />
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <p>
              By continuing, I agree to the{" "}
              <Link href="/terms-of-use">
                <a>Terms of Use</a>
              </Link>{" "}
              &#38;{" "}
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </p>
            <div id="recaptcha-container" style={{ marginBottom: 24 }}></div>
            <button type="submit">CONTINUE</button>
            <p style={{ marginBottom: 0 }}>
              Have trouble logging in?{" "}
              <Link href="/contact-us">
                <a>Get help</a>
              </Link>{" "}
            </p>
          </form>
        </div>
      )}
      {show && (
        <div className={styles.innerContainer}>
          <h1>Verify OTP</h1>
          <p style={{ marginTop: -20 }}>Sent to {phonenumber}</p>
          <PinInput
            length={6}
            focus
            initialValue=""
            type="numeric"
            inputMode="number"
            secret={false}
            style={{ marginBottom: 24 }}
            inputStyle={{ borderColor: "#d4d5d9" }}
            inputFocusStyle={{ borderColor: "#000" }}
            onComplete={(value) => validateOtp(value)}
            autoSelect={true}
            regexCriteria={/^[0-9]$/}
            onChange={() => setErrorMessage(false)}
          />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <p style={{ marginBottom: 0 }}>
            Have trouble logging in?{" "}
            <Link href="/contact-us">
              <a>Get help</a>
            </Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
