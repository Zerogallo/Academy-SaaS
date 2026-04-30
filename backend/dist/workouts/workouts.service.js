"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
let WorkoutsService = class WorkoutsService {
    constructor() {
        this.workoutSequence = {
            A: ['Peito', 'Ombro', 'Tríceps'],
            B: ['Costas', 'Bíceps'],
            C: ['Pernas', 'Abdômen'],
        };
    }
    getTodaysWorkout() {
        const dayIndex = new Date().getDay();
        const workouts = ['A', 'B', 'C'];
        const todayWorkout = workouts[dayIndex % 3];
        return {
            type: todayWorkout,
            exercises: this.workoutSequence[todayWorkout],
            always: 'Esteira (registrar tempo separadamente)',
        };
    }
    getWorkoutByType(type) {
        return this.workoutSequence[type] || null;
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)()
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map