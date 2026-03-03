//shadcn imports
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
//UI vars imports
import { featuresRight, featuresLeft, featuresMid } from "@/utils/FeaturesVars";
//next imports
import Image from "next/image";

const Features = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="hd-font text-3xl font-black uppercase ">
        System capabilities
      </h1>
      <div className="grid grid-cols-3 gap-6 h-screen">
        <div className="flex flex-col gap-6">
          {featuresLeft.map((f) => (
            <Card
              key={f.id}
              className="relative flex-1 overflow-hidden bg-transparent border-white/10 shadow-xl"
            >
              <Image
                src={f.url}
                alt={f.alt}
                fill
                className="object-cover z-0 drop-shadow-xl"
              />
              <div
                className={`absolute inset-0 z-10 brightness-20`}
                style={{ backgroundColor: f.overlayColor }}
              />

              <div className="relative flex flex-col gap-2 my-auto z-20 p-6">
                <CardTitle className="text-white text-2xl text-center">
                  {f.feature}
                </CardTitle>
                <CardDescription className="text-muted dark:text-white/80 text-center font-medium">
                  {f.description}
                </CardDescription>
              </div>
            </Card>
          ))}
        </div>

        <Card className="relative overflow-hidden flex flex-col py-0 shadow-xl">
          <div className="relative w-full h-1/2">
            <Image
              src={featuresMid.url}
              alt={featuresMid.alt}
              fill
              className="object-cover drop-shadow-xl"
            />
          </div>
          <div className="p-6 flex flex-col justify-end flex-1 bg-card">
            <CardTitle className="text-2xl text-center text-foreground">
              {featuresMid.feature}
            </CardTitle>
            <CardDescription className="text-foreground/50 font-medium text-center">
              {featuresMid.description}
            </CardDescription>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          {featuresRight.map((f) => (
            <Card
              key={f.id}
              className="relative flex-1 overflow-hidden bg-transparent shadow-xl "
            >
              <Image
                src={f.url}
                alt={f.alt}
                fill
                className="object-cover z-0 drop-shadow-xl"
              />
              <div
                className={`absolute inset-0 z-10 brightness-20`}
                style={{ backgroundColor: f.overlayColor }}
              />

              <div className="relative z-20 flex flex-col gap-2 my-auto  p-6">
                <CardTitle className="text-white text-2xl text-center ">
                  {f.feature}
                </CardTitle>
                <CardDescription className="text-muted dark:text-white/80 text-center font-medium">
                  {f.description}
                </CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
