/*
  Warnings:

  - You are about to drop the column `aprobado` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `ciudad` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Shelter` table. All the data in the column will be lost.
  - Added the required column `userOwnerId` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "aprobado",
DROP COLUMN "ciudad",
DROP COLUMN "estado",
DROP COLUMN "ubicacion",
DROP COLUMN "userId",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fullAddress" TEXT,
ADD COLUMN     "municipality" TEXT,
ADD COLUMN     "schedule" TEXT,
ADD COLUMN     "userOwnerId" TEXT NOT NULL;
