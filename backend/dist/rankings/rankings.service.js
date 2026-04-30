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
exports.RankingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checkin_entity_1 = require("../checkins/checkin.entity");
const treadmill_entity_1 = require("../treadmill/treadmill.entity");
const user_entity_1 = require("../users/user.entity");
let RankingsService = class RankingsService {
    constructor(checkinsRepository, treadmillRepository, usersRepository) {
        this.checkinsRepository = checkinsRepository;
        this.treadmillRepository = treadmillRepository;
        this.usersRepository = usersRepository;
    }
    async getRankingGeneral(period = 'month') {
        const startDate = new Date();
        if (period === 'week')
            startDate.setDate(startDate.getDate() - 7);
        else
            startDate.setMonth(startDate.getMonth() - 1);
        const academyStats = await this.checkinsRepository
            .createQueryBuilder('checkin')
            .select('checkin.userId', 'userId')
            .addSelect('SUM(checkin.durationMinutes)', 'totalMinutes')
            .where('checkin.checkoutTime IS NOT NULL')
            .andWhere('checkin.checkoutTime >= :startDate', { startDate })
            .groupBy('checkin.userId')
            .getRawMany();
        const treadmillStats = await this.treadmillRepository
            .createQueryBuilder('treadmill')
            .select('treadmill.userId', 'userId')
            .addSelect('SUM(treadmill.durationMinutes)', 'totalMinutes')
            .where('treadmill.endTime IS NOT NULL')
            .andWhere('treadmill.endTime >= :startDate', { startDate })
            .groupBy('treadmill.userId')
            .getRawMany();
        const userMap = new Map();
        for (const item of academyStats) {
            const user = await this.usersRepository.findOne({ where: { id: item.userId } });
            if (user) {
                userMap.set(item.userId, {
                    id: user.id,
                    name: user.name,
                    photo: user.photo,
                    totalAcademy: Number(item.totalMinutes),
                    totalTreadmill: 0,
                });
            }
        }
        for (const item of treadmillStats) {
            if (userMap.has(item.userId)) {
                userMap.get(item.userId).totalTreadmill += Number(item.totalMinutes);
            }
            else {
                const user = await this.usersRepository.findOne({ where: { id: item.userId } });
                if (user) {
                    userMap.set(item.userId, {
                        id: user.id,
                        name: user.name,
                        photo: user.photo,
                        totalAcademy: 0,
                        totalTreadmill: Number(item.totalMinutes),
                    });
                }
            }
        }
        const ranking = Array.from(userMap.values());
        ranking.sort((a, b) => b.totalAcademy - a.totalAcademy);
        return ranking.slice(0, 3);
    }
};
exports.RankingsService = RankingsService;
exports.RankingsService = RankingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checkin_entity_1.Checkin)),
    __param(1, (0, typeorm_1.InjectRepository)(treadmill_entity_1.TreadmillSession)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RankingsService);
//# sourceMappingURL=rankings.service.js.map