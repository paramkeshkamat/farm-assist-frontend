/** @format */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import axios from "../../helpers/axios";
import Product from "../../components/SingleProduct/Product/Product";
import Similar from "../../components/SingleProduct/RelatedProducts/RelatedProducts";
import styles from "../../styles/SingleProduct.module.css";

export async function getServerSideProps({ res, params }) {
  const { id } = params;
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    return {
      props: { product: data },
    };
  } catch (err) {
    res.statusCode = 302;
    res.setHeader("Location", "/404");
    res.end();
  }
}

export default memo(function SingleProduct({ product }) {
  const [seller, setSeller] = useState("");
  const [relatedProducts, setRelatedProducts] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSeller = async () => {
      try {
        const { data } = await axios.get(`/seller-by-id/${product.sellerId}`);
        setSeller(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getRelatedProducts = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/?category=${product.productCategory}&limit=4`,
        );
        setRelatedProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getSeller();
    getRelatedProducts();
  }, []);

  return (
    <div className={styles.container}>
      <Product product={product} seller={seller} />
      <Similar relatedProducts={relatedProducts} />
    </div>
  );
});
