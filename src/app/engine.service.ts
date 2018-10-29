import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  RequestOptions, RequestMethod, Headers  } from '@angular/http';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"
import { EngineTypeModel } from 'src/app/Models/engineType';
import { Engine } from 'src/app/Models/engine';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(private http: HttpClient) { }

  createdEngine:Engine = new Engine();

  getEngines():Observable<Engine[]>{
    const getEngineTypesUrl= AppSettings.API_ENDPOINT+"Engine/GetEngines";
    return this.http.get<Engine[]>(getEngineTypesUrl).pipe(catchError(ErrorHandler.handleError('getEngines',[])));
  }

  createEngineFromType(engineToCreate: Engine){
    const createEngineUrl = AppSettings.API_ENDPOINT+ "Engine/CreateEngine";
    return this.http.post<SaveUpdateResult<Engine>>(createEngineUrl, engineToCreate).subscribe(data=>this.createdEngine = data.result).add(catchError(ErrorHandler.handleError('createEngine',[])));
  }
}
