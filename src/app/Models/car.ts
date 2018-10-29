import { ManufacturerModel } from 'src/app/Models/manufacturerModels';
import { Engine } from 'src/app/Models/engine';
import { Transmission } from "src/app/Models/transmission";
import { Guid } from 'guid-typescript/dist/guid';

export class Car {
    carId: Guid;
    engine: Engine;
    transmission: Transmission;
    carModelModel: ManufacturerModel;
    productionYear: Date;
    vinCode: string;
}