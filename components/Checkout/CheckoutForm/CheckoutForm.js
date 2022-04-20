/** @format */

import { useState, memo } from "react";
import axios from "../../../helpers/axios";
import SuccessModal from "../SuccessModal/SuccessModal";
import styles from "./CheckoutForm.module.css";

const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$");
const pincodeRegex = new RegExp("^[1-9][0-9]{5}$");

export default memo(function CheckoutForm({ userDetails, price }) {
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber.slice(4));
  const [address, setAddress] = useState(userDetails.address);
  const [city, setCity] = useState(userDetails.city);
  const [state1, SetState1] = useState(userDetails.state);
  const [pincode, setPinCode] = useState(userDetails.pincode);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function initializeRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function makePayment() {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const { data } = await axios.post("/api/razorpay", { price });

    var options = {
      key: "rzp_test_8EuNLe8dKOIYwT",
      name: "Farm Assist",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "",
      image: "",
      handler: function (response) {
        console.log(response);
        alert("Payed money by razor pay");
      },
      prefill: {},
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (!name) {
      setErrorMessage("Full Name is required!");
    } else if (!email) {
      setErrorMessage("Email is required!");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email!");
    } else if (!address) {
      setErrorMessage("Street Address is required!");
    } else if (!city) {
      setErrorMessage("City/Town/District is required!");
    } else if (!state1) {
      setErrorMessage("State is required!");
    } else if (!pincode) {
      setErrorMessage("Pin Code is required!");
    } else if (!pincodeRegex.test(pincode)) {
      setErrorMessage("Please enter a valid pincode!");
    } else {
      if (paymentMethod === "Online Payment") {
        makePayment();
      } else {
        alert("Pay on Delivery");
      }
    }
  }

  return (
    <>
      {showSuccessModal && <SuccessModal setShowSuccessModal={setShowSuccessModal} />}
      <div className={styles.innerContainer}>
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label>Full Name</label>
            <div className={styles.inputField}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name*"
              />
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <label>Email</label>
              <div className={styles.inputField}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email*"
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label>Phone Number</label>
              <div className={styles.inputField}>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="Phone Number*"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Street Address</label>
            <div className={styles.inputField}>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Street Address*"
              />
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.inputWrapper}>
              <label>City/Town/District</label>
              <div className={styles.inputField}>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City/Town/District*"
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label>State</label>
              <div className={styles.inputField}>
                <input
                  value={state1}
                  onChange={(e) => SetState1(e.target.value)}
                  type="text"
                  placeholder="State*"
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label>Pincode</label>
              <div className={styles.inputField}>
                <input
                  value={pincode}
                  onChange={(e) => setPinCode(e.target.value)}
                  type="text"
                  placeholder="Pin Code*"
                />
              </div>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label>Payment Method</label>
            <div className={styles.radioButtonContainer}>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "Cash On Delivery"}
                  onChange={() => setPaymentMethod("Cash On Delivery")}
                />
                Cash On Delivery
              </label>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "Online Payment"}
                  onChange={() => setPaymentMethod("Online Payment")}
                />
                Online Payment
              </label>
            </div>
          </div>
          <div className={styles.price}>
            <p>Total Price : ₹{price}</p>
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
});
