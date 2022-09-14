import { ApplicationInterface } from '../application.interface';

export interface AddApplicationArgs extends Partial<ApplicationInterface> {
  userId: number;
  RemoteIP:string;
}
