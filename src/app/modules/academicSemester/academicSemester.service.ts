import { PrismaClient, AcademicSemester } from "@prisma/client"
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterSearchableField } from "./academicSemester.constants";


const prisma = new PrismaClient();

const createAcademicSemester = async (data: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({ data });
    return result;

}

const getAcademicSemester = async (filters: any, options: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filtersData } = filters;
    console.log(filters);

    const andConditions: any = [];
    if (searchTerm) {
        andConditions.push({
            OR: academicSemesterSearchableField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: {
                    equals: (filtersData as any)[key]
                }
            })
            )
        })
    }

    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions);

    const total = await prisma.academicSemester.count({
        where: whereConditions
    });

    const result = await prisma.academicSemester.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'asc'
        }

    });



    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
}

const getSingleSemester = async (id: string): Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.findUnique({
        where: {
            id: id,
        }
    });
    console.log(result); //

    return result;
}

const updateSemester = async (data: Partial<AcademicSemester>, id: string): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.update({
        data: data,
        where: {
            id: id,
        }
    });

    return result;
}

const deleteSemester = async (id: string): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.delete({
        where: {
            id: id,
        }
    })

    return result;
}


export const AcademicSemesterService = {
    createAcademicSemester,
    getAcademicSemester,
    getSingleSemester,
    updateSemester,
    deleteSemester
}