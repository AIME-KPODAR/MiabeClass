import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`🚀 MiabeClass API démarrée sur http://localhost:${env.port}`);
});
