"use client";
import { signIn, useSession } from "@/lib/auth-client";
const SignInPage = () => {
  const session = useSession();
  if (session.data) return console.log(session);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-8 bg-black rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <button
          onClick={() => signIn()}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
