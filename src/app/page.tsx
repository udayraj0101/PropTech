import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/landing/Hero";
import Statement from "@/components/landing/Statement";
import DeveloperCoverage from "@/components/landing/DeveloperCoverage";
import DiscoverMarket from "@/components/landing/DiscoverMarket";
import Journey from "@/components/landing/Journey";
import Platform from "@/components/landing/Platform";
import MarketIntelligence from "@/components/landing/MarketIntelligence";
import Modeller from "@/components/landing/Modeller";
import Brokers from "@/components/landing/Brokers";
import AfterDeal from "@/components/landing/AfterDeal";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <SiteHeader />
      <main className="w-full">
        <Hero />
        <Statement />
        <DeveloperCoverage />
        <DiscoverMarket />
        <Journey />
        <Platform />
        <MarketIntelligence />
        <Modeller />
        <Brokers />
        <AfterDeal />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
