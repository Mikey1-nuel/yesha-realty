import React from "react";
import "../../style/WhyChooseYesha.css";

export default function WhyChooseYesha() {
  return (
    <section className="why-choose">
      <h2>Why Choose Yesha Reality?</h2>
      <p className="intro">
        At Yesha Reality, we don’t just sell properties, we unlock
        possibilities. Whether you're buying your first home or investing in
        your future, we bring unmatched local insight, integrity, and speed to
        every transaction.
      </p>
      <div className="benefit-grid">
        <div className="benefit-card">
          <h3>📍 Local Expertise</h3>
          <p>
            Whether you're looking for serene family estates in Asokoro or
            vibrant investment opportunities in Lugbe, our team brings unmatched
            insight into Abuja’s real estate landscape.
          </p>
        </div>
        <div className="benefit-card">
          <h3>💰 Transparent Pricing</h3>
          <p>
            No hidden fees, no surprises. We believe in honest deals that
            respect your time and your wallet.
          </p>
        </div>
        <div className="benefit-card">
          <h3>🤝 Trusted by Hundreds</h3>
          <p>
            Our reputation is built on trust. Hundreds of satisfied buyers have
            found their dream homes with us and you could be next.
          </p>
        </div>
        <div className="benefit-card">
          <h3>⚡ Fast Closings</h3>
          <p>
            We streamline the process so you can move in faster. From paperwork
            to keys, we keep things smooth and stress-free.
          </p>
        </div>
      </div>
    </section>
  );
}
