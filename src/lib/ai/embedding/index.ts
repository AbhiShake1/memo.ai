import { ai } from "@/lib/ai/core";
import { embed as _embed, embedMany as _embedMany } from "ai";

const embeddingModel = ai.textEmbeddingModel("text-embedding-004")

export async function embed(value: string) {
  const e = await _embed({
    model: embeddingModel,
    value,
  });
  return e.embedding;
}

export async function embedMany(values: string[]) {
  const e = await _embedMany({
    model: embeddingModel,
    values,
  });
  return e.embeddings;
}
