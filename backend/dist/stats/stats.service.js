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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checkin_entity_1 = require("../checkins/checkin.entity");
const treadmill_entity_1 = require("../treadmill/treadmill.entity");
let StatsService = class StatsService {
    constructor(checkinsRepository, treadmillRepository) {
        this.checkinsRepository = checkinsRepository;
        this.treadmillRepository = treadmillRepository;
    }
    async getTodayStats(userId) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const checkins = await this.checkinsRepository
            .createQueryBuilder('checkin')
            .where('checkin.userId = :userId', { userId })
            .andWhere('checkin.checkoutTime BETWEEN :start AND :end', { start: todayStart, end: todayEnd })
            .getMany();
        const totalAcademyMinutes = checkins.reduce((sum, c) => sum + (c.durationMinutes || 0), 0);
        const treadmillSessions = await this.treadmillRepository
            .createQueryBuilder('treadmill')
            .where('treadmill.userId = :userId', { userId })
            .andWhere('treadmill.endTime BETWEEN :start AND :end', { start: todayStart, end: todayEnd })
            .getMany();
        const totalTreadmillMinutes = treadmillSessions.reduce((sum, t) => sum + (t.durationMinutes || 0), 0);
        return {
            academyMinutes: totalAcademyMinutes,
            treadmillMinutes: totalTreadmillMinutes,
            academyGoal: 60,
            treadmillGoal: 30,
        };
    }
    async getWeeklyStats(userId) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        weekStart.setHours(0, 0, 0, 0);
        const now = new Date();
        const checkins = await this.checkinsRepository
            .createQueryBuilder('checkin')
            .where('checkin.userId = :userId', { userId })
            .andWhere('checkin.checkoutTime BETWEEN :start AND :end', { start: weekStart, end: now })
            .getMany();
        const totalAcademyMinutes = checkins.reduce((sum, c) => sum + (c.durationMinutes || 0), 0);
        const treadmillSessions = await this.treadmillRepository
            .createQueryBuilder('treadmill')
            .where('treadmill.userId = :userId', { userId })
            .andWhere('treadmill.endTime BETWEEN :start AND :end', { start: weekStart, end: now })
            .getMany();
        const totalTreadmillMinutes = treadmillSessions.reduce((sum, t) => sum + (t.durationMinutes || 0), 0);
        return { academyMinutes: totalAcademyMinutes, treadmillMinutes: totalTreadmillMinutes };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checkin_entity_1.Checkin)),
    __param(1, (0, typeorm_1.InjectRepository)(treadmill_entity_1.TreadmillSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map