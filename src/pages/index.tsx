import LandingBanner from "@/components/LandingBanner";
import Contribute from "@/components/Contribute";
export default function Home() {
  return (
    <main className="bg-background-container flex items-center">
      <LandingBanner />
      <Contribute />
    </main>
  );
}
