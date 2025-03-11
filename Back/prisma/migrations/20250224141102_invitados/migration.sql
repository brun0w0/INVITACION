/*
  Warnings:

  - The primary key for the `acompanante` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `acompanante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `invitadoId` on the `acompanante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `invitado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `invitado` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `acompanante` DROP FOREIGN KEY `Acompanante_invitadoId_fkey`;

-- DropIndex
DROP INDEX `Acompanante_invitadoId_fkey` ON `acompanante`;

-- AlterTable
ALTER TABLE `acompanante` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `invitadoId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `invitado` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Acompanante` ADD CONSTRAINT `Acompanante_invitadoId_fkey` FOREIGN KEY (`invitadoId`) REFERENCES `Invitado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
