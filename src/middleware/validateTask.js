import {body, query, param, validationResult} from "express-validator";
import ApiError from "../utils/ApiError.js";

function handleValidationErrors(req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(
            400,
            errors.array()[0].msg
        );
    }
    next();
}

export const validateCreateTask=[
    body("title")
    .trim()
    .notEmpty().withMessage("Title is empty")
    .isLength({min : 3}).withMessage("Title must be atleast 3 characters long"),

    body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"]).withMessage("Your chosen prioity doesn't exist"),
    
    body("description")
    .optional()
    .isLength({max:500}).withMessage("Description cannot exceed 500 characters"),
    
    body("deadline")
    .optional()
    .isDate().withMessage("Invalid deadline"),

    body("completed")
    .optional()
    .isBoolean().withMessage("Completed must be true or false"),
    handleValidationErrors
];

export const validateGetTasks = [
    query("page")
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be at least 1"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),

    query("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium or High"),

    query("completed")
        .optional()
        .isBoolean().withMessage("Completed must be true or false"),

    query("sort")
        .optional()
        .isIn([
            "title",
            "-title",
            "priority",
            "-priority",
            "deadline",
            "-deadline",
            "createdAt",
            "-createdAt"
        ]).withMessage("Invalid sort field"),

    query("search")
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage("Search cannot exceed 100 characters"),

    handleValidationErrors
];

export const validateUpdateTask = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Priority must be Low, Medium or High"),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("deadline")
        .optional()
        .isDate()
        .withMessage("Invalid deadline"),

    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be true or false"),
    
    (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            throw new ApiError(
                400,
                "At least one field is required to update the task"
            );
        }
        next();
    },


    handleValidationErrors
];

export const validateTaskId = [
    param("id")
        .isMongoId().withMessage("Invalid task id"),

    handleValidationErrors
];