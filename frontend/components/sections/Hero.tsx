//utils imports
import { techSpecs, heroInfo, avatars } from "@/utils/HeroVars";
//next imports
import Image from "next/image";
import Link from "next/link";
//shadcn imports
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
//lucid icons
import { Star } from "lucide-react";
//Theme provider imports
const Hero = () => {
  const { header, paragraph, url } = heroInfo;
  return (
    <section id="hero-section" className="container mx-auto max-w-275 px-4">
      <div className=" pt-8  flex justify-between  items-center">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-7xl leading-20 font-extrabold text-foreground">
              {header}
            </h1>
            <p className="leading-6 text-sm max-w-[80%] text-muted-foreground">
              {paragraph}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/arena">
                <Button variant="default" className="px-8 py-6 w-fit mt-1">
                  Explore Versus for free
                </Button>
              </Link>
              <Button variant={"outline"} className="px-8 py-6 w-fit mt-1">
                How it works
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-3">
              <AvatarGroup className="">
                {avatars.map(({ id, url, fallback, alt }) => (
                  <Avatar key={id}>
                    <AvatarImage src={url} alt={alt} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                ))}

                <AvatarGroupCount>+{avatars.length}</AvatarGroupCount>
              </AvatarGroup>
              <div className="flex items-center gap-2">
                <Star
                  size={20}
                  color="transparent"
                  className="fill-yellow-400"
                />
                <p className="text-base font-bold">
                  4.5
                  <span className="text-sm text-muted-foreground font-normal">
                    (review rating)
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                {techSpecs.map((spec, index) => (
                  <div
                    key={spec.id}
                    className={`
        flex flex-col px-1 items-center
        ${index !== 0 ? "border-l border-muted-foreground/30 " : "pl-0"}
      `}
                  >
                    <span className="text-lg text-center font-black tracking-tighter text-foreground leading-none">
                      {spec.value}
                    </span>
                    <span className="text-[8px] w-[50%] text-center font-bold uppercase tracking-[0.15em] text-muted-foreground mt-1">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            src={url}
            alt="hero image"
            width={1100}
            height={1100}
            priority
            className="justify-self-end self-start dark:brightness-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
