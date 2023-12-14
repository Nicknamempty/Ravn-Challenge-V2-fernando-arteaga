import { SetMetadata } from '@nestjs/common';
import { ROLE_DECORATOR_METADATA } from '../constant/roles.constant';

export const Roles = (role: string[]) =>
  SetMetadata(ROLE_DECORATOR_METADATA, role);
