-- AlterTable
ALTER TABLE "votes" ADD COLUMN     "challengeItemChallengeId" TEXT,
ADD COLUMN     "challengeItemItemId" TEXT;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_challengeItemChallengeId_challengeItemItemId_fkey" FOREIGN KEY ("challengeItemChallengeId", "challengeItemItemId") REFERENCES "ChallengeItem"("challengeId", "itemId") ON DELETE SET NULL ON UPDATE CASCADE;
