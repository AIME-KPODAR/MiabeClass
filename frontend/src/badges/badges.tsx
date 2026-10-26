import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/badges/badges")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/badges/badges"!</div>;
}

import React, { useState, useEffect } from "react";
/* import { Link } from "react-router-dom"; */

const Badge = () => {
  const [badges, setBadges] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchBadges = async () => {
      const response = await fetch("/api/badges");
      const data = await response.json();
      setBadges(data);
    };
    fetchBadges();
  }, []);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div>
      <h2>Badges</h2>
      <ul>
        {badges.map((badge) => (
          <li key={badge.id}>
            <span>{badge.name}</span>
            <span>{badge.score}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Gagner un badge !</button>
      <p>Score : {score}</p>
    </div>
  );
};

export default Badge;
