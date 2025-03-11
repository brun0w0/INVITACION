/*
  Warnings:

  - Added the required column `asistentes` to the `Invitado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invitado` ADD COLUMN `asistentes` INTEGER NOT NULL;
