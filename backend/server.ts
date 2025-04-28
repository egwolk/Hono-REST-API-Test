import { Hono } from "@hono/hono";
import { noteRoutes } from "./routes/note.route.ts";
import { cors } from "@hono/hono/cors";

const app = new Hono();

app.use("*", cors({
    origin: "http://127.0.0.1:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 600,
})
);
noteRoutes(app);

Deno.serve(app.fetch)