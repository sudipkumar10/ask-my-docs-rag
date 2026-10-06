// src/components/providers.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";
import { toast } from "sonner"; // ✅ Import
import { apiKeyPlugin } from "@/lib/auth/api-key-plugin";
import { deleteUserPlugin } from "@/lib/auth/delete-user-plugin";
import { magicLinkPlugin } from "@/lib/auth/magic-link-plugin";
import { multiSessionPlugin } from "@/lib/auth/multi-session-plugin";
import { organizationPlugin } from "@/lib/auth/organization-plugin";
import { passkeyPlugin } from "@/lib/auth/passkey-plugin";
import { themePlugin } from "@/lib/auth/theme-plugin";
import { usernamePlugin } from "@/lib/auth/username-plugin";
import { authClient } from "@/lib/auth-client";
import { getQueryClient } from "@/lib/query-client";
import { AuthProvider } from "./auth/auth-provider";
import { Toaster } from "./ui/sonner";

const normalizeParam = (param: string | string[] | undefined) =>
  (Array.isArray(param) ? param[0] : param)?.replace(/^@/, "") ?? null;

// ✅ Filter list — yeh messages kabhi show nahi honge
const SUPPRESSED_MESSAGES = [
  "Something went wrong. Please try again.",
  "Something went wrong",
  "An unexpected error occurred.",
];

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const queryClient = getQueryClient();
  const slug = normalizeParam(params.slug);

  // ✅ Global toast filter — Better Auth UI ke generic messages suppress karo
  useEffect(() => {
    const originalError = toast.error;

    const patchedError = (
      message: Parameters<typeof toast.error>[0],
      ...args: Parameters<typeof toast.error> extends [any, ...infer R]
        ? R
        : never
    ) => {
      // Agar message suppressed list mein hai, toh ignore karo
      if (
        typeof message === "string" &&
        SUPPRESSED_MESSAGES.includes(message)
      ) {
        return;
      }
      return originalError(message, ...args);
    };

    toast.error = patchedError as typeof toast.error;

    return () => {
      // Cleanup — original function restore karo
      toast.error = originalError;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authClient={authClient}
        redirectTo="/settings/account"
        socialProviders={["google", "github"]}
        emailAndPassword={{ requireEmailVerification: true }}
        navigate={({ to, replace }) =>
          replace ? router.replace(to) : router.push(to)
        }
        plugins={[
          usernamePlugin({
            usernamePrefix: "@",
            localization: { usernamePlaceholder: "username" },
          }),
          magicLinkPlugin(),
          passkeyPlugin(),
          apiKeyPlugin({ organization: true }),
          themePlugin({ useTheme }),
          multiSessionPlugin(),
          deleteUserPlugin(),
          organizationPlugin({
            slugPrefix: "@",
            slug,
          }),
        ]}
        Link={Link}
      >
        {children}
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
