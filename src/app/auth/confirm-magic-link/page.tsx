"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function ConfirmMagicLinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!token) {
      setError("Token not found in URL.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await authClient.magicLink.verify({
        query: { token },
      });

      if (error) {
        setError(error.message || "Invalid or expired link.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 800);
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Invalid Link</CardTitle>
          <CardDescription>
            This link is incomplete. Please request a new magic link.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Confirm Sign In</CardTitle>
        <CardDescription>
          Click the button below to complete your sign in.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "idle" && (
          <Button onClick={handleConfirm} className="w-full">
            Confirm & Sign In
          </Button>
        )}

        {status === "loading" && (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </Button>
        )}

        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            Signed in! Redirecting...
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-destructive">
              <XCircle className="h-4 w-4" />
              {error}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/auth/sign-in")}
            >
              Request a new link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
