import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
// local comps imports
import ArenaChallengeCard from "@/components/ArenaChallengeCard";
import ArenaOptions from "@/components/ArenaOptions";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ArenaPage = async ({ searchParams }: PageProps) => {
  // Await the searchParams in Next.js 15+ Server Components
  const params = await searchParams;

  // Extract values or set defaults
  const currentTab = (params.tab as string) || "newest";
  const searchQuery = (params.search as string) || "";

  const getTabLink = (tab: string) => {
    const base = `?tab=${tab}`;
    return searchQuery ? `${base}&search=${encodeURIComponent(searchQuery)}` : base;
  };

  return (
    <div className="py-10">
      <div className="pb-4">
        <h1 className="hd-font text-3xl font-black uppercase ">
          Watch Your Challenges
        </h1>
      </div>

      <div className="flex items-center justify-between">
        {/* 'value' is driven by the URL, which handles the active styling automatically */}
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

          {/* We only render one set of content logic here. 
              The server fetches the data based on currentTab and searchQuery.
          */}
          <TabsContent className="pt-4" value={currentTab}>
            <div>
              {/* Pass the search and sort params down to fetch the right data */}
              <ArenaChallengeCard sort={currentTab} search={searchQuery} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArenaPage;
