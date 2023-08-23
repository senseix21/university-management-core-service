import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";
import pick from "../../../shared/pick";
import { academicSemesterFilterableField } from "./academicSemester.constants";

//Create a new AcademicSemester
const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.createAcademicSemester(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester created successfully",
        data: result
    })
});

//Get all  AcademicSemesters
const getAllAcademicSemester = catchAsync(async (req, res) => {

    const filters = pick(req.query, academicSemesterFilterableField);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    console.log(options, 'controller')

    const result = await AcademicSemesterService.getAcademicSemester(filters, options);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester retrieved successfully",
        meta: result.meta,
        data: result.data
    });
});

const getSingleSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester retrieved successfully",
        data: result
    })
});

const updateSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await AcademicSemesterService.updateSemester(data, id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester updated successfully",
        data: result
    });
});

const deleteSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Academic Semester deleted successfully',
        data: result
    });
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleSemester,
    updateSemester,
    deleteSemester
}