import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import HeroSection from "./herosection/HeroSection";
import BusinessOpportunities from "./opportunities/BusinessOpportunities";
import SignUp from "./signupsection/Signupsection";
import Stats from "./state/Stat";
import StepSection from "./stepsection/StepSection";
import TestimonialSection from "./testimonial/Teastmonial";
import TrendingJobs from "./trendingjobs/TrendingJobs";
import Footer from "@/app/components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TrendingJobs />
      {/* <BusinessOpportunities /> */}
      <StepSection />
      <Stats />
      <TestimonialSection />
      <SignUp />
      <Footer/>
    </div>
  );
};

export default Home;
