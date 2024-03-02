"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAuthenticatedUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetAuthenticatedUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=get-authenticated-user.decorator.js.map