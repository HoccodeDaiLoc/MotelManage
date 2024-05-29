import { body, param } from "express-validator";

export const validateContractId = [
  param("contractId")
    .notEmpty()
    .withMessage("contractId is required")
    .isNumeric()
    .withMessage("contractId must be an integer"),
];

export const validateContract = [
  body("startDay")
    .notEmpty()
    .withMessage("startDate is required")
    .isDate()
    .withMessage("startDate must be a valid date"),
  body("endDate")
    .optional()
    .isDate()
    .withMessage("endDate must be a valid date"),
  body("rentAmount")
    .notEmpty()
    .withMessage("rentAmount is required")
    .isNumeric()
    .withMessage("rentAmount must be a number"),
  body("deposit_amount")
    .optional()
    .isNumeric()
    .withMessage("deposit_amount must be a number"),
  body("roomId")
    .notEmpty()
    .withMessage("roomId is required")
    .isNumeric()
    .withMessage("roomId must be an integer"),
  body("renterId")
    .notEmpty()
    .withMessage("renterId is required")
    .isNumeric()
    .withMessage("renterId must be an integer"),
];