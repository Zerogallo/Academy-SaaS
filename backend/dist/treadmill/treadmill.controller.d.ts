import { TreadmillService } from './treadmill.service';
export declare class TreadmillController {
    private treadmillService;
    constructor(treadmillService: TreadmillService);
    start(req: any): Promise<import("./treadmill.entity").TreadmillSession>;
    end(req: any): Promise<import("./treadmill.entity").TreadmillSession>;
    getActive(req: any): Promise<import("./treadmill.entity").TreadmillSession>;
}
