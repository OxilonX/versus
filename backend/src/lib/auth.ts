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
    cookiePrefix: "versus",
    crossSiteCookies: {
      enabled: true,
    },
    onRequest: (request: { method: string; url: string; headers: Headers }) => {
      const forwardedProto = request.headers.get("x-forwarded-proto");
      const forwardedHost = request.headers.get("x-forwarded-host");
      console.log(`[AUTH_REQUEST] ${request.method} ${request.url}`);
      console.log(`[AUTH_REQUEST] x-forwarded-proto: ${forwardedProto}`);
      console.log(`[AUTH_REQUEST] x-forwarded-host: ${forwardedHost}`);
      console.log(`[AUTH_REQUEST] Headers:`, JSON.stringify(Object.fromEntries(request.headers)));
    },
    onAPIError: {
      throw: true,
      errorURL: "https://versus-blond.vercel.app/login?error=auth_failed",
      onError: ({ url, error }: { url: string; error: Error }) => {
        console.error(`[AUTH_ERROR] Path: ${url} | Error:`, error);
      },
    },
  },
});

export type Auth = typeof auth;
