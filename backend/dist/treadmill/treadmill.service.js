"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreadmillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const treadmill_entity_1 = require("./treadmill.entity");
const users_service_1 = require("../users/users.service");
let TreadmillService = class TreadmillService {
    constructor(treadmillRepository, usersService) {
        this.treadmillRepository = treadmillRepository;
        this.usersService = usersService;
    }
    async startTreadmill(userId) {
        const user = await this.usersService.findById(userId);
        const activeSession = await this.treadmillRepository.findOne({
            where: { user: { id: userId }, endTime: null },
        });
        if (activeSession)
            throw new common_1.BadRequestException('Já existe sessão de esteira ativa');
        const session = this.treadmillRepository.create({
            user,
            startTime: new Date(),
        });
        return this.treadmillRepository.save(session);
    }
    async endTreadmill(userId) {
        const session = await this.treadmillRepository.findOne({
            where: { user: { id: userId }, endTime: null },
        });
        if (!session)
            throw new common_1.NotFoundException('Nenhuma sessão de esteira ativa');
        session.endTime = new Date();
        const durationMs = session.endTime.getTime() - session.startTime.getTime();
        session.durationMinutes = Math.floor(durationMs / 60000);
        return this.treadmillRepository.save(session);
    }
    async getActiveSession(userId) {
        return this.treadmillRepository.findOne({
            where: { user: { id: userId }, endTime: null },
        });
    }
};
exports.TreadmillService = TreadmillService;
exports.TreadmillService = TreadmillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(treadmill_entity_1.TreadmillSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TreadmillService);
//# sourceMappingURL=treadmill.service.js.map