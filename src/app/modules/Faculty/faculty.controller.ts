import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { FacultyService } from "./faculty.service";
import { academicFacultyFilterableField } from "../academicFaculty/academicFaculty.constants";

const createFaculty = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await FacultyService.createFaculty(data);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "ACADEMIC Faculty created successfully",
        data: result
    });
});

const getAllFaculty = catchAsync(async (req, res) => {
    const filters = pick(req.query, academicFacultyFilterableField);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

    const result = await FacultyService.getAllFaculty(filters, options)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Faculty fetched successfully",
        meta: result.meta,
        data: result.data
    });
});



const getSingleFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await FacultyService.getSingleFaculty(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Faculty fetched successfully",
        data: result
    });

});

const updateFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await FacultyService.updateFaculty(id, data);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Faculty updated successfully",
        data: result
    });

});

const deleteFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await FacultyService.deleteFaculty(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Faculty deleted successfully",
        data: result
    });
});

export const FacultyController = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}