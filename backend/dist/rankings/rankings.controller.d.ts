import { RankingsService } from './rankings.service';
export declare class RankingsController {
    private rankingsService;
    constructor(rankingsService: RankingsService);
    getRanking(period: 'week' | 'month'): Promise<any[]>;
}
