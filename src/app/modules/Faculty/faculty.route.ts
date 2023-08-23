import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post('/create', FacultyController.createFaculty)
router.get('/', FacultyController.getAllFaculty)
router.get('/:id', FacultyController.getSingleFaculty)
router.get('/:id', FacultyController.updateFaculty)
router.get('/:id', FacultyController.deleteFaculty)

export const FacultyRoutes = router;