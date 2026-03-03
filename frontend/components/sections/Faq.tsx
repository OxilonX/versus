import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/utils/FaqVars";
const Faq = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="hd-font text-3xl font-black uppercase ">FAQ</h1>
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
    </div>
  );
};

export default Faq;
