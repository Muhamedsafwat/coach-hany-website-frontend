import HeroSection from "../sections/homepage/HeroSection";
import Advantages from "../sections/homepage/Advantages";
import Services from "../sections/homepage/Services";
import RegisterNow from "../sections/homepage/RegisterNow";
import Plans from "../sections/homepage/Plans";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Advantages />
      <Services />
      <RegisterNow />
      <Plans />
    </>
  );
}
