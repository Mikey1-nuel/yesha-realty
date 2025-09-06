"use client";
import React, { useState, useEffect } from 'react';
import AgentCard from '@/app/components/agent-card';
import { Agent } from "@/types/agent";
import "../../style/real-estate-agent-registration.css";
import '../../style/agent-spotlight.css';

export default function AgentSpotlight() {
    const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
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
      const res = await fetch(
        `https://yesha-reality-backend-staging.up.railway.app/agents/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to delete agent");
      }

      console.log("Deleted agent:", await res.json());

      const updatedRes = await fetch(
        "https://yesha-reality-backend-staging.up.railway.app/agents"
      );
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
    <section className="agent-spotlight">
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
                search criteria. Please try adjusting your filters or clear them
                to see all available properties.
              </span>
            </div>
          ) : (
            availableAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onDelete={handleDeleteAgent}
                deletingId={deletingId}
              />
            ))
          )}
        </div>
      </section>
    </section>
  );
}
