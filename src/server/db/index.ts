import "server-only";

import { createServerClient } from "@supabase/ssr"
import { env } from "@/env";
import { Database } from "types/db";
import { cookies } from "next/headers";

const cookieStore = cookies()

export const db = createServerClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY, {
  cookies: {
    getAll: () => cookieStore.getAll(),
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        )
      } catch {
        // The `setAll` method was called from a Server Component.
        // This can be ignored if you have middleware refreshing
        // user sessions.
      }
    },
  },
}
);
