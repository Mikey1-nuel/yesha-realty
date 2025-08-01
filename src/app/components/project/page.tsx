"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../../style/project.css";

const Project = () => {
  const projects = [
    {
      id: 1,
      title: "Soteria City, Jikoyi FCT Abuja",
      image: "/IMG-20250728-WA0000.jpg",
      link: "/page/jikwoyi",
    },
    {
      id: 2,
      title: "Soteria City Phase II, Kuje FCT Abuja",
      image: "/IMG-20250728-WA0000.jpg",
      link: "/page/kuje",
    },
    {
      id: 3,
      title: "Soteria City, Jikoyi FCT Abuja",
      image: "/IMG-20250728-WA0000.jpg",
      link: "/page/jikwoyi",
    },
  ];
  return (
    <main id="project" className="project-container">
      <div className="project-subcontainer">
        <h1>Project</h1>
        <p>
          Introducing SOTERIA CITY, a cutting-edge smart estate that redefines
          the future of living. This innovative community boasts
          state-of-the-art smart home technology, seamlessly integrating
          comfort, convenience, and sustainability. Strategically situated in a
          rapidly growing area, SOTERIA CITY offers a prime opportunity for
          investors to maximize their returns. With its unique blend of modern
          luxury and smart living, this estate is poised to set a new standard
          for urban development.
        </p>
        <div className="project-content">
          {projects.map((project, index) => (
            <div className="project-card" key={project.id}>
              <Link href={project.link}>
                <motion.div
                  className="project-card-img"
                  initial={{ scaleX: 0.8, opacity: 0, y: 20 }}
                  whileInView={{ scaleX: 1, opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                  style={{ transformOrigin: "left center" }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <Image
                    src={project.image}
                    alt="Project Image"
                    width={700}
                    height={400}
                  />
                </motion.div>
                <h3 className="location">{project.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Project;
