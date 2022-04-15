/** @format */

import React from "react";
import axios from "../helpers/axios";
import Banner from "../components/global/Banner/Banner";
import Sidebar from "../components/Shop/Sidebar/Sidebar";
import Products from "../components/Shop/Products/Products";
import styles from "../styles/Shop.module.css";

const sidebarItems = ["All", "Vegetables", "Fruits", "Grains", "Pulses", "Dairy", "Others"];

// export async function getStaticProps() {
//   const { data } = await axios.get("/api/products");

//   return {
//     props: { data },
//     revalidate: 10,
//   };
// }

export default function shop({ data }) {
  console.log(data);
  return (
    <div>
      <Banner title="Shop" />
      <div>
        <Sidebar />
        <Products />
      </div>
    </div>
  );
}
