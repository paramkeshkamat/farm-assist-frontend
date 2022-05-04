/** @format */

import { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import axios from "../helpers/axios";
import Sidebar from "../components/Shop/Sidebar/Sidebar";
import Products from "../components/Shop/Products/Products";
import styles from "../styles/Shop.module.css";

const allCategories = ["all", "vegetables", "fruits", "grains", "pulses", "dairy", "others"];

export async function getStaticProps() {
  const { data } = await axios.get("/api/products");
  return {
    props: { data },
    revalidate: 10,
  };
}

export default memo(function Shop({ data }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(router.query?.category || "all");
  const [products, setProducts] = useState(data);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products?${selectedCategory !== "all" && "category=" + selectedCategory}`,
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProducts();
  }, [selectedCategory]);

  return (
    <div className={styles.shopContainer}>
      <Sidebar
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Products products={products} />
    </div>
  );
});
