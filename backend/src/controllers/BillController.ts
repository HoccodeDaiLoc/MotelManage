import Container from "typedi";
import { IBillService } from "../service/Interfaces/IBillService";
import { BillService } from "../service/BillService";
import { Request, Response, NextFunction } from "express";

export class BillController {
  private billService: IBillService;

  constructor() {
    this.billService = Container.get(BillService);
  }

  createBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        billStartDate,
        billEndDate,
        payMethod,
        billStatus,
        roomId,
        waterPrice,
        electricPrice,
      } = req.body;
      const billItem = [
        {
          itemName: "Phòng",
        },
        {
          itemName: "Điện",
          unitPrice: electricPrice,
        },
        {
          itemName: "Nước",
          unitPrice: waterPrice,
        },
      ];
      const bill = await this.billService.createBill(
        new Date(billStartDate),
        new Date(billEndDate),
        payMethod,
        billStatus,
        billItem,
        roomId
      );
      return res.status(201).json({
        message: "success",
        bill,
      });
    } catch (err) {
      next(err);
    }
  };

  getBillByRenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const renterId = +req.params.renterId as number;
      const status = req.query.status as string;
      const bill = await this.billService.getBillByRenter(renterId, status, limit, page);
      return res.status(200).json({
        message: "success",
        limit: limit,
        page: page,
        total: bill.count,
        total_page: Math.ceil(bill.count / limit),
        data: bill.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  getBillByRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let limit = Number(req.query["limit"]) as number;
      let page = Number(req.query["page"]) as number;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 12;
      }
      const roomId = +req.params.roomId as number;
      const status = req.query.status as string;
      const bill = await this.billService.getBillByRoom(roomId, status, limit, page);
      return res.status(200).json({
        limit: limit,
        page: page,
        total: bill.count,
        total_page: Math.ceil(bill.count / limit),
        data: bill.rows,
      });
    } catch (err) {
      next(err);
    }
  };

  updateBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId = +req.params.billId as number;
      const data = req.body;
      const bill = await this.billService.updateBillById(billId, data);
      return res.status(200).json({
        message: "update bill success",
        data: bill,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteBillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId = +req.params.billId as number;
      await this.billService.deleteBillById(billId);
      return res.status(200).json({
        message: "delete bill success",
      });
    } catch (err) {
      next(err);
    }
  };
}
