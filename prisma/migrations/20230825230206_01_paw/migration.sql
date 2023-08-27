/*
  Warnings:

  - You are about to drop the column `vaccincations` on the `HealthInfo` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "storage"."Image" DROP CONSTRAINT "Image_petId_fkey";

-- DropForeignKey
ALTER TABLE "storage"."Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "public"."HealthInfo" DROP COLUMN "vaccincations",
ADD COLUMN     "vaccinations" VARCHAR(255);

-- DropTable
DROP TABLE "storage"."Image";

-- CreateTable
CREATE TABLE "storage"."UserImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage"."PetImage" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "storage"."UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PetImage_petId_key" ON "storage"."PetImage"("petId");

-- AddForeignKey
ALTER TABLE "storage"."UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage"."PetImage" ADD CONSTRAINT "PetImage_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
