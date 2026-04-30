import { CheckinsService } from './checkins.service';
export declare class CheckinsController {
    private checkinsService;
    constructor(checkinsService: CheckinsService);
    checkin(req: any): Promise<import("./checkin.entity").Checkin>;
    checkout(req: any): Promise<import("./checkin.entity").Checkin>;
    getActive(req: any): Promise<import("./checkin.entity").Checkin>;
}
