import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "",
  session: {
    refetchOnWindowFocus: false,
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
    callbackURL:
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000",
  });
}
