import ArenaChallengeCard from "@/components/ArenaChallengeCard";
interface PageProps {
  params: Promise<{ challengeId: string }>;
}
import { SectionHeaders } from "@/motions/GlobalMotion";
const ChallengeDetailsPage = async ({ params }: PageProps) => {
  const { challengeId } = await params;

  return (
    <div className="py-10">
      <div className="pb-4">
        <SectionHeaders>Watch Your Challenges</SectionHeaders>
      </div>{" "}
      <ArenaChallengeCard sort={"newest"} search={challengeId} />
    </div>
  );
};
export default ChallengeDetailsPage;
