import { Request } from 'express';

export interface IAuthenticatedRequest extends Request {
  isPublicPath: boolean;
  user: any;
}
