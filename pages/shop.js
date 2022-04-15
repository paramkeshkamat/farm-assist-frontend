/** @format */

import Banner from "../components/global/Banner/Banner";
import Categories from "../components/global/Categories/Categories";

export default function shop({ data }) {
  console.log(data);
  return (
    <div>
      <Banner title="Shop" />
      <Categories />
    </div>
  );
}
