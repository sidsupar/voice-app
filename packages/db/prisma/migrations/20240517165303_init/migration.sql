/*
  Warnings:

  - You are about to drop the column `userId` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_userId_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "publishDate" TIMESTAMP(3),
ALTER COLUMN "heading" DROP NOT NULL,
ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT,
ALTER COLUMN "likes" DROP NOT NULL,
ALTER COLUMN "dislikes" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
