export interface SchedulePaymentPayloadInterface {
  ApplicationID: number;
  Amount: number;
  Frequency: string;
  FirstPaymentDate: Date;
  NumberOfPayments: number;
}
