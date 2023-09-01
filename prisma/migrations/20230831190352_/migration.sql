-- CreateTable
CREATE TABLE "PhysicalChar" (
    "id" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "color" VARCHAR(255),
    "uniqueChar" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physicalId" TEXT NOT NULL,

    CONSTRAINT "PhysicalChar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthInfo" (
    "id" TEXT NOT NULL,
    "allergies" VARCHAR(255),
    "medication" VARCHAR(255),
    "vaccinations" VARCHAR(255),
    "chronicIssues" VARCHAR(255),
    "routineCheckup" TIMESTAMP(3),
    "exerciseRoutine" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthId" TEXT NOT NULL,

    CONSTRAINT "HealthInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "foodType" VARCHAR(255),
    "supplements" VARCHAR(255),
    "freqPerDay" VARCHAR(255),
    "freqPerWeek" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dietId" TEXT NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrommingInfo" (
    "id" TEXT NOT NULL,
    "schedule" VARCHAR(255),
    "coatType" VARCHAR(255),
    "skinCondition" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groomingId" TEXT NOT NULL,

    CONSTRAINT "GrommingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteId" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vets" (
    "id" TEXT NOT NULL,
    "vetName" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "appointments" VARCHAR(255),
    "specialNotes" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePolicies" (
    "id" TEXT NOT NULL,
    "policyNum" VARCHAR(255),
    "contact" VARCHAR(255),
    "emergencyDetails" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsurancePolicies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetInsuranceVet" (
    "petId" TEXT NOT NULL,
    "vetId" TEXT NOT NULL,
    "insuranceId" TEXT NOT NULL,

    CONSTRAINT "PetInsuranceVet_pkey" PRIMARY KEY ("petId","vetId","insuranceId")
);

-- CreateTable
CREATE TABLE "UserInsuranceVet" (
    "userId" TEXT NOT NULL,
    "vetId" TEXT NOT NULL,
    "insuranceId" TEXT NOT NULL,

    CONSTRAINT "UserInsuranceVet_pkey" PRIMARY KEY ("userId","vetId","insuranceId")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "petName" VARCHAR(255) NOT NULL,
    "petType" VARCHAR(255) NOT NULL,
    "gender" TEXT,
    "DOB" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalChar_physicalId_key" ON "PhysicalChar"("physicalId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInfo_healthId_key" ON "HealthInfo"("healthId");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_dietId_key" ON "Diet"("dietId");

-- CreateIndex
CREATE UNIQUE INDEX "GrommingInfo_groomingId_key" ON "GrommingInfo"("groomingId");

-- CreateIndex
CREATE UNIQUE INDEX "Vets_vetName_key" ON "Vets"("vetName");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicies_policyNum_key" ON "InsurancePolicies"("policyNum");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "PhysicalChar" ADD CONSTRAINT "PhysicalChar_physicalId_fkey" FOREIGN KEY ("physicalId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInfo" ADD CONSTRAINT "HealthInfo_healthId_fkey" FOREIGN KEY ("healthId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrommingInfo" ADD CONSTRAINT "GrommingInfo_groomingId_fkey" FOREIGN KEY ("groomingId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "Vets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetInsuranceVet" ADD CONSTRAINT "PetInsuranceVet_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "InsurancePolicies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "Vets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInsuranceVet" ADD CONSTRAINT "UserInsuranceVet_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "InsurancePolicies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
