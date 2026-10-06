// src/app/auth/[path]/page.tsx
import { Auth } from "@/components/auth/auth";
import { viewPaths } from "@better-auth-ui/core";
import { magicLinkPlugin } from "@/lib/auth/magic-link-plugin"; // ✅ Import
import { notFound } from "next/navigation";

// ✅ Magic link plugin ke view paths bhi add karo
const validAuthPaths = new Set([
  ...Object.values(viewPaths.auth),
  ...Object.values(magicLinkPlugin().viewPaths?.auth ?? {}),
]);

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  if (!validAuthPaths.has(path)) {
    notFound();
  }
  return <Auth path={path} />;
}
