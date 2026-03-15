"use client";

import CreateChallengeForm from "@/components/CreateChallengeForm";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function CreatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push("/login");
    }
  }, [mounted, isPending, session, router]);

  if (!mounted || isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex items-center gap-4">
          <Spinner className="size-8" />{" "}
          <span className="text-lg font-medium">Loading ...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex items-center gap-4">
          <Spinner className="size-8" />
          <span className="text-lg font-medium">Redirecting ...</span>
        </div>
      </div>
    );
  }

  return <CreateChallengeForm />;
}
