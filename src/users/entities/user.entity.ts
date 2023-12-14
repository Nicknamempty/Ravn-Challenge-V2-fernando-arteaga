import { Role } from '@prisma/client';

export class LoggedUserDTO {
  role: Role;
  id: number;
  email: string;
  roleId: number;
}
