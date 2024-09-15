"use server";

import { env } from "@/env";;

export async function getApiKey() {
  return env.DEEPGRAM_API_KEY
}
