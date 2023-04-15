/*
  Warnings:

  - You are about to drop the column `currentLocation` on the `UsersOnTrips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentLocation" TEXT;

-- AlterTable
ALTER TABLE "UsersOnTrips" DROP COLUMN "currentLocation";
