"use client";
import { useEffect, useState } from "react";
import TrackedChallengeGridItem from "./TrackedChallengesCard";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { SectionHeaders } from "@/motions/GlobalMotion";
interface SavedChallengeItem {
  itemId: string;
  item: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
  _count: {
    votes: number;
  };
}
interface SavedChallengeStats {
  item1Percent: number;
  item2Percent: number;
  totalVotes: number;
}
export interface SavedChallengeProps {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  items: SavedChallengeItem[];
  votes: { itemId: string }[];
  userVotedItemId: string | null;
  stats: SavedChallengeStats;
}
const TrackedChallengesList = () => {
  const [savedChallenges, setSavedChallenges] = useState<SavedChallengeProps[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const fetchPromise = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:4000"}/api/challenges/saved`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Failed to fetch Tracked Challenges",
          );
        }

        const data = await response.json();
        setSavedChallenges(data);
        setSavedChallenges(Array.isArray(data) ? data : [data]);
        return data;
      };

      toast.promise(fetchPromise(), {
        loading: "Loading your tracked challenges...",
        success: (data) => {
          setIsLoading(false);

          return "Tracked Challenges loaded";
        },
        error: (err) => {
          setIsLoading(false);
          return err.message;
        },
      });
    };

    loadData();
  }, []);
  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  ) : (
    <section className="py-10">
      <div className="pb-4">
        <SectionHeaders>explore your choices</SectionHeaders>
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {savedChallenges.map((challenge) => (
          <TrackedChallengeGridItem
            key={challenge?.id}
            savedChallenge={challenge}
            setSavedChallenge={setSavedChallenges}
          />
        ))}
      </ul>
    </section>
  );
};

export default TrackedChallengesList;
