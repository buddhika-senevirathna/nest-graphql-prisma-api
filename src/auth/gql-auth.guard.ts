import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext();
        if (gqlReq) {
            gqlReq.body = ctx.getArgs().loginUserInput;
          return gqlReq;
        }
        return context.switchToHttp().getRequest();
    }
}