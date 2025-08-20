import { Metadata } from "next";
import Navbar from "./components/navbar/page";
import Hero from "./components/hero/page";
import AboutUs from "./components/about-us/page";
import OurMission from "./components/our-mission/page";
import Project from "./components/project/page";
import ManagementTeam from "./components/meet-the-team/page";
import Footer from "./components/footer/page";

export const metadata: Metadata = {
  title: "Luxury Homes in Abuja | Yesha Realty Real Estate",
  description:
    "Browse premium listings in Abuja with Yesha Realty. Smart homes, affordable prices, expert agents.",
  openGraph: {
    title: "Luxury Homes in Abuja | Yesha Realty",
    description:
      "Browse premium listings in Abuja with Yesha Realty. Smart homes, affordable prices, expert agents.",
    images: [
      {
        url: "https://yesha-reality-backend-staging.up.railway.app/IMG-20250728-WA0001.JPG",
        width: 1200,
        height: 630,
        alt: "Yesha Realty Featured Property",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutUs />
      <OurMission />
      <Project />
      <ManagementTeam />
      <Footer />
    </div>
  );
}
