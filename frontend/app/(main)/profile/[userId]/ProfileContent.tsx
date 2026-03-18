"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Grid3X3,
  Bookmark,

  Share,
  Check,
  Copy,
} from "lucide-react";
import { UserProfileData, ProfileChallenge } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col sm:flex-row  items-center gap-1 ">
      <span className="font-semibold text-foreground">
        {value.toLocaleString()}
      </span>
      <span className="text-sm text-muted-foreground ml-2">{label}</span>
    </div>
  );
}

function ChallengeGridItem({ challenge }: { challenge: ProfileChallenge }) {
  return (
    <Link
      href={`/arena/${challenge.id}`}
      className="group relative aspect-square overflow-hidden bg-muted"
    >
      <Image
        src={challenge.items[0]?.item.imageUrl || "/placeholder.png"}
        alt={challenge.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-bold">
        <div>
          <h1 className="text-2xl">{challenge.title}</h1>
        </div>
        <div className="flex items-center gap-1  text-muted dark:text-gray-300">
          <span className="text-sm">{challenge.stats.totalVotes}</span>
          <span className="text-xs uppercase tracking-tighter">Votes</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProfileContent({
  profile,
  isOwn,
}: {
  profile: UserProfileData;
  isOwn: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleShareProfile = () => {
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/profile/${profile.user.id}`;

    navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    toast.success("Profile link copied!");

    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className=" mx-auto px-4 py-6 sm:py-10">
      <header className="flex  md:flex-row items-center md:items-start gap-10 md:gap-20 mb-12">
        <div className="flex-shrink-0">
          <Avatar className="h-[150px] w-[150px] md:h-40 md:w-40 border-border">
            <AvatarImage
              src={profile.user.image || ""}
              alt={profile.user.name || "User"}
              className="aspect-square object-cover h-full w-full"
            />
            <AvatarFallback className="text-3xl font-light">
              {profile.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-6 flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-xl font-bold lowercase tracking-tight">
              {profile.user.name?.replace(/\s+/g, "_") || "anonymous"}
            </h1>
            <div className="flex gap-2">
              {isOwn ? (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 font-semibold px-4"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : null}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="secondary"
                    size="sm"
                    className="h-8 px-2"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md z-100">
                  <DialogHeader>
                    <DialogTitle>Share Profile</DialogTitle>

                    <DialogDescription>
                      Share your profile link with others.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex items-center space-x-2 pt-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="profile-link" className="sr-only">
                        Profile Link
                      </Label>

                      <Input
                        id="profile-link"
                        className="h-9 bg-muted/50 font-mono text-xs"
                        value={`${typeof window !== "undefined" ? window.location.origin : ""}/profile/${profile.user.id}`}
                        readOnly
                      />
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      className="px-3"
                      onClick={handleShareProfile}
                    >
                      {copied ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className=" flex items-center gap-10">
            <Stat label="challenges" value={profile.stats.challengesCount} />
            <Stat label="likes" value={profile.stats.likesCount} />
            <Stat label="votes" value={profile.stats.votesCount} />
          </div>

          {/* Bio/Name */}
          <div className="text-sm">
            <p className="font-semibold block">{profile.user.name}</p>
            <p className="text-muted-foreground whitespace-pre-wrap">
              Member since {new Date(profile.user.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </header>

      {/* --- MOBILE STATS --- */}
      <div className="hidden">
        <div className="flex gap-4  border-t py-3 justify-around border-border ">
          <Stat label="challenges" value={profile.stats.challengesCount} />
          <Stat label="likes" value={profile.stats.likesCount} />
          <Stat label="votes" value={profile.stats.votesCount} />
        </div>
      </div>

      {/* --- TABS SECTION --- */}
      <Tabs defaultValue="created" className="w-full border-t border-border">
        <TabsList className="h-auto w-full justify-center bg-transparent gap-12 rounded-none p-0">
          <TabsTrigger
            value="created"
            className="cursor-pointer data-[state=active]:border-t-2 data-[state=active]:border-foreground rounded-none px-0 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-foreground bg-transparent"
          >
            <Grid3X3 className="w-3 h-3" />
            Challenges
          </TabsTrigger>
          <TabsTrigger
            value="voted"
            className="cursor-pointer data-[state=active]:border-t-2 data-[state=active]:border-foreground rounded-none px-0 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground data-[state=active]:text-foreground bg-transparent"
          >
            <Bookmark className="w-3 h-3" />
            Voted
          </TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="mt-1">
          <div className="grid grid-cols-3 gap-1 md:gap-7">
            {profile.createdChallenges.map((challenge) => (
              <ChallengeGridItem key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voted" className="mt-1">
          <div className="grid grid-cols-3 gap-1 md:gap-7">
            {profile.votedChallenges.map((challenge) => (
              <ChallengeGridItem key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
