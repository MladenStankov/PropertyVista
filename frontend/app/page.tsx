import AccountCTA from "./components/home/AccountCTA";
import CalculatorCTA from "./components/home/CalculatorCTA";
import ChatCTA from "./components/home/ChatCTA";
import HeroSection from "./components/home/HeroSection";
import ListingsCTA from "./components/home/ListingsCTA";
import MostViewedCarousel from "./components/home/MostViewedCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <AccountCTA />
      <MostViewedCarousel />
      <ListingsCTA />
      <CalculatorCTA />
      <ChatCTA />
    </div>
  );
}
