import AccountCTA from "./components/AccountCTA";
import CalculatorCTA from "./components/CalculatorCTA";
import ChatCTA from "./components/ChatCTA";
import HeroSection from "./components/HeroSection";
import ListingsCTA from "./components/ListingsCTA";
import MostViewedCarousel from "./components/MostViewedCarousel";

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
