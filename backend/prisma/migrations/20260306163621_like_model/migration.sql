-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "like_userId_challengeId_key" ON "like"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
