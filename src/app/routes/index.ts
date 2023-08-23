import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/semester",
    routes: AcademicSemesterRoutes
  },
  {
    path: "/department",
    routes: AcademicDepartmentRoutes
  },
  {
    path: "/academicFaculty",
    routes: AcademicFacultyRoutes
  },
  {
    path: "/faculty",
    routes: FacultyRoutes
  },
  // {
  //   path: '/student',
  //   routes: StudentRoutes
  // }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
