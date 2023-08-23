import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";
import pick from "../../../shared/pick";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.createAcademicDepartment(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department created successfully",
        data: result
    })
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['title', 'searchTerm'])
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AcademicDepartmentService.getAllAcademicDepartments(filters, options);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department retrieved successfully",
        meta: result.meta,
        data: result.data
    });

});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleAcademicDepartment(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department retrieved successfully",
        data: result
    })
});

const updateDepartment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await AcademicDepartmentService.updateDepartment(data, id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Department updated successfully",
        data: result
    });
});

const deleteDepartment = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Department deleted successfully",
        data: result
    });
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateDepartment,
    deleteDepartment


}