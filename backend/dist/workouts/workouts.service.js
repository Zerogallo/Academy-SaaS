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
        this.workoutDetails = {
            A: [
                { nome: 'Supino reto', aparelho: 'Barra / Halteres', series: 4, repeticoes: '8-12', obs: 'Controlar a descida' },
                { nome: 'Crucifixo', aparelho: 'Máquina / Halteres', series: 3, repeticoes: '12-15', obs: 'Cotovelos levemente flexionados' },
                { nome: 'Desenvolvimento de ombros', aparelho: 'Halteres / Máquina', series: 4, repeticoes: '8-10', obs: 'Não travar cotovelos' },
                { nome: 'Elevação lateral', aparelho: 'Halteres', series: 3, repeticoes: '12-15', obs: 'Controlar o movimento' },
                { nome: 'Tríceps pulley', aparelho: 'Polia alta', series: 4, repeticoes: '10-12', obs: 'Cotovelos fixos' },
                { nome: 'Tríceps testa', aparelho: 'Barra W / Halteres', series: 3, repeticoes: '10-12', obs: 'Cuidado com os cotovelos' }
            ],
            B: [
                { nome: 'Puxada frontal', aparelho: 'Polia alta', series: 4, repeticoes: '8-12', obs: 'Pegada aberta' },
                { nome: 'Remada curvada', aparelho: 'Barra', series: 4, repeticoes: '8-10', obs: 'Manter coluna reta' },
                { nome: 'Remada máquina', aparelho: 'Máquina remada', series: 3, repeticoes: '10-12', obs: 'Encolher escápulas' },
                { nome: 'Rosca direta', aparelho: 'Barra / Halteres', series: 4, repeticoes: '8-12', obs: 'Sem balanço' },
                { nome: 'Rosca alternada', aparelho: 'Halteres', series: 3, repeticoes: '10-12', obs: 'Alternar braços' },
                { nome: 'Rosca concentrada', aparelho: 'Halter', series: 3, repeticoes: '12-15', obs: 'Apoiar braço na coxa' }
            ],
            C: [
                { nome: 'Agachamento', aparelho: 'Barra / Smith', series: 4, repeticoes: '8-10', obs: 'Joelhos alinhados' },
                { nome: 'Leg press', aparelho: 'Máquina leg press', series: 4, repeticoes: '10-12', obs: 'Não travar joelhos' },
                { nome: 'Cadeira extensora', aparelho: 'Máquina extensora', series: 3, repeticoes: '12-15', obs: 'Contração no topo' },
                { nome: 'Mesa flexora', aparelho: 'Máquina flexora', series: 3, repeticoes: '12-15', obs: 'Movimento controlado' },
                { nome: 'Panturrilha em pé', aparelho: 'Máquina / Smith', series: 4, repeticoes: '15-20', obs: 'Pausa no topo' },
                { nome: 'Abdominal infra', aparelho: 'Colchonete', series: 3, repeticoes: '15-20', obs: 'Pernas elevadas' },
                { nome: 'Prancha', aparelho: 'Colchonete', series: 3, repeticoes: '30 segundos', obs: 'Core ativado' }
            ]
        };
    }
    getAllWorkouts() {
        return [
            { type: 'A', exercises: this.workoutSequence.A, details: this.workoutDetails.A, always: 'Esteira 30 min' },
            { type: 'B', exercises: this.workoutSequence.B, details: this.workoutDetails.B, always: 'Esteira 30 min' },
            { type: 'C', exercises: this.workoutSequence.C, details: this.workoutDetails.C, always: 'Esteira 30 min' },
        ];
    }
    getTodaysRecommendedWorkout() {
        const dayIndex = new Date().getDay();
        const workouts = ['A', 'B', 'C'];
        const recommendedType = workouts[dayIndex % 3];
        return {
            type: recommendedType,
            exercises: this.workoutSequence[recommendedType],
            details: this.workoutDetails[recommendedType],
            always: 'Esteira 30 min',
        };
    }
    getWorkoutByType(type) {
        if (!this.workoutSequence[type])
            return null;
        return {
            type,
            exercises: this.workoutSequence[type],
            details: this.workoutDetails[type],
            always: 'Esteira 30 min',
        };
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)()
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map