import { Car } from 'src/app/Models/car';
import { Photo } from 'src/app/Models/photo';

import { Guid } from 'node_modules/guid-typescript/dist/guid';

export class Advertisement {
    advertisementId: Guid;
    userId: string;
    car: Car;
    description: string;
    price: number;
    photos: Photo[];
}