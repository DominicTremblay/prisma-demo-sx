/*
  Warnings:

  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;
