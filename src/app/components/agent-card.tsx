"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Star } from "lucide-react";
import { Agent } from "@/types/agent";
import "../style/properties.css";
// import '../style/real-estate-agent-registration.css';

type AgentCardProps = {
  agent: Agent;
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
};

const AgentCard = ({ agent, onDelete, deletingId }: AgentCardProps) => {
  console.log("AgentCard props:", agent);
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const [userRole, setUserRole] = useState<string | null>(null);
  const displayAgency = agent.agency || "Freelancer";

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <div className="agent-card" key={agent.id}>
      <div className="image-et-attribute">
        <div className="agent-img">
          {agent.image ? (
            <Image
              src={agent.image}
              alt={`Real estate agent ${agent.fullName} based in ${agent.state}`}
              width={500}
              height={310}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 350,
                height: 200,
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "#333",
              }}
            >
              No Image Available
            </div>
          )}
        </div>
      </div>

      <div className="agent-info">
        <div className="agent-name-et-agency">
          <h3>{agent.fullName}</h3>
          <span>@{displayAgency}</span>
        </div>
        <div className="agent-info-desc">
          <p>
            <strong>{agent.experience} </strong> years of experience
          </p>
          <p>
            <strong>Bio: </strong>{agent.bio}
          </p>
        </div>
      </div>
      {userRole === "admin" && (
        <Trash2
          size={24}
          color="red"
          className="delete-icon"
          onClick={() => onDelete(agent.id)}
          style={{
            opacity: deletingId === agent.id ? 0.5 : 1,
            pointerEvents: deletingId === agent.id ? "none" : "auto",
          }}
        />
      )}
    </div>
  );
};

export default AgentCard;
