import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
