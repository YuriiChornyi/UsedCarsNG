import { Pipe, PipeTransform } from '@angular/core';

import { Engine } from 'src/app/Models/engine';

@Pipe({
  name:"engineToString"
})
export class EngineToString implements PipeTransform{
    public transform(value: Engine, fallback: string): string {
        return value.engineType.type + " "+ value.value + "L " + value.hp + "HP";         
    }
 }