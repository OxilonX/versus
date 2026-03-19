"use client";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import Image from "next/image";
//lucid icons imports
import { Star } from "lucide-react";
//shadcn imports
import {
  AvatarGroup,
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroupCount,
} from "@/components/ui/avatar";
interface avatarsType {
  id: number;
  url: string;
  fallback: string;
  alt: string;
}
interface techSpecsType {
  id: number;
  label: string;
  value: string;
  description: string;
}
interface techSpecsProps {
  techSpecs: techSpecsType[];
}
interface AvatarGroupProps {
  avatars: avatarsType[];
}
export const ImageMotion = ({ url, alt }: { url: string; alt: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      drag
      dragConstraints={{ top: -50, left: -200, right: 0, bottom: 0 }}
      dragSnapToOrigin
      className="cursor-grab relative z-20"
    >
      <Image
        src={url}
        alt={alt}
        draggable={false}
        width={1100}
        height={1100}
        priority
        className="dark:brightness-90 drop-shadow-2xl"
      />
    </motion.div>
  );
};
export const TechSpecsMotion = ({ techSpecs }: techSpecsProps) => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="flex items-center"
    >
      {Array.isArray(techSpecs) &&
        techSpecs.map((spec, index) => (
          <motion.div
            variants={child}
            key={spec.id}
            className={`flex flex-col px-1 items-center ${
              index !== 0 ? "border-l border-muted-foreground/30 " : "pl-0"
            }`}
          >
            <span className="text-lg font-black text-foreground">
              {spec.value}
            </span>
            <span className="text-[8px] font-bold uppercase text-muted-foreground">
              {spec.label}
            </span>
          </motion.div>
        ))}
    </motion.div>
  );
};
export const StarMotion = () => {
  const container = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-2"
    >
      <Star size={20} color="transparent" className="fill-yellow-400" />
      <p className="text-base font-bold">
        4.5
        <span className="text-sm text-muted-foreground font-normal">
          {" (review rating)"}
        </span>
      </p>
    </motion.div>
  );
};
export const AvatarMotion = ({ avatars }: AvatarGroupProps) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, x: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <AvatarGroup className="flex -space-x-3">
        {Array.isArray(avatars) &&
          avatars.map(({ id, url, fallback, alt }) => (
            <motion.div key={id} variants={child}>
              <Avatar className="border-2 border-background">
                <AvatarImage src={url} alt={alt} />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
        <motion.div variants={child}>
          <AvatarGroupCount>
            +{Array.isArray(avatars) ? avatars.length : 0}
          </AvatarGroupCount>
        </motion.div>
      </AvatarGroup>
    </motion.div>
  );
};

export const MotionLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href}>{children}</Link>
    </motion.div>
  );
};
export const HeroHeadMotion = ({ header }: { header: string }) => {
  const container = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.01 },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.h1
      className="text-7xl leading-20 font-extrabold text-foreground"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      {header.split("").map((char, i) => (
        <motion.span key={i} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};
export const HeroParMotion = ({ paragraph }: { paragraph: string }) => {
  const container = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.4,
        duration: 0.25,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.p
      className="leading-6 text-sm  text-muted-foreground"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {paragraph.split("\n ").map((line, i) => (
        <motion.span key={i} variants={child}>
          {line}
        </motion.span>
      ))}
    </motion.p>
  );
};
