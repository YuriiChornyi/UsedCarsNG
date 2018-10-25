import { Injectable } from '@angular/core';
import { Manufacturer } from 'src/app/Models/manufacturer';
import { ManufacturerModels } from 'src/app/Models/manufacturerModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor( private http: HttpClient) { }

  private Url="https://localhost:5001";

  getManufacturers():Observable<Manufacturer[]>{
    const getManufacturersUrl= this.Url+"/Manufacturer/GetManufacturers";
    return this.http.get<Manufacturer[]>(getManufacturersUrl).pipe(catchError(this.handleError('getManufacturers',[])));
  }

  getManufacturerModels(manufacturerId:number):Observable<ManufacturerModels[]>{
    const getManufacturerModelsUrl = this.Url+"/Manufacturer/GetManufacturerModels/";
    let param = {"manufacturerId": manufacturerId.toString()};
    return this.http.get<ManufacturerModels[]>(getManufacturerModelsUrl,{params:param}).pipe(catchError(this.handleError('getManufacturerModels',[])));
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
