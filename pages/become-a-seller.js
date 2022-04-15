/** @format */

import Banner from "../components/global/Banner/Banner";
import Intro from "../components/BecomeASeller/Intro/Intro";
import SellerForm from "../components/BecomeASeller/SellerForm/SellerForm";

export default function becomeaSeller() {
  return (
    <div>
      <Banner title="Become a Seller" />
      <Intro />
      <SellerForm />
    </div>
  );
}
