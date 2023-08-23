import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { AcademicFacultyService } from "./academicFaculty.service";
import { academicFacultyFilterableField } from "./academicFaculty.constants";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(data);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "ACADEMIC AcademicFaculty created successfully",
        data: result
    });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const filters = pick(req.query, academicFacultyFilterableField);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

    const result = await AcademicFacultyService.getAllAcademicFaculty(filters, options)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic AcademicFaculty fetched successfully",
        meta: result.meta,
        data: result.data
    });
});



const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "AcademicFaculty fetched successfully",
        data: result
    });

});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(id, data);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "AcademicFaculty updated successfully",
        data: result
    });

});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "AcademicFaculty deleted successfully",
        data: result
    });
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}