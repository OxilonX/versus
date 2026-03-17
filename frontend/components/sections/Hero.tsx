"use client";
//utils imports
import { techSpecs, heroInfo, avatars } from "@/utils/HeroVars";

//shadcn imports
import { Button } from "@/components/ui/button";

//lucid icons
//motion imports
import {
  HeroHeadMotion,
  HeroParMotion,
  MotionLink,
  AvatarMotion,
  StarMotion,
  TechSpecsMotion,
  ImageMotion,
} from "@/motions/HeroMotion";
const Hero = () => {
  const { header, paragraph, url } = heroInfo;
  return (
    <section id="hero-section" className="">
      <div className=" pt-8  flex justify-between  items-center">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-4">
              <HeroHeadMotion header={header} />
              <HeroParMotion paragraph={paragraph} />
            </div>

            <div className="flex items-center gap-6">
              <MotionLink href="/arena">
                <Button variant="default" className="px-8 py-6 w-fit mt-1">
                  Explore Versus for free
                </Button>
              </MotionLink>
              <MotionLink href="/arena">
                <Button variant={"outline"} className="px-8 py-6 w-fit mt-1">
                  How it works
                </Button>
              </MotionLink>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-3">
              <AvatarMotion avatars={avatars} />
              <StarMotion />
            </div>
            <div>
              <TechSpecsMotion techSpecs={techSpecs} />
            </div>
          </div>
        </div>
        <ImageMotion url={heroInfo.url} alt={"hero image"} />
      </div>
    </section>
  );
};

export default Hero;
