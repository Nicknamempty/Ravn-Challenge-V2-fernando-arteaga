import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_DECORATOR_METADATA } from '../constant/roles.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      ROLE_DECORATOR_METADATA,
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    const { route } = context.switchToHttp().getRequest();

    const { user } = context.switchToHttp().getRequest();

    return roles.includes(user?.role?.name);
  }
}
