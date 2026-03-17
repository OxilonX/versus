import { BattlesListMotion } from "@/motions/BattlesMotion";
import { battles } from "@/utils/BattlesVars";
import { SectionHeaders } from "@/motions/GlobalMotion";
const Battles = () => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeaders>Top Battles</SectionHeaders>

      <BattlesListMotion battles={battles} />
    </div>
  );
};

export default Battles;
