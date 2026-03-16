import ArenaChallengeCard from "@/components/ArenaChallengeCard";
interface PageProps {
  params: Promise<{ challengeId: string }>;
}

const ChallengeDetailsPage = async ({ params }: PageProps) => {
  const { challengeId } = await params;

  return (
    <div className="py-10">
      <div className="pb-4">
        <h1 className="hd-font text-3xl font-black uppercase ">
          Watch Your Challenges
        </h1>
      </div>
      <ArenaChallengeCard sort={"newest"} search={challengeId} />
    </div>
  );
};
export default ChallengeDetailsPage;
