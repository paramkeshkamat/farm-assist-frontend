/** @format */

import { useState } from "react";
import Image from "next/image";
import Loader from "../../global/Loader/Loader";
import axios from "../../../helpers/axios";
import { storage } from "../../../utils/firebase";
import styles from "./SellerForm.module.css";

const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$");
const pincodeRegex = new RegExp("^[1-9][0-9]{5}$");

export default function SellerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsLoading(true);
      if (!name) {
        setErrorMessage("Full Name is required!");
        setIsLoading(false);
      } else if (!email) {
        setErrorMessage("Email is required!");
        setIsLoading(false);
      } else if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email!");
        setIsLoading(false);
      } else if (!phoneNumber) {
        setErrorMessage("Phone Number is required!");
        setIsLoading(false);
      } else if (phoneNumber.length < 10) {
        setErrorMessage("Please enter a valid mobile number (10 digits)");
        setIsLoading(false);
      } else if (!address) {
        setErrorMessage("Street Address is required!");
        setIsLoading(false);
      } else if (!city) {
        setErrorMessage("City/Town/District is required!");
        setIsLoading(false);
      } else if (!state) {
        setErrorMessage("State is required!");
        setIsLoading(false);
      } else if (!pincode) {
        setErrorMessage("Pin Code is required!");
        setIsLoading(false);
      } else if (!pincodeRegex.test(pincode)) {
        setErrorMessage("Please enter a valid pincode!");
        setIsLoading(false);
      } else if (!profileImage) {
        setErrorMessage("Please add a profile image!");
        setIsLoading(false);
      }
      {
        if (image) {
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              // console.log(progress);
            },
            (err) => console.log(err.message),
            () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  axios
                    .post("/seller/create", {
                      name,
                      email,
                      phoneNumber: "+91 " + phoneNumber,
                      address,
                      city,
                      state,
                      pincode,
                      profileImage: url,
                    })
                    .then(() => {
                      setIsLoading(false);
                      setShowSuccessModal(true);
                    })
                    .catch((err) => {
                      if (err.response.status === 409) {
                        setErrorMessage(err.response.data.error.message);
                      }
                      console.log(err.message);
                      setIsLoading(false);
                    });
                })
                .catch((err) => {
                  console.log(err.message);
                  setIsLoading(false);
                });
            },
          );
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
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setProfileImage("");
    setImage("");
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
            <p>Your Request has been submitted! We&apos;ll get back to you shortly via email.</p>
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
        <h2>Request for becoming a seller</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
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
          <b style={{ fontWeight: 500 }}>Profile Image</b>
          <div className={styles.inputField} style={{ marginTop: 5 }}>
            <input
              value={profileImage}
              onChange={(e) => {
                setProfileImage(e.target.value);
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type="file"
              placeholder="Profile Image*"
              accept="image/*"
            />
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
