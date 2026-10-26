import express from "express";
import cors from "cors";
import { pool } from "./config/database.js";
import notificationsRoutes from "./routes/notifications.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://12.1.6.149:8080",
      "http://localhost:5173",
      "http://12.0.0.153:8080",
    ],
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "MiabeClass API fonctionne correctement.",
  });
});

app.get("/api/database-test", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, NOW() AS server_time",
    );

    res.json({
      success: true,
      message: "Connexion PostgreSQL réussie.",
      database: result.rows[0].database,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error("Erreur PostgreSQL :", error);

    res.status(500).json({
      success: false,
      message: "Connexion PostgreSQL échouée.",
    });
  }
});

app.use("/api/notifications", notificationsRoutes);

export default app;
