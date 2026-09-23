import Hero from "@/components/sections/Hero";
import InventoryShowcase from "@/components/InventoryShowcase";
import Categories from "@/components/sections/Categories";
import LuxuryCollection from "@/components/sections/LuxuryCollection";
import PreOwned from "@/components/sections/PreOwned";
import FeaturedVehicle from "@/components/sections/FeaturedVehicle";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SellYourCar from "@/components/sections/SellYourCar";
import Finance from "@/components/sections/Finance";
import TestDrive from "@/components/sections/TestDrive";
import Testimonials from "@/components/sections/Testimonials";
import Showroom from "@/components/sections/Showroom";
import ContactForm from "@/components/sections/ContactForm";
import { featuredVehicle } from "@/lib/vehicles";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InventoryShowcase />
      <Categories />
      <LuxuryCollection />
      <PreOwned />
      <FeaturedVehicle v={featuredVehicle} />
      <WhyChooseUs />
      <SellYourCar />
      <Finance />
      <TestDrive />
      <Testimonials />
      <Showroom />
      <ContactForm />
    </>
  );
}
