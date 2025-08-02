"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import Image from "next/image";
import "../../style/our-story.css";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const advisors = [
  {
    id: 1,
    name: "Rev Biodun Fatoyinbo",
    subtitle: ["The Commonwealth of Zion Assembly (COZA)"],
    image: "/Picture5.png",
    description: `My Father, The Rev Biodun Fatoyinbo is a renowned Nigerian pastor, author, speaker, teacher, archer, mentor... He is the Global Senior Pastor (GSP) of COZA. The Commonwealth of Zion Assembly, a ministry with several branches in Nigeria and around the world. He is a charismatic leader and prolific speaker. He has made significant impact in the lives of many people including me and around the world. He is the mandate holder of the Take over Generation. Known for spirituality and excellence, he continues to inspire and influence a new generation of leaders and believers.`,
  },
  {
    id: 2,
    name: "Pst. Matthew Ashimolowo",
    subtitle: [
      "Senior Pastor of Kingsway International Christian Centre (KICC)",
      "UK",
    ],
    image: "/Picture6.png",
    description: `Pastor Matthew Ashimolowo is a Nigerian-born cleric, philanthropist, and entrepreneur with a significant presence in the global religious and business communities. He is the founder and senior pastor of Kingsway International Christian Centre (KICC) in London, UK. He has made a lasting impact in the lives of millions through his spiritual leadership and entrepreneurial ventures. He is a successful entrepreneur with a keen interest in real estate. He is the chairman of Matthew Ashimolowo Estates, a UK-based property development company and also the chairman of Makarios Luxury Estate Nigeria, that focuses on luxury residential and commercial properties. His real estate portfolio is estimated to be worth between £100 million and £200 million.`,
  },
  {
    id: 3,
    name: "Dr. Gbadewole Amos",
    subtitle: [
      "MD/CEO Crown Allied Global Realty & Homes",
      "Vice President, Real Estate Developers Asseria (REDAN)",
    ],
    image: "/Picture7.png",
    description: `Dr. Gbadewole Amos Kayode is the Managing Director and CEO of Crown Allied Global Realty & Homes Limited, trading as Crown Luxury Properties. He also serves as the Vice President of the Real Estate Developers Association of Nigeria (REDAN) in the Federal Capital Territory, Abuja. With a strong background in economics and a master’s degree in finance, Dr. Kayode brings over 15 years of experience in the building industry and 8 years of expertise in real estate development. Under his leadership, Crown Luxury Properties has successfully completed 19 estate projects across Nigeria within just 4 years, providing over 2,435 housing units.`,
  },
];

const OurStory = () => {
  const goals = [
    {
      id: "01",
      text: "Affordable Pricing: Offer competitive and affordable pricing options for properties, to make them accessible to the lower and middle class earners of customers.",
    },
    {
      id: "02",
      text: "Exceptional Customer Service: Make customer satisfaction a top priority by providing attentive, personalized service throughout the entire real estate experience.",
    },
    {
      id: "03",
      text: "Establish Strong Market Presence: We will establish a strong market presence by building brand recognition, gaining a reputation for quality, excellence and reliability, and becoming a trusted name in the market.",
    },
  ];
  return (
    <main>
      <Navbar />

      <section className="our-story-hero">
        <h1>our story</h1>
      </section>

      <section className="our-goal">
        <h3>our goal</h3>
        <p>
          Yesha Reality Homes Ltd aims to become a reputable and customers
          centric real estate firm. Its primary goal is to provide the best
          service in the industry at an affordable rate while ensuring excellent
          delivery Yesha Reality Homes Ltd aims to differentiate itself in the
          market and create long-term customer satisfaction and loyalty.
        </p>
        <div className="list-of-goals">
          {goals.map((goal, index) => (
            <motion.div
              className="goal"
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              custom={index}
            >
              <h4>{goal.id}</h4>
              <p>{goal.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="founder">
        <motion.div
          className="ceo-img"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image src="/ceo.JPG" alt="ceo" width={300} height={250} />
        </motion.div>

        <motion.div
          className="ceo-writeup"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h5>
            Samson Ifeoluwa Oris <span>CEO</span>
          </h5>
          <p>
            Mr. Samson Ifeoluwa Oris is a highly accomplished real estate
            professional with a proven track record of success. With over 10
            years of experience in the industry, he has established himself as a
            skilled and knowledgeable expert, successfully closing numerous
            deals and selling properties worth over ₦500 million. His impressive
            record includes the complete sellout of more than 6 estates,
            totaling over 500 plots, and strategic collaborations with reputable
            developers such as Crown Allied, Quick Access, and Accuracy Global.
            Throughout his career, Mr. Oris has demonstrated a deep
            understanding of market dynamics and continues to bring value,
            trust, and exceptional service to every transaction.
          </p>
        </motion.div>
      </section>

      <section className="lead-advisors">
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          lead advisors
        </motion.h3>

        <div className="advisor-container">
          {advisors.map((advisor, index) => (
            <motion.div
              className="advisor"
              key={advisor.id}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="advisor-img">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={250}
                  height={250}
                />
              </div>
              <div className="advisor-heading">
                <h4>{advisor.name}</h4>
                {advisor.subtitle.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <span>{advisor.description}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OurStory;
