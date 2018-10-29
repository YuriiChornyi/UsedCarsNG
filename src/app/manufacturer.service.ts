import { Injectable } from '@angular/core';
import { Manufacturer } from 'src/app/Models/manufacturer';
import { ManufacturerModel } from 'src/app/Models/manufacturerModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) { }

  getManufacturers():Observable<Manufacturer[]>{
    const getManufacturersUrl= AppSettings.API_ENDPOINT+"Manufacturer/GetManufacturers";
    return this.http.get<Manufacturer[]>(getManufacturersUrl).pipe(catchError(ErrorHandler.handleError('getManufacturers',[])));
  }

  getManufacturerModels(manufacturerId:number):Observable<ManufacturerModel[]>{
    const getManufacturerModelsUrl = AppSettings.API_ENDPOINT+"Manufacturer/GetManufacturerModels/";
    let param = {"manufacturerId": manufacturerId.toString()};
    return this.http.get<ManufacturerModel[]>(getManufacturerModelsUrl, {params:param}).pipe(catchError(ErrorHandler.handleError('getManufacturerModels',[])));
  }
}
