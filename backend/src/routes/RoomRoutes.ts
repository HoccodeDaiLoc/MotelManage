import { RoomController } from "../controllers/RoomController";
import { validateRoom, validateRoomId } from "../validators/RoomValidator";
import { validate } from "../validators/Validator";
import BaseRoutes from "./base/BaseRoutes";

class RoomRoutes extends BaseRoutes {
  constructor() {
    super(new RoomController());
  }

  public routes(): void {
    this.router
      .route("/")
      .get(this.controller.filterRoomByPrice)
      .post(validateRoom, validate, this.controller.addRoom);
    this.router
      .route("/:roomId")
      .get(validateRoomId, validate, this.controller.getRoomById)
      .delete(validateRoomId, validate, this.controller.deleteRoomById);
  }
}

export default new RoomRoutes().router;
