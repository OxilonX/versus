'use client';

import CreateChallengeForm from "@/components/CreateChallengeForm";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return null;
  }

  if (!session) {
    return null;
  }

  return <CreateChallengeForm />;
}
