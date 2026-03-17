"use client";
import { motion } from "motion/react";
interface SectionHeadersProps {
  children: React.ReactNode;
}
export const SectionHeaders = ({ children }: SectionHeadersProps) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px" }}
      className="hd-font text-3xl font-black uppercase"
    >
      {children}
    </motion.h1>
  );
};
