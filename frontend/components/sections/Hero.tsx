//utils imports
import { characs, heroInfo, avatars } from "@/utils/uiVars";
//next imports
import Image from "next/image";
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
const Hero = () => {
  const { header, paragraph, url } = heroInfo;
  return (
    <section id="hero-section">
      <div className="container mx-auto px-8 py-6 grid grid-cols-3 items-center">
        <div className="flex flex-col gap-15">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl leading-18 font-extrabold text-foreground">
              {header}
            </h1>
            <p className="leading-6 text-sm max-w-80 text-muted-foreground">
              {paragraph}
            </p>
            <Button variant="default" className="w-fit mt-1">
              Explore Now
            </Button>
          </div>
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
              <Star size={20} color="transparent" className="fill-yellow-400" />
              <p className="text-base font-bold">
                4.5
                <span className="text-sm text-muted-foreground font-normal">
                  (review rating)
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={url}
            alt="hero image"
            width={200}
            height={200}
            priority
            className="w-[600px] h-auto self-start"
          />
        </div>
        <div>
          {characs.map((el) => (
            <div key={el.id}>
              <h2>{el.title}</h2>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
