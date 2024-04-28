
import { Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Room } from "./Room";
import { DeviceImage } from "./DeviceImage";

@Table({
    tableName: Device.DEVICE_TABLE_NAME
})
export class Device extends Model {
    private static DEVICE_TABLE_NAME = "devices" as string;
    private static DEVICE_ID = "devices_id" as string;
    private static DEVICE_TYPE = "room_number" as string;
    private static DEVICE_NAME = "status" as string;
    private static DEVICE_PRICE = "price" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Device.DEVICE_ID,
    })
    deviceId!: number;

    @Column({
        type: DataType.TEXT,
        field: Device.DEVICE_TYPE
    })
    deviceType!: number;

    @Column({
        type: DataType.TEXT,
        field: Device.DEVICE_NAME
    })
    deviceName!: number;

    @Column({
        type: DataType.DOUBLE,
        field: Device.DEVICE_PRICE
    })
    devicePrice!: number;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @HasMany(() => DeviceImage)
    deviceImage!: DeviceImage[];
}