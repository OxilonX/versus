"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/utils/FaqVars";
import { SectionHeaders } from "@/motions/GlobalMotion";
import { motion } from "motion/react";
const Faq = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      className="flex flex-col gap-4"
    >
      <SectionHeaders>FAQ</SectionHeaders>
      <ul>
        <li className="overflow-hidden rounded-xl">
          <Accordion
            type="single"
            collapsible
            defaultValue={faqs[0].value}
            className="border "
          >
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.value}
                value={f.value}
                className="border-b last:border-b-0  "
              >
                <AccordionTrigger className=" px-4 py-6 cursor-pointer">
                  {f.trigger}
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  {f.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </li>
      </ul>
    </motion.div>
  );
};

export default Faq;
