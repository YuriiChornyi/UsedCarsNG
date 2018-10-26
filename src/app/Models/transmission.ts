import { GearBoxType } from "src/app/Models/gearBoxType";
import { TransmissionType } from "src/app/Models/transmissionType";

export class Transmission {
    transmissionId: number;
    gearBoxType: GearBoxType;
    transmissionType: TransmissionType;
}