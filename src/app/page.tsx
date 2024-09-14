import { Home } from "@/components/home";
import { api, HydrateClient } from "@/trpc/server";

export default async function Page({ searchParams: { q } }: { searchParams: Partial<{ q: string }> }) {
  // const search = !q ? [] : await api.memo.search({ query: q })
  return (
    <HydrateClient>
      {/* JSON.stringify(search) */}
      <Home />
    </HydrateClient>
  );
}
