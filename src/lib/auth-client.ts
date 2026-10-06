import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
  magicLinkClient,
  multiSessionClient,
  organizationClient,
} from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";
import { apiKeyClient } from "@better-auth/api-key/client";
import { toast } from "sonner";

const ERROR_MAP: Record<string, string> = {
  INVALID_USERNAME:
    "Username is invalid. Use only letters, numbers, _ and . — no @ symbol.",
  USER_ALREADY_EXISTS:
    "This email is already registered. Try signing in instead.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
  INVALID_PASSWORD: "Incorrect password. Please try again.",
  INVALID_TOKEN: "This link is invalid or expired.",
  EMAIL_NOT_VERIFIED: "Please verify your email first. Check your inbox.",
  TOO_MANY_REQUESTS: "Too many attempts. Please wait a minute and try again.",
  INVALID_ORIGIN: "Security check failed. Please refresh and try again.",
};

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    magicLinkClient(),
    passkeyClient(),
    apiKeyClient(),
    multiSessionClient(),
    organizationClient(),
  ],
  fetchOptions: {
    onError: (ctx) => {
      const error = ctx.error;
      const friendlyMessage =
        ERROR_MAP[error.code as string] ||
        error.message ||
        "Something went wrong.";
      toast.error(friendlyMessage, { id: "auth-error" });
    },
  },
});
