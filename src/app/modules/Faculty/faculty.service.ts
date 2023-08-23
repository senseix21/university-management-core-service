import { Faculty, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { FacultySearchableFields } from "./faculty.constants";

const prisma = new PrismaClient();

const createFaculty = async (data: Faculty): Promise<Faculty> => {
    const result = await prisma.faculty.create({ data });
    return result;
}

const getAllFaculty = async (filter: any, options: IPaginationOptions): Promise<IGenericResponse<Faculty[]>> => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
    console.log(page, limit, skip, sortBy, sortOrder);
    const { searchTerm, ...filterData } = filter;
    console.log(searchTerm, filterData);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: FacultySearchableFields.map(field => ({
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

    const result = await prisma.faculty.findMany({
        skip,
        take: limit,
        where: whereConditions,


    })

    const total = await prisma.faculty.count({
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

const getSingleFaculty = async (id: string) => {
    const result = await prisma.faculty.findUnique({
        where: {
            id: id,
        }
    })

    return result;
}

const updateFaculty = async (id: string, data: Partial<Faculty>): Promise<Faculty> => {
    const result = await prisma.faculty.update({
        data: data,
        where: {
            id: id,
        }
    });

    return result;
}

const deleteFaculty = async (id: string): Promise<Faculty> => {

    // const isExists = await prisma.Faculty.findUnique({
    //     where: {
    //         id: id,
    //     }
    // })

    // if (isExists) {
    //     const result = await prisma.Faculty.delete({
    //         where: {
    //             id: id,
    //         }
    //     });

    //     return result;
    // }

    const result = await prisma.faculty.delete({
        where: {
            id: id,
        }
    });

    return result;


}

export const FacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty

}