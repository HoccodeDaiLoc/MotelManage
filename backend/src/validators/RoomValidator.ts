import { body, param } from "express-validator";

export const validateRoomId = [
  param("roomId")
    .notEmpty()
    .withMessage("roomId is required")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("actorId must be an integer"),
];

export const validateRoom = [
  body("room_number")
    .notEmpty()
    .withMessage("room_number is required")
    .isInt()
    .withMessage("room_number must be an integer"),
  body("room_status")
    .optional()
    .isIn(["Đang cho thuê", "Phòng trống"])
    .withMessage("room_status là đang cho thuê hoặc phòng trống"),
  body("room_area")
    .notEmpty()
    .withMessage("room_area is required")
    .isNumeric()
    .withMessage("room_area phải là số")
    .isLength({ min: 0 })
    .withMessage("room_area phải lớn hơn 0"),
  body("max_occupancy")
    .optional()
    .isInt()
    .withMessage("max_occupancy phải là số nguyên")
    .isLength({ min: 0 })
    .withMessage("max_occupancy phải lớn hơn không"),
  body("price")
    .notEmpty()
    .withMessage("room phải có giá")
    .isNumeric()
    .withMessage("giá phải là số")
    .isLength({ min: 0 })
    .withMessage("giá phải là số dương"),
];
