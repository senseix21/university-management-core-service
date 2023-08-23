import { AcademicFaculty, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { academicFacultySearchableField } from "./academicFaculty.constants";

const prisma = new PrismaClient();

const createAcademicFaculty = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({ data });
    return result;
}

const getAllAcademicFaculty = async (filter: any, options: IPaginationOptions): Promise<IGenericResponse<AcademicFaculty[]>> => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
    console.log(page, limit, skip, sortBy, sortOrder);
    const { searchTerm, ...filterData } = filter;
    console.log(searchTerm, filterData);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: academicFacultySearchableField.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.academicFaculty.findMany({
        skip,
        take: limit,
        where: whereConditions,


    })

    const total = await prisma.academicFaculty.count({
        where: whereConditions
    });

    return {
        meta: {
            page: 1,
            limit: 10,
            total
        },
        data: result
    }
}

const getSingleAcademicFaculty = async (id: string) => {
    const result = await prisma.academicFaculty.findUnique({
        where: {
            id: id,
        }
    })

    return result;
}

const updateAcademicFaculty = async (id: string, data: Partial<AcademicFaculty>): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.update({
        data: data,
        where: {
            id: id,
        }
    });

    return result;
}

const deleteAcademicFaculty = async (id: string): Promise<AcademicFaculty> => {

    // const isExists = await prisma.academicFaculty.findUnique({
    //     where: {
    //         id: id,
    //     }
    // })

    // if (isExists) {
    //     const result = await prisma.academicFaculty.delete({
    //         where: {
    //             id: id,
    //         }
    //     });

    //     return result;
    // }

    const result = await prisma.academicFaculty.delete({
        where: {
            id: id,
        }
    });

    return result;


}

export const AcademicFacultyService = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty

}