import { Router } from "express";
import {
  getNotifications,
  getUnreadNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notifications.controller.js";

const router = Router();

router.get("/count", getUnreadNotificationsCount);

router.get("/unread", getUnreadNotifications);

router.patch("/read-all", markAllNotificationsAsRead);

router.patch("/:id/read", markNotificationAsRead);

router.get("/", getNotifications);

export default router;
