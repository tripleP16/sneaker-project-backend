import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import ReturnUser from 'src/users/dto/return.user.dto';
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): ReturnUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
