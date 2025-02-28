"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDto = void 0;
const openapi = require("@nestjs/swagger");
class ChatDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { brokerChats: { required: true, type: () => [Object] }, homeSeekingChats: { required: true, type: () => [Object] } };
    }
}
exports.ChatDto = ChatDto;
//# sourceMappingURL=chat.dto.js.map