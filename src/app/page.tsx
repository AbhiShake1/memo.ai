import { Home } from "@/components/home";
import { api, HydrateClient } from "@/trpc/server";

export default async function Page() {
  return (
    <HydrateClient>
      <Home />
    </HydrateClient>
  );
}
