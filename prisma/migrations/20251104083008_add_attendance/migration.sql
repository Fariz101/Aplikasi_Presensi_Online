-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_user_id_fkey`;

-- DropIndex
DROP INDEX `Attendance_user_id_key` ON `attendance`;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
