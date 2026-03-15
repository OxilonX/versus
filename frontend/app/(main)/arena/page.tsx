//shadcn imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
//lucide icons imports
import { SearchIcon, RotateCcw } from "lucide-react";
//local comps imports
import ArenaChallengeCard from "@/components/ArenaChallengeCard";
const ArenaPage = () => {
  return (
    <div className="py-10">
      <div className="pb-4">
        <h1 className="hd-font text-3xl font-black uppercase ">
          Watch Your Challenges
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <Tabs defaultValue="newest" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="newest">
                Newest
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="votes">
                Most interactions
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="likes">
                Most likes
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <ButtonGroup>
                <Input placeholder="Search..." />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
              <RotateCcw
                size={22}
                className="stroke-2 stroke-muted-foreground cursor-pointer"
              />
            </div>
          </div>

          <TabsContent className="pt-4" value="newest">
            <div>
              <ArenaChallengeCard />
            </div>
          </TabsContent>
          <TabsContent className="pt-4" value="votes">
            <div>
              <ArenaChallengeCard />
            </div>
          </TabsContent>
          <TabsContent className="pt-4" value="likes">
            <div>
              <ArenaChallengeCard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArenaPage;
