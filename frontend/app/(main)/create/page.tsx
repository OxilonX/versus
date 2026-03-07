'use client';

import CreateChallengeForm from "@/components/CreateChallengeForm";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function CreatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) {
    if (typeof window !== 'undefined') {
      router.push("/login");
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Redirecting...</div>
      </div>
    );
  }

  return <CreateChallengeForm />;
}
}
