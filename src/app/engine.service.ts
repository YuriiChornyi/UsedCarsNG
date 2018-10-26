import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  RequestOptions, RequestMethod, Headers  } from '@angular/http';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"
import { EngineType } from 'src/app/Models/engineType';
import { Engine } from 'src/app/Models/engine';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(private http: HttpClient) { }

  createdEngine:Engine = new Engine();

  getEngineTypes():Observable<EngineType[]>{
    const getEngineTypesUrl= AppSettings.API_ENDPOINT+"Engine/GetEngineTypes";
    return this.http.get<EngineType[]>(getEngineTypesUrl).pipe(catchError(ErrorHandler.handleError('getEngineTypes',[])));
  }

  createEngine(engineTypeId: number,value: string, hp: number){
    const createEngineUrl = AppSettings.API_ENDPOINT+ "Engine/CreateEngine";
    let engine = new Engine();
    engine.engineType=new EngineType();
    engine.engineType.engineTypeId=engineTypeId;
    engine.value=value;
    engine.hp=hp;
    let params = {"engine": JSON.stringify(engine)};
    return this.http.post<SaveUpdateResult<Engine>>(createEngineUrl, {body: params} ).subscribe(data=>this.createdEngine= data.result).add(catchError(ErrorHandler.handleError('createEngine',[])));
  }
}
