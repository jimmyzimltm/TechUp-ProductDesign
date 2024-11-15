/*
  Warnings:

  - Added the required column `boc` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insight` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morale` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psc` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "boc" INTEGER NOT NULL,
ADD COLUMN     "insight" INTEGER NOT NULL,
ADD COLUMN     "morale" INTEGER NOT NULL,
ADD COLUMN     "psc" INTEGER NOT NULL;
