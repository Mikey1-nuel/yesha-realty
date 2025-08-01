"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../../style/meet-the-team.css";

const ManagementTeam = () => {
  const teams = [
    {
      id: 1,
      picture: "/ceo.JPG",
      name: "Samson .I. Oris",
      jobTitle: "Chief Executive Officer",
      experience:
        "He is a highly skilled professional with a strong background in real estate with eight years of experience in the real estate industry. He has a deep understanding of the market dynamics and possesses excellent sales and negotiation skill.",
      width: 700,
      height: 280,
    },
    {
      id: 2,
      picture: "/Picture2.png",
      name: "Temitope Arogunyo",
      jobTitle: "Sales/Marketing Manager",
      experience:
        "He is the Head of Sales and Partnership (B2B, B2C, EDTECH) at Evolve HQ, CEO of Heritagetech Innovations, Senior Sales Manager at Code Funhouse, Lagos Nigeria.",
      width: 700,
      height: 400,
    },
    {
      id: 3,
      picture: "/Picture3.png",
      name: "Guchaks .T. Emmanuel",
      jobTitle: "Architect",
      experience:
        "A highly skilled and accomplished Architect with a passion for design with six years of professional experience. He has honed his skills in various aspects of Architecture, including conceptual design, space planning, construction documentation, and project management.",
      width: 700,
      height: 200,
    },
    {
      id: 4,
      picture: "/Picture4.png",
      name: "Akwunwa Emmanuel",
      jobTitle: "Social Media Manager",
      experience:
        "A multifaceted creative professional, excelling in both a proficient graphics designer and social media manager. With a keen eye for visual storytelling and a deep understanding of online engagement.",
      width: 700,
      height: 200,
    },
  ];

  return (
    <main id="meet-the-team" className="meet-the-team">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Management Team
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Our management team is comprised of experienced and talented
        professionals who are passionate about driving growth, innovation, and
        success. With a diverse range of backgrounds and expertise, our team is
        committed to excellence and delivering exceptional results.
      </motion.p>

      <div className="team-container">
        {teams.map((team, index) => (
          <motion.div
            className="team-member"
            key={team.id}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.3,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="team-member-img">
              <Image
                src={team.picture}
                alt="team-member"
                width={team.width}
                height={team.height}
              />
            </div>
            <h3>{team.name}</h3>
            <p>{team.jobTitle}</p>
            <span>{team.experience}</span>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default ManagementTeam;
