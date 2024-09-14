import "server-only";
import { createBrowserClient } from "@supabase/ssr"
import { env } from "@/env";
import { Database } from "types/db";

export const db = createBrowserClient<Database>(
  env.SUPABASE_URL!,
  env.SUPABASE_ANON_KEY!
);
