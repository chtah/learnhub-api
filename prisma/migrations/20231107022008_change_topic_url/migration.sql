/*
  Warnings:

  - You are about to drop the column `topic_Url` on the `topic` table. All the data in the column will be lost.
  - Added the required column `topic_url` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "topic" DROP COLUMN "topic_Url",
ADD COLUMN     "topic_url" TEXT NOT NULL;
