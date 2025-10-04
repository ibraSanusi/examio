/*
  Warnings:

  - You are about to drop the column `score` on the `Exam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Exam" DROP COLUMN "score",
ADD COLUMN     "correction" TEXT;
