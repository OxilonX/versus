"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion, Variants } from "motion/react";
interface battlesType {
  id: number;
  who: string;
  description: string;
  tags: string[];
  url: string;
}
interface battlesProps {
  battles: battlesType[];
}
export const BattlesListMotion = ({ battles }: battlesProps) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="relative flex flex-col rounded-xl shadow-lg dark:shadow-background overflow-visible"
    >
      {Array.isArray(battles) &&
        battles.map((b, index) => {
          const isFirst = index === 0;

          return (
            <motion.li
              key={b.id}
              variants={child}
              className="px-10 py-6 bg-card dark:bg-accent flex justify-between items-center 
              transition-all duration-300 cursor-pointer group relative
              hover:z-[100] first:rounded-t-xl last:rounded-b-xl
              hover:bg-background dark:hover:bg-card hover:pl-14 border-l-0 
              hover:border-l-8 hover:border-l-primary dark:hover:border-l-primary 
              border-b-2 border-card-foreground dark:border-card last:border-b-0"
            >
              <p className="text-lg font-bold text-foreground dark:text-foreground">
                {b.who}
              </p>

              <div className="flex items-center gap-2">
                {b.tags.map((t, i) => (
                  <Badge key={i} className="px-4 py-1">
                    {t}
                  </Badge>
                ))}
              </div>

              <div
                className={`
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                  pointer-events-none absolute w-80 h-48 shadow-2xl z-100 
                  transition-all duration-300 ease-out right-2
                  ${isFirst ? "top-2" : "bottom-2"}
                `}
              >
                <Image
                  src={b.url}
                  alt={b.description}
                  fill
                  className="object-cover rounded-xl brightness-80"
                />
              </div>
            </motion.li>
          );
        })}
    </motion.ul>
  );
};
