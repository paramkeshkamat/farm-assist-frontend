/** @format */
/* eslint-disable @next/next/no-img-element */

import { memo } from "react";
import { useRouter } from "next/router";
import styles from "./RelatedProducts.module.css";

export default memo(function RelatedProducts({ relatedProducts }) {
  const router = useRouter();
  return (
    <div>
      <h2 className={styles.heading}>Related Products</h2>
      <div className={styles.cardContainer}>
        {relatedProducts &&
          relatedProducts?.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/product/${item._id}`)}
              className={styles.card}
            >
              <img src={item.productImage} alt={item.productName} />
              <div>
                <h3>{item.productName}</h3>
                <p>
                  ₹{item.productPrice} per {item.measurement}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
