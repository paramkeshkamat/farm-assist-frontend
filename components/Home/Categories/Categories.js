/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import { categories } from "../../../data/categories";
import styles from "./Categories.module.css";

export default function Categories() {
  const router = useRouter();
  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.innerContainer}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.card}
              onClick={() =>
                router.push({
                  pathname: "/shop",
                  query: { category: category.name.toLowerCase() },
                })
              }
            >
              <Image src={category.image} alt={category.name} width={100} height={100} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
