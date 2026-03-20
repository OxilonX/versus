"use client";
import { BookmarkSimpleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { toast } from "sonner";
import { SavedChallengeProps } from "./TrackedChallengesList";
import Link from "next/link";
export default function TrackedChallengeGridItem({
  savedChallenge,
  setSavedChallenge,
}: {
  savedChallenge: SavedChallengeProps;
  setSavedChallenge: React.Dispatch<
    React.SetStateAction<SavedChallengeProps[]>
  >;
}) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const unsaveChallengePromise = async () => {
      const response = await fetch(
        `/api/challenges/${savedChallenge.id}/save`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error("Failed to unsave Challenge");
      }
      const data = await response.json();
      return data;
    };
    toast.promise(unsaveChallengePromise(), {
      closeButton: false,
      loading: "unsaving Challenge...",
      success: () => {
        setSavedChallenge((prev) =>
          prev.filter((c) => c.id !== savedChallenge.id),
        );
        return ` Challenge is unsaved successfuly!`;
      },

      error: (err) => err.message,
    });
  };
  return (
    <li className="list-none">
      <Link
        href={`/arena/${savedChallenge.id}`}
        className="group relative block aspect-square w-full overflow-hidden bg-muted rounded-sm shadow-sm border border-border"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={savedChallenge.items[0]?.item.imageUrl || "/placeholder.png"}
            alt={savedChallenge.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(e);
          }}
          className=" flex absolute top-2 right-2 z-30 transition-all active:scale-90"
        >
          <BookmarkSimpleIcon
            size={28}
            weight="fill"
            className="text-primary fill-primary drop-shadow-md"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-10 p-4 text-center">
          <h3 className="text-xl font-bold line-clamp-2 leading-tight">
            {savedChallenge.title}
          </h3>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span>{savedChallenge.stats.totalVotes}</span>
            <span className="opacity-80">Votes</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
