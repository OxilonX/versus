"use client";
import { signatureInfo } from "@/utils/SignatureVars";
import Image from "next/image";
import { useState } from "react";
import { motion, Variants } from "motion/react";

// 1. Move Variants and Sub-components OUTSIDE the main component
const titleVariants: Variants = {
  hidden: { y: 20, filter: "blur(8px)", color: "var(--muted-foreground)" },
  visible: {
    y: 0,
    filter: "blur(0px)",
    color: "var(--foreground)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.015,
      delayChildren: 0,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" } },
};

const SignatureTitle = ({ onComplete }: { onComplete: () => void }) => (
  <motion.h1
    variants={titleVariants}
    initial="hidden"
    whileInView="visible"
    onAnimationComplete={onComplete}
    viewport={{ once: true, amount: 0.3 }}
    className="text-6xl leading-[1.1] font-black w-[80%] tracking-tight"
  >
    {signatureInfo.title.split(" ").map((word, i) => (
      <span key={i} className="inline-block whitespace-nowrap">
        {word.split("").map((char, j) => (
          <motion.span key={j} variants={wordVariants} className="inline-block">
            {char}
          </motion.span>
        ))}
        <span className="inline-block">&nbsp;</span>
      </span>
    ))}
  </motion.h1>
);

// Sub-component for Paragraph
const SignatureParagraph = ({ isVisible }: { isVisible: boolean }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.004, delayChildren: 0.1 },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="text-xl leading-relaxed font-medium w-[65%] text-muted-foreground mt-6"
    >
      {signatureInfo.description.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const Signature = () => {
  const [titleDone, setTitleDone] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
        viewport={{ once: true }}
        className="flex items-center"
      >
        <span className="h-0.5 bg-muted w-full rounded-full"></span>
        <Image
          src="/images/badge.png"
          alt="badge"
          width={100}
          height={100}
          className="mx-4"
        />
        <span className="h-0.5 bg-muted w-full rounded-full"></span>
      </motion.div>

      <div className="flex flex-col gap-8 items-center text-center">
        <SignatureTitle onComplete={() => setTitleDone(true)} />
        <SignatureParagraph isVisible={titleDone} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-2"
      >
        <Image
          src="/icons/signature.png"
          alt="signature"
          width={400}
          height={400}
          className="dark:invert"
        />
        <p className="text-[10px] text-center text-foreground font-bold -mt-10 uppercase tracking-widest">
          <span className="text-primary">founder </span> B. Abderrahmane
        </p>
      </motion.div>
    </div>
  );
};

export default Signature;
