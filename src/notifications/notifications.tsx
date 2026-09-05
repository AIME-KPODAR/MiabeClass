import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/notifications/notifications"!</div>;
}
import React, { useState, useEffect } from "react";
/*import { Link } from "react-router-dom";*/

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  const handleNotification = (notification) => {
    setNewNotification(notification);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <span>{notification.message}</span>
            <button>Supprimer</button>
          </li>
        ))}
      </ul>
      {newNotification && (
        <div>
          <span>{newNotification.message}</span>
          <button>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
