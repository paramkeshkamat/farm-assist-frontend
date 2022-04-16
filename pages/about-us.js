/** @format */
import Intro from "../components/About/Intro/Intro";
import WhyFarmAssist from "../components/About/WhyFarmAssist/WhyFarmAssist";
import Banner from "../components/global/Banner/Banner";

export default function aboutUs() {
  return (
    <div>
      <Banner title="About Us" />
      <Intro />
      <WhyFarmAssist />
    </div>
  );
}
