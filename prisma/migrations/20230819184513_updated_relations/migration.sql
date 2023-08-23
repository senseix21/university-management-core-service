/*
  Warnings:

  - You are about to drop the column `academicFaculty` on the `academic_department` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `academic_department` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `academic_department` table. All the data in the column will be lost.
  - You are about to drop the column `academicDepartmentId` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `studentID` on the `academic_semester` table. All the data in the column will be lost.
  - Added the required column `academicDepartmentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicFacultyId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academmicSemesterId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `academic_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicDepartmentId` to the `faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicFacultyId` to the `faculty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "academic_department" DROP CONSTRAINT "academic_department_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "academic_department" DROP CONSTRAINT "academic_department_studentId_fkey";

-- DropForeignKey
ALTER TABLE "academic_faculty" DROP CONSTRAINT "academic_faculty_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "academic_faculty" DROP CONSTRAINT "academic_faculty_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "academic_faculty" DROP CONSTRAINT "academic_faculty_studentId_fkey";

-- DropForeignKey
ALTER TABLE "academic_semester" DROP CONSTRAINT "academic_semester_studentID_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "academicDepartmentId" TEXT NOT NULL,
ADD COLUMN     "academicFacultyId" TEXT NOT NULL,
ADD COLUMN     "academmicSemesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "academic_department" DROP COLUMN "academicFaculty",
DROP COLUMN "facultyId",
DROP COLUMN "studentId",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "academic_faculty" DROP COLUMN "academicDepartmentId",
DROP COLUMN "facultyId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "academic_semester" DROP COLUMN "studentID";

-- AlterTable
ALTER TABLE "faculty" ADD COLUMN     "academicDepartmentId" TEXT NOT NULL,
ADD COLUMN     "academicFacultyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_academmicSemesterId_fkey" FOREIGN KEY ("academmicSemesterId") REFERENCES "academic_semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
