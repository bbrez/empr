/*
  Warnings:

  - The primary key for the `UsersOnTrips` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersOnTrips` table. All the data in the column will be lost.
  - You are about to drop the column `viagemId` on the `UsersOnTrips` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `UsersOnTrips` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Tourist', 'Guide', 'Manager', 'Admin');

-- DropForeignKey
ALTER TABLE "UsersOnTrips" DROP CONSTRAINT "UsersOnTrips_viagemId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Tourist';

-- AlterTable
ALTER TABLE "UsersOnTrips" DROP CONSTRAINT "UsersOnTrips_pkey",
DROP COLUMN "id",
DROP COLUMN "viagemId",
ADD COLUMN     "tripId" INTEGER NOT NULL,
ADD CONSTRAINT "UsersOnTrips_pkey" PRIMARY KEY ("userId", "tripId");

-- AddForeignKey
ALTER TABLE "UsersOnTrips" ADD CONSTRAINT "UsersOnTrips_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
