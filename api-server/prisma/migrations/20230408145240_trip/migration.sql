-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnTrips" (
    "id" SERIAL NOT NULL,
    "isGuide" BOOLEAN NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "viagemId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnTrips_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersOnTrips" ADD CONSTRAINT "UsersOnTrips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTrips" ADD CONSTRAINT "UsersOnTrips_viagemId_fkey" FOREIGN KEY ("viagemId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
