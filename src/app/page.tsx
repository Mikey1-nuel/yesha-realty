// import { Metadata } from "next";
import Navbar from "./components/navbar/page";
import Hero from "./components/hero/page";
import AboutUs from "./components/about-us/page";
import OurMission from "./components/our-mission/page";
import Project from "./components/project/page";
import ManagementTeam from "./components/meet-the-team/page";
import Footer from "./components/footer/page";

// export const metadata: Metadata = {
//   title: {
//     default: "Yesha Realty Real Estate Company in Abuja",
//     template: "%s - Yesha Realty Real Estate Company in Abuja"
//   },
//   description: "Trusted real estate company in Abuja. Explore verified plots, smart homes, and prime locations.",
//   openGraph: {
//     title: "Yesha Realty Real Estate",
//     description: "Trusted real estate company in Abuja. Explore verified plots, smart homes, and prime locations.",
//     images: [
//       {
//         url: "https://yesha-reality-backend-staging.up.railway.app/IMG-20250728-WA0001.JPG",
//         width: 1200,
//         height: 630,
//         alt: "Yesha Realty Featured Property",
//       },
//     ],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-snippet": -1,
//       "max-image-preview": "large",
//       "max-video-preview": -1,
//     },
//   },
// };

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
