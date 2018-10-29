import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Car } from 'src/app/Models/car';
import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  createdCar: Car = new Car();

  // createCar(engineId: number, transmissionId: number, carModelId: number, productionYear: Date, vinCode: string){
  //   const createCarUrl= AppSettings.API_ENDPOINT+"Car/CreateCar";
  //   let params = {"engineId":engineId.toString(),"transmissionId": transmissionId.toString(), "carModelId":carModelId.toString(), "productionYear": productionYear.toDateString(), "vinCode": vinCode}
  //   return this.http.post<SaveUpdateResult<Car>>(createCarUrl, {params:params}).subscribe(data => this.createdCar = data.result).add(catchError(ErrorHandler.handleError('createCar',[])));
  // }

  createCarFromType(carToCreate: Car){
    const createCarUrl = AppSettings.API_ENDPOINT+"Car/CreateCar";
    return this.http.post<SaveUpdateResult<Car>>(createCarUrl, carToCreate).subscribe(data => this.createdCar = data.result).add(catchError(ErrorHandler.handleError('createCar',[])));
  }
}
