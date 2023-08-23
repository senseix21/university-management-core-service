import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/create-semester', AcademicSemesterController.createAcademicSemester)
router.get('/', AcademicSemesterController.getAllAcademicSemester)
router.get('/:id', AcademicSemesterController.getSingleSemester)
router.patch('/:id', AcademicSemesterController.updateSemester)
router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoutes = router;