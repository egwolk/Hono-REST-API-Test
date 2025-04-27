import { Hono } from "@hono/hono";
import { noteRoutes } from "./routes/note.route.ts";

const app = new Hono();

app.use('*',cors())
noteRoutes(app);

Deno.serve(app.fetch)