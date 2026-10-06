// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import {
  magicLink,
  organization,
  username,
  multiSession,
} from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { apiKey } from "@better-auth/api-key";
import { Resend } from "resend";
import prisma from "./prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // ✅ true karo

    // ✅ YEH ADD KARO — Forgot password flow enable karo
    sendResetPassword: async ({ user, url, token }) => {
      void resend.emails.send({
        from: "AskMyDocs <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `
          <p>Hi ${user.name || "there"},</p>
          <p>Click <a href="${url}">here</a> to reset your password.</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      });
    },

    // Optional: Token expiry customize karo (default 1 hour)
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour in seconds
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      // Resend se verification email bhejo
      void resend.emails.send({
        from: "AskMyDocs <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
      });
    },
    sendOnSignUp: true, // ✅ Signup pe automatically email bhejo
    autoSignInAfterVerification: true, // ✅ Verify hone ke baad auto sign-in
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  user: {
    deleteUser: {
      enabled: true,
    },
  },

  plugins: [
    username(),
    magicLink({
      sendMagicLink: ({ email, token }) => {
        const confirmUrl = `${process.env.BETTER_AUTH_URL}/auth/confirm-magic-link?token=${token}`;
        void resend.emails.send({
          from: "AskMyDocs <onboarding@resend.dev>",
          to: email,
          subject: "Sign in to AskMyDocs",
          html: `<p>Click <a href="${confirmUrl}">here</a> to sign in.</p>`,
        });
      },
      expiresIn: 60 * 15,
    }),
    passkey(),
    apiKey(),
    multiSession({
      maximumSessions: 5,
    }),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5,
      membershipLimit: 100,
    }),
  ],

  rateLimit: {
    enabled: true,
    window: 60,
    max: process.env.NODE_ENV === "production" ? 10 : 100,
    storage: "database",
    modelName: "rateLimit",
  },
  trustedOrigins: ["http://localhost:3000"],
});
