export const status = {
    success:200,
    created: 201,
    badRequest: 400,
    notfound:404,
    internalServerError: 500
}

export interface errorResponse {
    code: number;
    message: string;
}

export interface successResponse {
    code: number;
    message?: { [key: string]: any };
}