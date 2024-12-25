import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

export const validateMyUserRequest: Array<(req: Request, res: Response, next: NextFunction) => void> = [
    body("name").isString().notEmpty().withMessage("Name must be a String"),
    body("addressLine1").isString().notEmpty().withMessage("Address Line 1 must be a String"),
    body("city").isString().notEmpty().withMessage("City must be a String"),
    body("country").isString().notEmpty().withMessage("Country must be a String"),

    handleValidationErrors,
];
