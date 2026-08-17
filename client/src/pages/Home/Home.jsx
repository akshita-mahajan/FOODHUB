import "./Home.css";

import Hero from "../../components/hero/Hero";
import Trusted from "../../components/trusted/Trusted";
import Categories from "../../components/categories/Categories";
import RestaurantSection from "../../pages/Restaurants/Restaurants";
import MenuSection from "../../components/menu/MenuSection";
import Features from "../../components/features/Features";
import Delivery from "../../components/delivery/Delivery";
import Offers from "../../components/offers/Offers";
import Testimonials from "../../components/reviews/Testimonials";
import AppDownload from "../../components/download/AppDownload";
import SectionReveal from "../../components/common/SectionReveal";

function Home() {
  return (
    <>
      <Hero />
      <SectionReveal><Trusted /></SectionReveal>
      <SectionReveal><Categories /></SectionReveal>
      <SectionReveal><RestaurantSection /></SectionReveal>
      <SectionReveal><MenuSection /></SectionReveal>
      <SectionReveal><Features /></SectionReveal>
      <SectionReveal><Delivery /></SectionReveal>
      <SectionReveal><Offers /></SectionReveal>
      <SectionReveal><Testimonials /></SectionReveal>
      <SectionReveal><AppDownload /></SectionReveal>
    </>
  );
}

export default Home;