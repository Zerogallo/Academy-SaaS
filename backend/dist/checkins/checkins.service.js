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
exports.CheckinsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checkin_entity_1 = require("./checkin.entity");
const users_service_1 = require("../users/users.service");
let CheckinsService = class CheckinsService {
    constructor(checkinsRepository, usersService) {
        this.checkinsRepository = checkinsRepository;
        this.usersService = usersService;
    }
    async checkin(userId) {
        const user = await this.usersService.findById(userId);
        const activeCheckin = await this.checkinsRepository.findOne({
            where: { user: { id: userId }, checkoutTime: null },
        });
        if (activeCheckin)
            throw new common_1.BadRequestException('Usuário já está com check-in ativo');
        const checkin = this.checkinsRepository.create({
            user,
            checkinTime: new Date(),
        });
        return this.checkinsRepository.save(checkin);
    }
    async checkout(userId) {
        const checkin = await this.checkinsRepository.findOne({
            where: { user: { id: userId }, checkoutTime: null },
            relations: ['user'],
        });
        if (!checkin)
            throw new common_1.NotFoundException('Nenhum check-in ativo encontrado');
        checkin.checkoutTime = new Date();
        const durationMs = checkin.checkoutTime.getTime() - checkin.checkinTime.getTime();
        checkin.durationMinutes = Math.floor(durationMs / 60000);
        return this.checkinsRepository.save(checkin);
    }
    async getActiveCheckin(userId) {
        return this.checkinsRepository.findOne({
            where: { user: { id: userId }, checkoutTime: null },
        });
    }
};
exports.CheckinsService = CheckinsService;
exports.CheckinsService = CheckinsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checkin_entity_1.Checkin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], CheckinsService);
//# sourceMappingURL=checkins.service.js.map