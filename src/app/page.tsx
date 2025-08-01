import Navbar from "./components/navbar/page";
import Hero from "./components/hero/page";
import AboutUs from "./components/about-us/page";
import OurMission from "./components/our-mission/page";
import Project from "./components/project/page";
import ManagementTeam from "./components/meet-the-team/page";
import Footer from "./components/footer/page";

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
