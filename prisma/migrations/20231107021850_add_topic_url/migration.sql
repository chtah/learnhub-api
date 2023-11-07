/*
  Warnings:

  - Added the required column `topic_Url` to the `topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_description` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "topic" ADD COLUMN     "topic_Url" TEXT NOT NULL,
ADD COLUMN     "topic_description" TEXT NOT NULL;
