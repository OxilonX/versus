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
      console.log(`[DEBUG] Incoming Request: ${request.method} ${request.url} | Cookies: ${cookie}`);
      console.log(`[DEBUG] x-forwarded-proto: ${forwardedProto} | x-forwarded-host: ${forwardedHost}`);
    },
    onAPIError: {
      throw: true,
      errorURL: "https://versus-blond.vercel.app/login?error=state_mismatch",
      onError: ({ url, error }: { url: string; error: Error }) => {
        console.error(`[DEBUG] Auth Error at ${url}:`, error);
      },
    },
  },
});

export type Auth = typeof auth;
