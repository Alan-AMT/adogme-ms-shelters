/*
  Warnings:

  - You are about to drop the column `address` on the `Shelter` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ShelterStatus" AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "address",
ADD COLUMN     "aprobado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ciudad" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "status" "ShelterStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "ubicacion" TEXT;
