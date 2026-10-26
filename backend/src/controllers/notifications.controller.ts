import { Request, Response } from "express";
import { pool } from "../config/database.js";

export const getNotifications = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        n.id,
        n.user_id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.read_at,
        u.first_name,
        u.last_name,
        u.email
      FROM notifications n
      JOIN users u
        ON n.user_id = u.id
      ORDER BY n.created_at DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      notifications: result.rows,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de récupérer les notifications.",
    });
  }
};

export const getUnreadNotifications = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        n.id,
        n.user_id,
        n.title,
        n.message,
        n.type,
        n.is_read,
        n.created_at,
        n.read_at,
        u.first_name,
        u.last_name,
        u.email
      FROM notifications n
      JOIN users u
        ON n.user_id = u.id
      WHERE n.is_read = FALSE
      ORDER BY n.created_at DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      notifications: result.rows,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des notifications non lues :",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Impossible de récupérer les notifications non lues.",
    });
  }
};

export const getUnreadNotificationsCount = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM notifications
      WHERE is_read = FALSE
    `);

    res.json({
      success: true,
      count: result.rows[0].count,
    });
  } catch (error) {
    console.error(
      "Erreur lors du comptage des notifications non lues :",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Impossible de compter les notifications non lues.",
    });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = Number(req.params.id);

    if (!Number.isInteger(notificationId)) {
      res.status(400).json({
        success: false,
        message: "ID de notification invalide.",
      });
      return;
    }

    const result = await pool.query(
      `
      UPDATE notifications
      SET
        is_read = TRUE,
        read_at = NOW()
      WHERE id = $1
      RETURNING id, user_id, title, message, type, is_read, created_at, read_at
      `,
      [notificationId],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Notification introuvable.",
      });
      return;
    }

    res.json({
      success: true,
      message: "Notification marquée comme lue.",
      notification: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de marquer la notification comme lue.",
    });
  }
};

export const markAllNotificationsAsRead = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await pool.query(`
      UPDATE notifications
      SET
        is_read = TRUE,
        read_at = NOW()
      WHERE is_read = FALSE
    `);

    res.json({
      success: true,
      message: "Toutes les notifications ont été marquées comme lues.",
      updatedCount: result.rowCount,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des notifications :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de marquer toutes les notifications comme lues.",
    });
  }
};
