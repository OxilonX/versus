"use client";
import { signatureInfo } from "@/utils/SignatureVars";
import Image from "next/image";
import { motion, Variants } from "motion/react";
const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
    color: "var(--muted-foreground)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    color: "var(--foreground)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.03, // Slightly slower for better readability
      delayChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const SignatureTitle = () => {
  return (
    <motion.h1
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-6xl leading-[1.1] font-black w-[80%] tracking-tight"
    >
      {signatureInfo.title.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={wordVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.h1>
  );
};

export const SignatureParagraph = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.008,
        delayChildren: 1,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-xl leading-relaxed font-medium w-[65%] text-muted-foreground mt-6"
    >
      {signatureInfo.description.split("").map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};
const Signature = () => {
  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: false }}
        className="flex items-center"
      >
        <span className="h-0.5 bg-muted w-full rounded-full"></span>{" "}
        <Image
          src="/images/badge.png"
          alt="badge image"
          width={100}
          height={100}
          className=""
        />
        <span className="h-0.5 bg-muted w-full rounded-full"></span>
      </motion.div>
      <div className="flex flex-col gap-8 items-center text-center ">
        <SignatureTitle />
        <SignatureParagraph />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: false }}
        className="flex flex-col items-center gap-2"
      >
        <Image
          src="/icons/signature.png"
          alt="signature image"
          width={400}
          height={400}
          className="dark:invert-100 "
        />
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
          viewport={{ once: false }}
          className="text-[8px] text-center text-foreground font-bold -mt-7"
        >
          <span className="text-primary ">{"founder "}</span>B. Abderrahmane
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signature;
