-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "acceptsDonations" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "donationAccountHolder" TEXT,
ADD COLUMN     "donationBankName" TEXT,
ADD COLUMN     "donationCauseText" TEXT,
ADD COLUMN     "donationClabe" TEXT,
ADD COLUMN     "donationMercadoPagoLink" TEXT,
ADD COLUMN     "donationPaypalLink" TEXT;
