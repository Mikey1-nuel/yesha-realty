import React from "react";
import Image from "next/image";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import "../../style/real-estate-agent-registration.css";

const BecomeAnAgent = () => {
  return (
    <main>
      <Navbar />

      <section className="real-estate-hero">
        <div className="real-estate-text">
          <h1>Create your real estate agent profile</h1>
          <p>
            Begin your journey as a trusted real estate agent by creating your
            professional profile. Provide accurate details about your
            experience, contact information, and preferred locations to help
            potential clients and agencies connect with you easily. 
          </p>
          <a href="/page/real-estate-agent-registration-form">
          <button className="create-account">Sign up now</button>
          </a>
        </div>

        <div className="real-estate-agent">
          <Image
            src="/man-suit-holding-bullseye.jpg"
            alt=""
            width={500}
            height={700}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BecomeAnAgent;
