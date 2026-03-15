//local vars imports
import { challenges } from "@/utils/ArenaVars";
//shadcn imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

const ArenaChallengeCard = () => {
  return (
    <div>
      {" "}
      <div>
        <ul className="w-full flex flex-col gap-8">
          {challenges.map((c) => (
            <li key={c.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1>{c.title}</h1>
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

              <div className="relative py-2 grid grid-cols-2 gap-1 w-full ">
                <Card
                  key={c.items[0].itemId}
                  className="relative z-5  w-full pt-0"
                >
                  <div className="absolute inset-0 z-30 aspect-video dark:bg-black/10" />
                  <Image
                    src={c.items[0].item.imageUrl}
                    alt="Event cover"
                    width={100}
                    height={100}
                    sizes="100px"
                    className="relative z-20 aspect-video w-full object-cover brightness-100  dark:brightness-80"
                  />
                  <div className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]">
                    <p>50%</p>
                  </div>
                  <CardHeader>
                    <CardTitle>{c.items[0].item.name}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      Created on : {c.createdAt}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <div
                  className="absolute w-full h-full z-20  flex items-center justify-center  
              "
                >
                  <Image
                    src="/images/vs_image.png"
                    alt="vs image"
                    width={50}
                    height={50}
                    sizes="100px"
                    className="grayscale drop-shadow-2xl drop-shadow-black/30"
                  />
                </div>
                <Card
                  key={c.items[1].itemId}
                  className="relative ml-auto z-5 w-full pt-0"
                >
                  <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                  <Image
                    src={c.items[1].item.imageUrl}
                    alt="Event cover"
                    width={100}
                    height={100}
                    sizes="100px"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                  />
                  <div className="absolute z-100 w-full h-[80%] flex items-center justify-center italic font-black text-primary text-[8rem]">
                    <p>30%</p>
                  </div>
                  <CardHeader className="">
                    <CardTitle>{c.items[1].item.name}</CardTitle>
                    <CardDescription className="text-xs font-medium">
                      Created on : {c.createdAt}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="stroke-2 cursor-pointer" />
                    <Share className="stroke-2 cursor-pointer" />
                  </div>
                  <Bookmark className="stroke-2 cursor-pointer" />
                </div>
                <div className="pt-1 flex items-center text-muted-foreground font-medium text-xs">
                  20 likes
                </div>
                <div className="flex items-center gap-2 ">
                  <p className="text-foreground font-bold text-sm">User Name</p>
                  <p className="text-foreground/80 font-medium text-sm">
                    {c.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArenaChallengeCard;
