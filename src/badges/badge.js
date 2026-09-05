const fetch = require("isomorphic-fetch");
const Badge = require("./badge.db");

const getBadges = async () => {
  const response = await fetch("/api/badges");
  const data = await response.json();
  return Badge.find(data);
};

module.exports = getBadges;
