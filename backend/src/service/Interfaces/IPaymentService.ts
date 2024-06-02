export interface IPaymentService {
  paymentWithMoMo(billId: number, rederedirectUrl: string): Promise<any>;
  updatePaymentStatus(billId: number): Promise<void>;
}
