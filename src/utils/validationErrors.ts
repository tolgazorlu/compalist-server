import { Response } from "express";

const handleEmailFormatError = (res: Response) => {
    return res.status(400).json({
        success: false,
        message: "Email format is invalid!",
    });
};

const handleExistingEmailError = (res: Response) => {
    return res.status(400).json({
        success: false,
        message: "This email is already registered!",
    });
};

const handleExistingCompanyError = (res: Response) => {
    return res.status(400).json({
        success: false,
        message: "This company is already registered!",
    });
};

const handleUserNotAuthenticatedError = (res: Response) => {
    return res.status(400).json({
        success: false,
        message: "User not found!",
    });
};

module.exports = {
    handleEmailFormatError,
    handleExistingEmailError,
    handleExistingCompanyError,
    handleUserNotAuthenticatedError,
};
