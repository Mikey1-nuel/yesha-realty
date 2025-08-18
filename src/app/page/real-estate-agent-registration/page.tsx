'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import "../../style/real-estate-agent-registration.css";
import AgentCard from "@/app/components/agent-card";
import { Agent } from "@/types/agent";

const BecomeAnAgent = () => {
    const [availableAgents, setAvailableAgents] = useState<Agent[]>(
      []
    );
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [filtered, setFiltered] = useState<Agent[]>([]);
    useEffect(() => {
    fetch("https://yesha-reality-backend-staging.up.railway.app/agents")
      .then((res) => res.json())
      .then((data) => {
        // Sort by most recent
        const sortedData = [...data].sort(
          (a, b) => b.experience - a.experience
        );
  
        setAvailableAgents(sortedData);
        console.log(setAvailableAgents(sortedData));
        
        setFiltered(sortedData);
      })
      .catch((err) => console.error("Error fetching agents:", err));
  }, []);

const handleDeleteAgent = async (id: number) => {
  setDeletingId(id);
  try {
    const res = await fetch(`https://yesha-reality-backend-staging.up.railway.app/agents/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error:", errorText);
      throw new Error("Failed to delete agent");
    }

    console.log("Deleted agent:", await res.json());

    const updatedRes = await fetch("https://yesha-reality-backend-staging.up.railway.app/agents");
    const updatedData = await updatedRes.json();
    setAvailableAgents(updatedData);
    setFiltered(updatedData);
  } catch (err) {
    console.error("Error deleting agent:", err);
  } finally {
    setDeletingId(null);
  }
};

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

      <section className="agents-container">
        <h1>Real estate agents</h1>
                    <div
              className={`mobile-propty-container ${
                filtered.length === 0 ? "full-grid" : ""
              }`}
            >
              {filtered.length === 0 ? (
                <div className="not-found">
                  <p>No matching properties found.</p>
                  <span>
                    It looks like there are no properties matching your current
                    search criteria. Please try adjusting your filters or clear
                    them to see all available properties.
                  </span>
                </div>
              ) : (
                availableAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} onDelete={handleDeleteAgent} deletingId={deletingId}

 />
                ))
              )}
            </div>
      </section>

      <Footer />
    </main>
  );
};

export default BecomeAnAgent;
