import { createAuthClient } from "better-auth/react";

const isDev = process.env.NODE_ENV === "development";

export const authClient = createAuthClient({
  baseURL: isDev
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:4000",
  session: {
    refetchOnWindowFocus: false,
  },
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  useSession,
  signOut,
  signIn: socialSignIn,
  signUp: emailSignUp,
} = authClient;

export async function signIn(email: string, password: string) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
  });
  if (error) throw error;
  return data;
}

export async function GoogleSignIn() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
}
