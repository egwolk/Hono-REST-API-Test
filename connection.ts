import { Client } from 'mysql';
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const connection = await new Client().connect({
    hostname: Deno.env.get("DB_HOST"),
    username: Deno.env.get("DB_USER"),
    db: Deno.env.get("DB_NAME"),
    password: Deno.env.get("DB_PASSWORD"),
})

export default connection;