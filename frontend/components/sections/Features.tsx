"use client";
import { motion, Variants } from "motion/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { featuresRight, featuresLeft, featuresMid } from "@/utils/FeaturesVars";
import Image from "next/image";
import { SectionHeaders } from "@/motions/GlobalMotion";
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Features = () => {
  return (
    <div className="flex flex-col gap-10 py-20">
      <SectionHeaders>System capabilities</SectionHeaders>

      <div className="grid grid-cols-3 gap-6 min-h-screen">
        <div className="flex flex-col gap-6">
          {featuresLeft.map((f, i) => (
            <motion.div
              key={f.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-50px" }}
              variants={cardVariants}
              className="flex-1"
            >
              <Card className="relative h-full overflow-hidden bg-transparent border-white/10 shadow-xl">
                <Image
                  src={f.url}
                  alt={f.alt}
                  fill
                  className="object-cover z-0"
                />
                <div
                  className="absolute inset-0 z-10 brightness-20"
                  style={{ backgroundColor: f.overlayColor }}
                />
                <div className="relative z-20 p-6 my-auto">
                  <CardTitle className="text-white text-2xl text-center">
                    {f.feature}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-center">
                    {f.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* MIDDLE COLUMN */}
        <motion.div
          custom={featuresLeft.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-50px" }}
          variants={cardVariants}
        >
          <Card className="relative overflow-hidden flex flex-col h-full shadow-xl">
            <div className="relative w-full h-1/2">
              <Image
                src={featuresMid.url}
                alt={featuresMid.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center flex-1 bg-card">
              <CardTitle className="text-2xl text-center">
                {featuresMid.feature}
              </CardTitle>
              <CardDescription className="text-center">
                {featuresMid.description}
              </CardDescription>
            </div>
          </Card>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {featuresRight.map((f, i) => (
            <motion.div
              key={f.id}
              custom={featuresLeft.length + 1 + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-50px" }}
              variants={cardVariants}
              className="flex-1"
            >
              <Card className="relative h-full overflow-hidden bg-transparent border-white/10 shadow-xl">
                <Image
                  src={f.url}
                  alt={f.alt}
                  fill
                  className="object-cover z-0"
                />
                <div
                  className="absolute inset-0 z-10 brightness-20"
                  style={{ backgroundColor: f.overlayColor }}
                />
                <div className="relative z-20 p-6 my-auto">
                  <CardTitle className="text-white text-2xl text-center">
                    {f.feature}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-center">
                    {f.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
