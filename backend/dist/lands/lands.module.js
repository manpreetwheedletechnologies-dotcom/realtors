"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const land_schema_1 = require("./land.schema");
const lands_service_1 = require("./lands.service");
const lands_controller_1 = require("./lands.controller");
let LandsModule = class LandsModule {
};
exports.LandsModule = LandsModule;
exports.LandsModule = LandsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: land_schema_1.Land.name, schema: land_schema_1.LandSchema }])],
        providers: [lands_service_1.LandsService],
        controllers: [lands_controller_1.LandsController],
        exports: [lands_service_1.LandsService],
    })
], LandsModule);
//# sourceMappingURL=lands.module.js.map