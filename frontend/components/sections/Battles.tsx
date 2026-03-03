import { Badge } from "@/components/ui/badge";
import { battles } from "@/utils/BattlesVars";
import Image from "next/image";
const Battles = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="hd-font text-3xl font-black uppercase ">Top Battles</h1>
      <ul className="relative flex flex-col rounded-xl overflow-hidden shadow-lg dark:shadow-background">
        {battles.map((b) => (
          <li
            key={b.id}
            className=" px-10 py-6 bg-card dark:bg-accent flex justify-between items-center 
            transition-all duration-300 cursor-pointer group
             hover:bg-background dark:hover:bg-card hover:pl-14 border-l-0 hover:border-l-8 hover:border-l-primary dark:hover:border-l-primary border-b-2 border-card-foreground dark:border-card last:border-b-0"
          >
            <p className="text-lg font-bold text-foregrounddark:text-foreground">
              {b.who}
            </p>
            <div className="flex items-center gap-2 ">
              {b.tags.map((t, i) => (
                <Badge key={i} className="px-4 py-1">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="hidden group-hover:block absolute bottom-1 right-1 w-100 h-50 shadow-2xl overflow-hidden z-20">
              <Image
                src={b.url}
                alt={b.description}
                fill
                className="object-cover rounded-xl brightness-80 "
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Battles;
