import { RoomController } from "../controllers/RoomController";
import { validateRoom, validateRoomId } from "../validators/RoomValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class RoomRoutes extends BaseRoutes {
  constructor() {
    super(new RoomController());
  }

  public routes(): void {
    this.router.route("/device").get(this.controller.getRoomByCategoryDevice);
    this.router.route("/price").get(this.controller.filterRoomByPrice);
    this.router
      .route("/")
      .get(this.controller.getAllRooms)
      .post(validateRoom, validate, this.controller.addRoom);
    this.router
      .route("/:roomId")
      .get(validateRoomId, validate, this.controller.getRoomById)
      .delete(validateRoomId, validate, this.controller.deleteRoomById)
      .put(
        validateRoomId,
        validateRoom,
        validate,
        this.controller.updateRoomById
      );
    this.router.route("/renter/:renterId").get(this.controller.getRoomByRenterId);
  }
}

export default new RoomRoutes().router;
