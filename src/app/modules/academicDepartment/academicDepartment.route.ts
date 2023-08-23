import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-department', AcademicDepartmentController.createAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/:id', AcademicDepartmentController.updateDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;