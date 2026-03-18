import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
// local comps imports
import ArenaChallengeCard from "@/components/ArenaChallengeCard";
import ArenaOptions from "@/components/ArenaOptions";
import { SectionHeaders } from "@/motions/GlobalMotion";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ArenaPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const currentTab = (params.tab as string) || "newest";
  const searchQuery = (params.search as string) || "";

  const getTabLink = (tab: string) => {
    const base = `?tab=${tab}`;
    return searchQuery
      ? `${base}&search=${encodeURIComponent(searchQuery)}`
      : base;
  };

  return (
    <div className="py-10">
      <div className="pb-4">
        <SectionHeaders>Watch Your Challenges</SectionHeaders>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={currentTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <Link href={getTabLink("newest")} scroll={false} prefetch={true}>
                <TabsTrigger className="cursor-pointer" value="newest">
                  Newest
                </TabsTrigger>
              </Link>

              <Link href={getTabLink("votes")} scroll={false} prefetch={true}>
                <TabsTrigger className="cursor-pointer" value="votes">
                  Most interactions
                </TabsTrigger>
              </Link>

              <Link href={getTabLink("likes")} scroll={false} prefetch={true}>
                <TabsTrigger className="cursor-pointer" value="likes">
                  Most likes
                </TabsTrigger>
              </Link>
            </TabsList>

            <ArenaOptions />
          </div>

          <TabsContent className="pt-4" value={currentTab}>
            <div>
              <ArenaChallengeCard sort={currentTab} search={searchQuery} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArenaPage;
