import { Pipe, PipeTransform } from '@angular/core';

import { Transmission } from 'src/app/Models/transmission';

@Pipe({
  name:"transmissionToString"
})
export class TransmissionToString implements PipeTransform{
    public transform(value: Transmission, fallback: string): string {
        return value.gearBoxType.type + " "+ value.transmissionType.type;         
    }
 }