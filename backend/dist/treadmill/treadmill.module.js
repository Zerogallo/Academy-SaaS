"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreadmillModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const treadmill_entity_1 = require("./treadmill.entity");
const treadmill_service_1 = require("./treadmill.service");
const treadmill_controller_1 = require("./treadmill.controller");
const users_module_1 = require("../users/users.module");
let TreadmillModule = class TreadmillModule {
};
exports.TreadmillModule = TreadmillModule;
exports.TreadmillModule = TreadmillModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([treadmill_entity_1.TreadmillSession]), users_module_1.UsersModule],
        providers: [treadmill_service_1.TreadmillService],
        controllers: [treadmill_controller_1.TreadmillController],
    })
], TreadmillModule);
//# sourceMappingURL=treadmill.module.js.map