import { body, param } from "express-validator";

export const validateDeviceId = [
  param("deviceId")
    .notEmpty()
    .withMessage("deviceId is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("deviceId must be an integer"),
];

export const validateDevice = [
  body("device_name")
    .notEmpty()
    .withMessage("device_name is required")
    .isString()
    .withMessage("device_name must be an string"),
  body("device_price")
    .notEmpty()
    .withMessage("device_price is required")
    .isNumeric()
    .withMessage("device_price phải là số")
    .isLength({ min: 0 })
    .withMessage("device_price phải lớn hơn 0"),
];
