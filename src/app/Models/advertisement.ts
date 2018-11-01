import { Car } from 'src/app/Models/car';

import { Guid } from 'node_modules/guid-typescript/dist/guid';

export class Advertisement {
    advertisementId: Guid;
    userId: string;
    car: Car;
    description: string;
    price: number;
}