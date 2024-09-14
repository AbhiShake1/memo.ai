import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TablesInsert } from "types/db";
import { embed } from "@/lib/ai/embedding";

export const memoRouter = createTRPCRouter({
  all: publicProcedure
    .query(async ({ ctx: { db } }) => {
      return db.from("Memo").select("*")
    }),
  search: publicProcedure
    .input(z.object({
      query: z.string(),
    }))
    .query(async ({ ctx: { db }, input: { query } }) => {
      const embedding = await embed(query)
      return db.rpc("match_memos", {
        query_embedding: `[${embedding.toString()}]`,
        match_threshold: .7,
      })
      // return db.from("Memo")
      //   .select("*")
      //   .in("embedding", embedding)
      //   .lt("embedding", .7)
      //   .order("embedding", { ascending: false })
    }),
  create: publicProcedure
    .input(z.custom<Omit<TablesInsert<"Memo">, "embedding">>())
    .mutation(async ({ ctx: { db }, input: memo }) => {
      const embedding = await embed(`${memo.title}\n${memo.description}\n${memo.transcript}`)
      return db.from("Memo").insert({
        ...memo,
        embedding: `[${embedding.toString()}]`,
      })
    }),
});
