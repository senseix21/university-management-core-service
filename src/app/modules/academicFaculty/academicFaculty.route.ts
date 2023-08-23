import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post('/create', AcademicFacultyController.createAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty)
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.patch('/:id', AcademicFacultyController.updateAcademicFaculty)
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)

export const AcademicFacultyRoutes = router;