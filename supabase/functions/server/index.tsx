import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-97ba3c86/health", (c) => {
  return c.json({ status: "ok" });
});

// Password verification endpoint
app.post("/make-server-97ba3c86/verify-password", async (c) => {
  try {
    const { password } = await c.req.json();
    
    // Check if password exists in KV store
    let storedPassword = await kv.get("site_password");
    
    // Initialize if not present (self-healing for demo)
    if (!storedPassword) {
      storedPassword = "designair111";
      await kv.set("site_password", storedPassword);
    }
    
    // Simple case-insensitive comparison
    const isValid = password.toLowerCase() === storedPassword.toLowerCase();
    
    return c.json({ valid: isValid });
  } catch (error) {
    console.error("Password verification error:", error);
    return c.json({ valid: false, error: "Verification failed" }, 500);
  }
});

Deno.serve(app.fetch);