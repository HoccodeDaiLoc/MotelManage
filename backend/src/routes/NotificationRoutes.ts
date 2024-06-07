import { NotificationController } from "../controllers/NotificationController";
import BaseRoutes from "./base/BaseRoutes";

class NotificationRoutes extends BaseRoutes {
    constructor() {
        super(new NotificationController());
    }

    public routes(): void {
        this.router.route("/user/:userId").get(this.controller.getListNotificationByUserId);
    }
}

export default new NotificationRoutes().router;