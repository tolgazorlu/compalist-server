// NEED PROVIDE ALL USER AND COMPANY TYPES FOR TYPESCRIPT.

declare namespace Express {
    export interface Request {
        user: {
            _id: string;
            name: string;
            surname: string;
            email: string;
            phone: string;
            token: string;
            role: string;
            email_verified: boolean;
            verification_token: string;
        };
        file: any;
    }
}
