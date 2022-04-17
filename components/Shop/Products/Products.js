/** @format */
/* eslint-disable @next/next/no-img-element */

import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Products.module.css";

export default memo(function Products({ products }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Products</h2>
      {products.length > 0 ? (
        <div className={styles.productsContainer}>
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                router.push(`/product/${product._id}`, undefined, {
                  shallow: true,
                })
              }
              className={styles.productCard}
            >
              <img src={product.productImage} alt={product.productName} />
              <div>
                <h3>{product.productName}</h3>
                <p>
                  ₹{product.productPrice} per {product.measurement}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.notAvailable}>
          <Image
            src="/illustrations/notAvailable.png"
            alt="not available"
            width={100}
            height={100}
          />
          <p>No products Available in this category!</p>
        </div>
      )}
    </div>
  );
});
