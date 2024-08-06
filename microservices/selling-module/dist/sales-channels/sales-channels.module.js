"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesChannelsModule = void 0;
const common_1 = require("@nestjs/common");
const sales_channels_service_1 = require("./sales-channels.service");
const sales_channels_controller_1 = require("./sales-channels.controller");
let SalesChannelsModule = class SalesChannelsModule {
};
exports.SalesChannelsModule = SalesChannelsModule;
exports.SalesChannelsModule = SalesChannelsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sales_channels_controller_1.SalesChannelsController],
        providers: [sales_channels_service_1.SalesChannelsService],
    })
], SalesChannelsModule);
//# sourceMappingURL=sales-channels.module.js.map