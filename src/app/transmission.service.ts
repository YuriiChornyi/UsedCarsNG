import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GearBoxType } from "src/app/Models/gearBoxType";
import { TransmissionType } from "src/app/Models/transmissionType";
import { Transmission } from "src/app/Models/transmission";
import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  constructor(private http: HttpClient) { }

  createdTransmission: Transmission = new Transmission();

  getTransmissions():Observable<Transmission[]>{
    const getTransmissionTypesUrl= AppSettings.API_ENDPOINT+"Transmission/GetTransmissions";
    return this.http.get<Transmission[]>(getTransmissionTypesUrl).pipe(catchError(ErrorHandler.handleError('transmissions',[])));
  }

  getGearBoxTypes():Observable<GearBoxType[]>{
    const getGearBoxTypesUrl= AppSettings.API_ENDPOINT+"Transmission/GetGearBoxTypes";
    return this.http.get<GearBoxType[]>(getGearBoxTypesUrl).pipe(catchError(ErrorHandler.handleError('getGearBoxTypes',[])));
  }

  createTransmission(gearBoxTypeId: number, transmissionTypeId: number){
    const createTransmissionUrl = AppSettings.API_ENDPOINT+ "Engine/CreateEngine";
    let params = {"gearBoxTypeId": gearBoxTypeId.toString(), "transmissionTypeId": transmissionTypeId.toString()};
    return this.http.post<SaveUpdateResult<Transmission>>(createTransmissionUrl, {params:params}).subscribe(data => this.createdTransmission = data.result).add(catchError(ErrorHandler.handleError('createTransmission',[])));
  }
}
