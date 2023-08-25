-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "storage";

-- CreateTable
CREATE TABLE "storage"."Image" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhysicalChar" (
    "id" SERIAL NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "color" VARCHAR(255),
    "uniqueChar" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physicalId" INTEGER NOT NULL,

    CONSTRAINT "PhysicalChar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HealthInfo" (
    "id" SERIAL NOT NULL,
    "allergies" VARCHAR(255),
    "medication" VARCHAR(255),
    "vaccincations" VARCHAR(255),
    "chronicIssues" VARCHAR(255),
    "routineCheckup" TIMESTAMP(3),
    "exerciseRoutine" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthId" INTEGER NOT NULL,

    CONSTRAINT "HealthInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Diet" (
    "id" SERIAL NOT NULL,
    "foodType" VARCHAR(255),
    "supplements" VARCHAR(255),
    "freqPerDay" VARCHAR(255),
    "freqPerWeek" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dietId" INTEGER NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GrommingInfo" (
    "id" SERIAL NOT NULL,
    "schedule" VARCHAR(255),
    "coatType" VARCHAR(255),
    "skinCondition" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groomingId" INTEGER NOT NULL,

    CONSTRAINT "GrommingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notes" (
    "id" SERIAL NOT NULL,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteId" INTEGER NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vets" (
    "id" SERIAL NOT NULL,
    "vetName" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "appointments" VARCHAR(255),
    "specialNotes" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InsurancePolicies" (
    "id" SERIAL NOT NULL,
    "policyNum" VARCHAR(255),
    "contact" VARCHAR(255),
    "emergencyDetails" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsurancePolicies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetInsuranceVet" (
    "petId" INTEGER NOT NULL,
    "vetId" INTEGER NOT NULL,
    "insuranceId" INTEGER NOT NULL,

    CONSTRAINT "PetInsuranceVet_pkey" PRIMARY KEY ("petId","vetId","insuranceId")
);

-- CreateTable
CREATE TABLE "public"."UserInsuranceVet" (
    "userId" INTEGER NOT NULL,
    "vetId" INTEGER NOT NULL,
    "insuranceId" INTEGER NOT NULL,

    CONSTRAINT "UserInsuranceVet_pkey" PRIMARY KEY ("userId","vetId","insuranceId")
);

-- CreateTable
CREATE TABLE "auth"."Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pets" (
    "id" SERIAL NOT NULL,
    "petName" VARCHAR(255) NOT NULL,
    "gender" TEXT,
    "DOB" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "storage"."Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_petId_key" ON "storage"."Image"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalChar_physicalId_key" ON "public"."PhysicalChar"("physicalId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInfo_healthId_key" ON "public"."HealthInfo"("healthId");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_dietId_key" ON "public"."Diet"("dietId");

-- CreateIndex
CREATE UNIQUE INDEX "GrommingInfo_groomingId_key" ON "public"."GrommingInfo"("groomingId");

-- CreateIndex
CREATE UNIQUE INDEX "PetInsuranceVet_petId_key" ON "public"."PetInsuranceVet"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "PetInsuranceVet_vetId_key" ON "public"."PetInsuranceVet"("vetId");

-- CreateIndex
CREATE UNIQUE INDEX "PetInsuranceVet_insuranceId_key" ON "public"."PetInsuranceVet"("insuranceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInsuranceVet_userId_key" ON "public"."UserInsuranceVet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInsuranceVet_vetId_key" ON "public"."UserInsuranceVet"("vetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInsuranceVet_insuranceId_key" ON "public"."UserInsuranceVet"("insuranceId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "auth"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "auth"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "auth"."Users"("password");

-- AddForeignKey
ALTER TABLE "storage"."Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage"."Image" ADD CONSTRAINT "Image_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PhysicalChar" ADD CONSTRAINT "PhysicalChar_physicalId_fkey" FOREIGN KEY ("physicalId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthInfo" ADD CONSTRAINT "HealthInfo_healthId_fkey" FOREIGN KEY ("healthId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diet" ADD CONSTRAINT "Diet_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GrommingInfo" ADD CONSTRAINT "GrommingInfo_groomingId_fkey" FOREIGN KEY ("groomingId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notes" ADD CONSTRAINT "Notes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "public"."Vets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "public"."InsurancePolicies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "public"."Vets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "public"."InsurancePolicies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pets" ADD CONSTRAINT "Pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
