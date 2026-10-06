// app/dashboard/page.tsx
import { ensureSessionServer } from "@better-auth-ui/core/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";

export default async function DashboardPage() {
  const requestHeaders = await headers();
  const queryClient = getQueryClient();
  const session = await ensureSessionServer(queryClient, auth, {
    headers: requestHeaders,
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Dashbaord Page</h1>
      </div>
    </HydrationBoundary>
  );
}
