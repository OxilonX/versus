import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  appURL: process.env.BETTER_AUTH_APP_URL || "http://localhost:3000",
  basePath: "/api/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.BETTER_AUTH_URL as string}/api/auth/callback/google`,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [
    "https://versus-blond.vercel.app",
    "https://versus-tc44.onrender.com",
    "http://localhost:3000",
    "http://localhost:4000",
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "none",
    },
    onRequest: (request: { method: string; url: string; headers: Headers }) => {
      const cookie = request.headers.get("cookie");
      const forwardedProto = request.headers.get("x-forwarded-proto");
      const forwardedHost = request.headers.get("x-forwarded-host");
      console.log(
        `[DEBUG] Incoming Request: ${request.method} ${request.url} | Cookies: ${cookie}`,
      );
      console.log(
        `[DEBUG] x-forwarded-proto: ${forwardedProto} | x-forwarded-host: ${forwardedHost}`,
      );
    },
    onAPIError: {
      throw: true,
      onError: (error, ctx) => {
        // Custom error handling
        console.error("Auth error:", error);
      },
      errorURL: "https://versus-blond.vercel.app/login?error=state_mismatch",
      customizeDefaultErrorPage: {
        colors: {
          background: "#ffffff",
          foreground: "#000000",
          primary: "#0070f3",
          primaryForeground: "#ffffff",
          mutedForeground: "#666666",
          border: "#e0e0e0",
          destructive: "#ef4444",
          titleBorder: "#0070f3",
          titleColor: "#000000",
          gridColor: "#f0f0f0",
          cardBackground: "#ffffff",
          cornerBorder: "#0070f3",
        },
        size: {
          radiusSm: "0.25rem",
          radiusMd: "0.5rem",
          radiusLg: "1rem",
          textSm: "0.875rem",
          text2xl: "1.5rem",
          text4xl: "2.25rem",
          text6xl: "3.75rem",
        },
        font: {
          defaultFamily: "system-ui, sans-serif",
          monoFamily: "monospace",
        },
        disableTitleBorder: false,
        disableCornerDecorations: false,
        disableBackgroundGrid: false,
      },
    },
  },
});

export type Auth = typeof auth;
