import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isObservable, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValidToken = super.canActivate(context);

    const isValidTokenAnObservable = isObservable(isValidToken);
    if (isValidTokenAnObservable) {
      return lastValueFrom(isValidToken);
    }

    return isValidToken;
  }
}
