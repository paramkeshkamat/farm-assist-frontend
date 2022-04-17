/** @format */

import { memo } from "react";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

export default memo(function Sidebar({ allCategories, selectedCategory, setSelectedCategory }) {
  const router = useRouter();
  return (
    <div className={styles.categoriesContainer}>
      <h2>Categories</h2>
      <div>
        {allCategories.map((item, index) => (
          <p
            key={index}
            onClick={() => {
              setSelectedCategory(item);
              router.push(`/shop?category=${item}`);
            }}
            className={`${selectedCategory === item ? styles.active : null}`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
});
