import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentPatron = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const patron = request.patron;

    return patron;
  },
);
