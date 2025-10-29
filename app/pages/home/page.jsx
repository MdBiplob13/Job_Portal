import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import HeroSection from "./herosection/HeroSection";
import SignUp from "./signupsection/Signupsection";
import Stats from "./state/Stat";
import StepSection from "./stepsection/StepSection";
import TestimonialSection from "./testimonial/Teastmonial";
import TrendingJobs from "./trendingjobs/TrendingJobs";
import Footer from "@/app/components/Footer/Footer";
import CategoriesSection from "./categorysection/CategoriesSection";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {/* <TrendingJobs /> */}
      <StepSection />
      <CategoriesSection/>
      <TestimonialSection />
      <Stats />
      <SignUp />
      {/* <BusinessOpportunities /> */}
      <Footer/>
    </div>
  );
};

export default Home;
