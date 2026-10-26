import "dotenv/config";

const port = Number(process.env.PORT ?? 3000);

if (Number.isNaN(port)) {
  throw new Error("La variable PORT doit être un nombre.");
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,

  database: {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: Number(process.env.DATABASE_PORT ?? 5432),
    name: process.env.DATABASE_NAME ?? "miabeclass",
    user: process.env.DATABASE_USER ?? "postgres",
    password: process.env.DATABASE_PASSWORD ?? "",
  },
};
