"use client";
import React from "react";
import Image from "next/image";
import { Trash2, Star } from "lucide-react";
import { Agent } from "@/types/agent";
import "../style/properties.css";

type AgentCardProps = {
  agent: Agent;
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
};

const AgentCard = ({
  agent,
  onDelete,
  deletingId,
}: AgentCardProps) => {
  console.log("AgentCard props:", agent);
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const displayAgency = agent.agency || "Freelancer";

  return (
    <div className="agent-card" key={agent.id}>
      <div className="image-et-attribute">
        <div className="agent-img">
          {agent.image ? (
            <Image
              src={`https://yesha-reality-backend-staging.up.railway.app${agent.image}`}
              alt="agent"
              width={400}
              height={210}
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
          <h3>
            {agent.fullName}
          </h3>
          <span>@{displayAgency}</span>
        </div>
        <div className="agent-info-desc">
          <p>
            <strong>Cell: </strong>{agent.phoneNumber}
          </p>
          <p>
            {agent.gender}
          </p>
          <p>
            <strong>Location: </strong> {agent.state}
          </p>
          <p>
            <strong>{agent.experience} </strong> years of experience
          </p>
        </div>
<div className="star-rating">
  {[...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={20}
      color="#facc15" // Tailwind yellow-400
      fill="#facc15"  // Solid fill
      strokeWidth={1.5}
    />
  ))}
</div>
      </div>
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
    </div>
  );
};

export default AgentCard;
