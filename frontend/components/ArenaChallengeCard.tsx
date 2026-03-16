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
import { Button } from "@/components/ui/button";
//next imports
import Image from "next/image";
//lucide icons imports
import { Ellipsis, TriangleAlert, Heart, Share, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
const fetchChallenges = async () => {
  try {
    const response = await fetch("/api/challenges", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!data)
      return toast.error(
        "Failed to fetch chall`enges, refresh and try again.",
        {
          position: "bottom-right",
        },
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};
const likeChallenge = async (challengeId: string) => {
  try {
    const response = await fetch(`/api/challenges/like/${challengeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (err) {
    return toast.warning("504 Internal Server Error.", {
      position: "bottom-right",
    });
  }
};

const ArenaChallengeCard = () => {
  const [isFetchingChallenges, setIsFetchingChallenges] = useState(true);
  const [challenges, setChallenges] = useState([
    {
      id: "1",
      title: "",
      userId: "",
      likesCount: 0,
      isLiked: false,
      user: {
        image: "",
        name: "usernsme",
      },
      createdAt: "",
      items: [
        {
          itemId: "1",
          item: {
            id: "",
            name: "",
            imageUrl: "/images/default_item_v1.jpeg",
          },
        },
        {
          itemId: "2",
          item: {
            id: "2",
            name: "",
            imageUrl: "/images/default_item_v1.jpeg",
          },
        },
      ],
    },
  ]);
  const handleLike = async (challengeId: string) => {
    const previousChallenges = [...challenges];
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
          };
        }
        return c;
      }),
    );

    const result = await likeChallenge(challengeId);

    if (!result || result.error) {
      setChallenges(previousChallenges);
      toast.error("Action failed. Please try again.");
    }
  };
  useEffect(() => {
    const loadChallenges = async () => {
      const data = await fetchChallenges();
      if (data) {
        setChallenges(data);
        setIsFetchingChallenges(false);
      }
    };
    loadChallenges();
  }, []);

  return (
    <div>
      <div>
        <ul className="w-full flex flex-col gap-8">
          {isFetchingChallenges ? (
            <div className="bg-background flex items-center justify-center min-h-screen">
              <Spinner className="size-8" />
            </div>
          ) : (
            challenges.map((c) => (
              <li key={c.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={c?.user?.image || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{c.user?.name}</h1>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <Ellipsis size={30} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <TriangleAlert />
                          Report Challenge
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="relative grid-rows-[300px] py-2 grid grid-cols-2 gap-1 w-full overflow-hidden transition-opacity duration-500">
                  <Card
                    key={c.items[0].itemId}
                    className="relative z-5  w-full pt-0 group cursor-pointer "
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
                          sizes="100px"
                          className="relative z-20 w-full object-cover brightness-100  
                        dark:brightness-80 transition-all duration-500 group-hover:brightness-60 "
                        />
                      </div>
                    ) : null}
                    <div className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]">
                      <p>50%</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 left-5 z-100  transition-opacity duration-500 ">
                      <h1 className="text-3xl font-bold capitalize text-white">
                        {c.items[0].item.name}
                      </h1>
                      <p className="text-sm font-medium text-muted ">
                        Created at :{" "}
                        {new Date(c.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>

                  <Card
                    key={c.items[1].itemId}
                    className="relative ml-auto z-5 w-full pt-0 group
                   cursor-pointer"
                  >
                    <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                    {c.items[1].item.imageUrl ? (
                      <div className="w-full h-full">
                        <Image
                          src={
                            c.items[1].item.imageUrl ||
                            "/images/default_item_v1.jpeg"
                          }
                          alt="Event cover"
                          fill
                          sizes="100px"
                          className="relative z-20 w-full object-cover brightness-100  
                        dark:brightness-80 transition-all duration-500 group-hover:brightness-60 "
                        />
                      </div>
                    ) : null}
                    <div className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]">
                      <p>30%</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500  absolute bottom-5 left-5 z-100">
                      <h1 className="text-3xl font-bold capitalize text-white">
                        {c.items[1].item.name}
                      </h1>
                      <p className="text-sm font-medium text-muted ">
                        Created at :{" "}
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
                      <Share className="stroke-2 cursor-pointer" />
                    </div>
                    <Bookmark className="stroke-2 cursor-pointer" />
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
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ArenaChallengeCard;
