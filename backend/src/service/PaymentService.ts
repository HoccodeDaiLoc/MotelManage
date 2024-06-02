import { Inject, Service } from "typedi";
import { BillRepository } from "../repository/BillRepository";
import { IBillRepository } from "../repository/Interfaces/IBillRepository";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

@Service()
export class PaymentService implements PaymentService {
  @Inject(() => BillRepository)
  private billRepository!: IBillRepository;

  paymentWithMoMo = async (
    billId: number,
    rederedirectUrl: string
  ): Promise<any> => {
    const bill = await this.billRepository.getBill({ billId });
    if (!bill) {
      throw new Error("Bill not found");
    }
    const accessKey = process.env.MOMO_ACCESS_KEY as string;
    const secretKey = process.env.MOMO_SECRET_KEY as string;
    const orderInfo = "pay with MoMo";
    const partnerCode = "MOMO";
    const redirectUrl = rederedirectUrl;
    const ipnUrl =
      "https://8992-14-236-62-46.ngrok-free.app/api/payment/momo/call-back-with-momo";
    const requestType = "payWithMethod";
    const amount = bill.total.toString();
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId + bill.billId.toString();
    const extraData = "";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    //Create the HTTPS objects
    const options = {
      method: "POST",
      url: process.env.MOMO_ENDPOINT as string,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };
    let result;
    try {
      result = await axios(options);
    } catch (err) {
      throw err;
    }
    return result.data;
  };

  async updatePaymentStatus(billId: number) {
    try {
      await this.billRepository.updateBillByID(billId, {status: "Đã thanh toán", paymentMethod: "Chuyển khoản"});
    } catch (err) {
      throw err;
    }
  }
}
