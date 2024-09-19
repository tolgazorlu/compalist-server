import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    public status: string;
    public isOperational: boolean;

    constructor(
        public message: string,
        public statusCode: number,
    ) {
        super(message);
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const globalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
