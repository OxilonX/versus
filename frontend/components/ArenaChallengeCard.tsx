"use client";
//shadcn imports
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//next imports
import Image from "next/image";
//lucide icons imports
import { ShareFatIcon, BookmarkSimpleIcon } from "@phosphor-icons/react";
import ReportDialog from "@/components/ArenaReportDialog";
import { Ellipsis, Heart, Copy, Check } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//motions
import { AnimatePresence, motion, Variants } from "motion/react";
import { API } from "@/lib/api";
//types
interface Challenge {
  id: string;
  title: string;
  userId: string;
  likesCount: number;
  isLiked: boolean;
  isSaved?: boolean;
  userVotedItemId: string | null;
  createdAt: string;
  user: {
    image: string | null;
    name: string;
  };
  items: {
    itemId: string;
    _count: { votes: number };
    item: {
      id: string;
      name: string;
      imageUrl: string;
    };
  }[];
  stats: {
    item1Percent: number;
    item2Percent: number;
    totalVotes: number;
  };
}
interface ArenaChallengeCardProps {
  sort: string;
  search: string;
}

const sanitizeInput = (input: string): string => {
  return input.replace(/[<>'";&]/g, "").slice(0, 100);
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 25 },
  },
};

const fetchChallenges = async (
  sort?: string,
  search?: string,
  signal?: AbortSignal,
) => {
  try {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sanitizeInput(sort));
    if (search) params.set("search", sanitizeInput(search));
    const queryString = params.toString();
    const url = queryString
      ? `${API.challenges.list}?${queryString}`
      : API.challenges.list;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data)
      toast.error("Failed to fetch challenges, refresh and try again.", {
        position: "bottom-right",
      });
    return data;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return null;
    }
    console.error(err);
    toast.error("Network error. Please check your connection.", {
      position: "bottom-right",
    });
    return null;
  }
};
const likeChallenge = async (challengeId: string, signal?: AbortSignal) => {
  try {
    const response = await fetch(API.challenges.like(challengeId), {
      method: "POST",
      credentials: "include",
      signal,
    });

    // 1. CAPTURE THE 401 STATUS
    if (response.status === 401) {
      return { error: "Unauthorized" };
    }

    if (!response.ok) throw new Error("Failed");

    return await response.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return null;
    return { error: (err as Error).message };
  }
};
const voteChallenge = async (
  challengeId: string,
  itemId: string,
  signal?: AbortSignal,
) => {
  try {
    const response = await fetch(API.items.vote(challengeId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      signal,
      body: JSON.stringify({ itemId: encodeURIComponent(itemId) }),
    });

    // 1. Handle 401 explicitly before the .ok check
    if (response.status === 401) {
      return { error: "Unauthorized" };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return null;

    return { error: err instanceof Error ? err.message : "Network error" };
  }
};
const saveChallenge = async (challengeId: string) => {
  try {
    const response = await fetch(API.challenges.save(challengeId), {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 401) return { error: "Unauthorized" };
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || "Failed" };
    }

    return await response.json();
  } catch (err) {
    return { error: "Network error" };
  }
};
const ArenaChallengeCard = ({ sort, search }: ArenaChallengeCardProps) => {
  const [isFetchingChallenges, setIsFetchingChallenges] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [votingChallengeId, setVotingChallengeId] = useState<string | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const windowOriginRef = useRef<string>("");
  const [reportOpen, setReportOpen] = useState(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const loadChallenges = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsFetchingChallenges(true);
      const data = await fetchChallenges(
        sort,
        search,
        abortControllerRef.current.signal,
      );
      if (isMountedRef.current && data) {
        setChallenges(data);
        setIsFetchingChallenges(false);
      }
    };
    loadChallenges();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [sort, search]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      windowOriginRef.current = window.location.origin;
    }
  }, []);

  const router = useRouter();

  const handleCopy = useCallback((challengeId: string) => {
    if (!windowOriginRef.current) return;
    const shareUrl = `${windowOriginRef.current}/arena/${encodeURIComponent(challengeId)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleLike = useCallback(
    async (challengeId: string) => {
      const previousChallenges = [...challenges];

      setChallenges((prev) =>
        prev.map((c) =>
          c.id === challengeId
            ? {
                ...c,
                isLiked: !c.isLiked,
                likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
              }
            : c,
        ),
      );
      const result = await likeChallenge(challengeId);

      if (result?.error) {
        setChallenges(previousChallenges);

        if (
          result.error.includes("401") ||
          result.error.includes("Unauthorized")
        ) {
          toast.error("You need to be signed in to like!");
          router.push("/login");
          return;
        }

        toast.error("Action failed. Please try again.");
      }
    },
    [challenges, router],
  );
  const handleVote = useCallback(
    async (challengeId: string, itemId: string) => {
      if (votingChallengeId) return;

      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge) return;

      const validItemIds = challenge.items.map((item) => item.itemId);
      if (!validItemIds.includes(itemId)) {
        toast.error("Invalid item selection.");
        return;
      }

      setVotingChallengeId(challengeId);
      const result = await voteChallenge(challengeId, itemId);
      setVotingChallengeId(null);
      if (
        result?.error === "Unauthorized" ||
        result?.error?.includes("Unauthorized")
      ) {
        toast.error("Please login to vote");
        router.push("/login");
        return;
      }
      if (!result || result.error) {
        toast.error("Sync failed. Check your connection.");
        return;
      }

      setChallenges((prev) =>
        prev.map((c) => {
          if (c.id !== challengeId) return c;

          const previousVotedItemId = c.userVotedItemId;
          const isRemovingVote = result.status === "neutral";
          const isNewVote = result.status === "voted" && !previousVotedItemId;
          const isSwitchingVote =
            result.status === "voted" &&
            previousVotedItemId &&
            previousVotedItemId !== itemId;

          const updatedItems = c.items.map((item) => {
            let newVotes = item._count.votes;
            if (isRemovingVote) {
              if (item.itemId === previousVotedItemId) {
                newVotes = Math.max(0, newVotes - 1);
              }
            } else if (isNewVote) {
              if (item.itemId === itemId) {
                newVotes = newVotes + 1;
              }
            } else if (isSwitchingVote) {
              if (item.itemId === itemId) {
                newVotes = newVotes + 1;
              } else if (item.itemId === previousVotedItemId) {
                newVotes = Math.max(0, newVotes - 1);
              }
            }
            return { ...item, _count: { votes: newVotes } };
          });

          const item1Votes = updatedItems[0]._count.votes;
          const item2Votes = updatedItems[1]._count.votes;
          const totalVotes = item1Votes + item2Votes;

          return {
            ...c,
            items: updatedItems,
            userVotedItemId: isRemovingVote ? null : itemId,
            stats: {
              item1Percent:
                totalVotes > 0
                  ? Math.round((item1Votes / totalVotes) * 100)
                  : 0,
              item2Percent:
                totalVotes > 0
                  ? Math.round((item2Votes / totalVotes) * 100)
                  : 0,
              totalVotes,
            },
          };
        }),
      );
    },
    [votingChallengeId, challenges],
  );
  const handleSave = useCallback(
    async (challengeId: string) => {
      const savePromise = async () => {
        const result = await saveChallenge(challengeId);

        if (result?.error) {
          if (result.error === "Unauthorized") {
            router.push("/login");
            throw new Error("Please login to save challenges");
          }
          throw new Error(result.error);
        }
        return result;
      };

      toast.promise(savePromise(), {
        loading: "Saving...",
        success: (result: { isSaved: boolean }) => {
          setChallenges((prev) =>
            prev.map((c) =>
              c.id === challengeId ? { ...c, isSaved: result.isSaved } : c,
            ),
          );
          return result.isSaved
            ? "Added to your saves."
            : "Removed from saves.";
        },
        error: (err) => err.message,
      });
    },
    [router],
  );
  return (
    <div>
      <div>
        <motion.ul
          key={challenges?.length}
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-16"
        >
          {isFetchingChallenges ? (
            <div className="bg-background flex items-center justify-center min-h-[300px]">
              <Spinner className="size-8" />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {Array.isArray(challenges) &&
                challenges.map((c) => (
                  <motion.li variants={child} key={c.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="cursor-pointer group"
                          onClick={() => {
                            router.push(`/profile/${c.userId}`);
                          }}
                        >
                          <AvatarImage
                            className="group-hover:scale-110 transition-scale duration-300"
                            src={
                              c?.user?.image || "https://github.com/shadcn.png"
                            }
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1
                          onClick={() => {
                            router.push(`/profile/${c.userId}`);
                          }}
                          className="relative w-fit text-base font-medium cursor-pointer group"
                        >
                          {c?.user?.name}
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
                        </h1>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <Ellipsis size={30} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setReportOpen(true);
                              }}
                            >
                              <ReportDialog
                                open={reportOpen}
                                setReportOpen={setReportOpen}
                                challengeId={c.id}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="relative grid-rows-[300px] py-2 grid grid-cols-2 gap-1 w-full overflow-hidden transition-opacity duration-500">
                      <Card
                        onClick={() => handleVote(c.id, c.items[0].itemId)}
                        key={c.items[0].itemId}
                        className={`relative z-5 w-full pt-0 group cursor-pointer ${votingChallengeId === c.id ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        <div className="absolute inset-0 z-30 aspect-video dark:bg-black/10" />
                        {c.items[0].item.imageUrl ? (
                          <div className="w-full h-full">
                            <Image
                              src={
                                c.items[0].item.imageUrl ||
                                "/images/default_item_v1.jpeg"
                              }
                              alt="Event cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority={c.items[0].item.imageUrl ? true : false}
                              className={`relative z-20 w-full object-cover brightness-100  
                        transition-all duration-500 group-hover:brightness-60 
                        ${c.userVotedItemId && c.stats?.item1Percent < c.stats?.item2Percent ? "birightness-40" : ""}`}
                            />
                          </div>
                        ) : null}
                        <AnimatePresence>
                          {c.userVotedItemId && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]"
                            >
                              <p>{c?.stats?.item1Percent}%</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 left-5 z-100  transition-opacity duration-500 ">
                          <h1 className="text-3xl font-bold capitalize text-white">
                            {c.items[0].item.name}
                          </h1>
                          <p className="text-sm font-medium text-muted dark:text-gray-300 ">
                            Created at :{" "}
                            {new Date(c.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>

                      <Card
                        key={c.items[1].itemId}
                        onClick={() => handleVote(c.id, c.items[1].itemId)}
                        className={`relative ml-auto z-5 w-full pt-0 group cursor-pointer ${votingChallengeId === c.id ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        {c.items[1].item.imageUrl ? (
                          <div className="w-full h-full">
                            <Image
                              src={
                                c.items[1].item.imageUrl ||
                                "/images/default_item_v1.jpeg"
                              }
                              alt="Event cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`relative z-20 w-full object-cover brightness-100  
                         transition-all duration-500 group-hover:brightness-60 
                        ${c.userVotedItemId && c.stats?.item2Percent < c.stats?.item1Percent ? "birightness-40" : ""}`}
                            />
                          </div>
                        ) : null}
                        <AnimatePresence>
                          {c.userVotedItemId && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]"
                            >
                              <p>{c?.stats?.item2Percent}%</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500  absolute bottom-5 left-5 z-100">
                          <h1 className="text-3xl font-bold capitalize text-white">
                            {c.items[1].item.name}
                          </h1>
                          <p className="text-sm font-medium text-muted dark:text-gray-300  ">
                            Created at :
                            {new Date(c.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>
                    </div>
                    <div className="">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart
                            onClick={() => handleLike(c.id)}
                            className={
                              c.isLiked
                                ? "stroke-0 fill-primary cursor-pointer"
                                : "stroke-2 cursor-pointer"
                            }
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <ShareFatIcon
                                size={26}
                                className="stroke-2 cursor-pointer"
                              />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>share challenge link</DialogTitle>
                                <DialogDescription>
                                  Anyone who has this link will be able to view
                                  this challenge and interact with it if logged
                                  in.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-center space-x-2 pt-2">
                                <div className="grid flex-1 gap-2">
                                  <Label htmlFor="link" className="sr-only">
                                    Link
                                  </Label>
                                  <Input
                                    id="link"
                                    className="h-9 bg-muted/50 font-mono text-xs"
                                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/arena/${encodeURIComponent(c.id)}`}
                                    readOnly
                                  />
                                </div>
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="px-3"
                                  onClick={() => handleCopy(c.id)}
                                >
                                  <span className="sr-only">Copy</span>
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
                        <BookmarkSimpleIcon
                          size={24}
                          weight="fill"
                          onClick={() => handleSave(c?.id)}
                          className={` cursor-pointer ${c.isSaved ? "stroke-0 fill-primary " : "stroke-14 stroke-white fill-none "}`}
                        />
                      </div>
                      <div className="pt-1 flex items-center text-muted-foreground font-medium text-xs">
                        {c.likesCount} likes
                      </div>
                      <div className="flex items-center gap-2 ">
                        <p className="text-foreground font-bold text-sm">
                          {c.user.name || "user name"}
                        </p>
                        <p className="text-foreground/80 font-medium text-sm">
                          {c.title}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
            </AnimatePresence>
          )}
        </motion.ul>
      </div>
    </div>
  );
};

export default ArenaChallengeCard;
