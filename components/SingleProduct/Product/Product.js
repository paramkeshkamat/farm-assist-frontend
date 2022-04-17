/** @format */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useContext, memo } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../context/AppContext";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import styles from "./Product.module.css";

export default memo(function Product({ product, seller }) {
  const [quantity, setQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCartButton, setShowCartButton] = useState(true);
  const { state, setState } = useContext(AppContext);
  const router = useRouter();

  function addToCart() {
    if (!state.user) {
      setShowModal(true);
      return;
    }
    const newItem = {
      id: product._id,
      quantity,
    };
    const updatedState = {
      ...state,
      cart: [...state.cart, newItem],
    };
    setState(updatedState);
    setShowCartButton(false);
    localStorage.setItem("appstate", JSON.stringify(updatedState));
  }

  useEffect(() => {
    const appstate = JSON.parse(localStorage.getItem("appstate"));
    if (appstate) {
      const ifExist = appstate.cart.filter((item) => item.id === product._id);
      if (ifExist.length > 0) {
        setShowCartButton(false);
        setQuantity(ifExist[0].quantity);
      }
    }
  }, []);

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <p>Please Signin in order to add items to your cart.</p>
            <div className={styles.buttonContainer}>
              <button onClick={() => setShowModal(false)}>Okay</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.productContainer}>
        <div className={styles.leftContainer}>
          <img src={product.productImage} alt={product.productName} />
        </div>
        <div className={styles.rightContainer}>
          <h2>{product.productName}</h2>
          <p>
            <span>Seller Name: </span> {seller.name}
          </p>
          <p>
            <span>Seller Contact Number: </span> {seller.name}
          </p>
          <p>
            <span>Location: </span> {seller.city}, {seller.state}
          </p>
          <p>
            <span>Category: </span> {product.productCategory}
          </p>
          <p>
            <span>Description: </span>
            {product.productDescription}
          </p>
          <p>
            <span>Available Quantity: </span> {product.quantity} {product.measurement}
          </p>
          <p>
            <span>Price: </span> ₹{product.productPrice} per {product.measurement}
          </p>

          <div className={styles.quantityContainer}>
            <span>Quantity (per {product.measurement}): </span>
            <div className={styles.quantityButtons}>
              <button
                disabled={quantity === 0}
                onClick={() => setQuantity((prevState) => prevState - 1)}
              >
                <IoRemoveSharp />
              </button>
              <p>{quantity}</p>
              <button
                disabled={quantity === product.quantity}
                onClick={() => setQuantity((prevState) => prevState + 1)}
              >
                <IoAddSharp />
              </button>
            </div>
          </div>

          {showCartButton ? (
            <button disabled={quantity === 0} onClick={addToCart}>
              Add to cart
            </button>
          ) : (
            <button onClick={() => router.push("/cart")}>Go to cart</button>
          )}
        </div>
      </div>
    </>
  );
});
