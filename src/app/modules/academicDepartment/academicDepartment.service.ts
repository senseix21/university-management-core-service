import { AcademicDepartment, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { departmentFilterableFields, departmentSearchableFields } from "./academicDepartment.constants";

const prisma = new PrismaClient();

const createAcademicDepartment = async (data: AcademicDepartment) => {
    const result = await prisma.academicDepartment.create({ data });
    return result;
}

const getAllAcademicDepartments = async (filters: any, options: IPaginationOptions): Promise<IGenericResponse<AcademicDepartment[]>> => {
    const { searchTerm, ...filterData } = filters;
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const andConditions: any = [];

    if (searchTerm) {
        andConditions.push({
            OR: departmentSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            })
            )
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(departmentFilterableFields).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.academicDepartment.findMany({
        skip,
        take: limit,
        where: whereCondition,

    });
    const total = await prisma.academicDepartment.count({ where: whereCondition });

    return {
        meta: {
            page: page,
            limit: limit,
            total
        },
        data: result
    };
}

const getSingleAcademicDepartment = async (id: string): Promise<AcademicDepartment | null> => {
    const result = await prisma.academicDepartment.findUnique({
        where: {
            id: id
        }
    })

    return result;

}

const updateDepartment = async (data: Partial<AcademicDepartment>, id: string): Promise<AcademicDepartment> => {
    const result = await prisma.academicDepartment.update({
        data: data,
        where: {
            id: id,
        }
    })
    return result;
}

const deleteDepartment = async (id: string): Promise<AcademicDepartment> => {
    const result = await prisma.academicDepartment.delete({
        where: {
            id: id,
        }
    })

    return result;
}

export const AcademicDepartmentService = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateDepartment,
    deleteDepartment


}