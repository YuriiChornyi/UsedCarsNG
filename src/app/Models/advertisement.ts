import { Guid } from 'node_modules/guid-typescript/dist/guid';

export class Advertisement {
    advertisementId: Guid;
    userId: Guid;
    carId: Guid;
    description: string;
    price: number;
}