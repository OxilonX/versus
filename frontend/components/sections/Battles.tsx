import { Badge } from "@/components/ui/badge";
import { battles } from "@/utils/BattlesVars";
import Image from "next/image";
const Battles = () => {
  return (
    <div className="">
      <ul className="relative flex flex-col rounded-md ">
        {battles.map((b) => (
          <li
            key={b.id}
            className=" px-10 py-6 bg-accent-foreground dark:bg-accent flex justify-between items-center 
            transition-all duration-300 cursor-pointer group
             hover:bg-card-foreground dark:hover:bg-card hover:pl-14 border-l-0 hover:border-l-8 hover:border-primary"
          >
            <p className="text-xl font-bold text-background dark:text-foreground">
              {b.who}
            </p>
            <div className="flex items-center gap-2 ">
              {b.tags.map((t, i) => (
                <Badge key={i} className="px-4 py-1">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="hidden group-hover:block absolute bottom-1 right-1 w-100 h-50 shadow-2xl">
              <Image
                src={b.url}
                alt={b.description}
                fill
                className="object-cover rounded-xl brightness-80"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Battles;
