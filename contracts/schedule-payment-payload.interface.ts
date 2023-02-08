export interface SchedulePaymentPayloadInterface {
  ApplicationID: number;
  Amount: number;
  Frequency: string;
  FirstPaymentDate: Date;
  NumberOfPayments: number;
  AmountFinanced:number;
  SellingPrice:number;
  Deposit:number;
  HoldBack:number;
  LeaseLengthMonths:number;
  BuyoutOption:number
}
