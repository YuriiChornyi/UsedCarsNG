import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "src/app/AppSettings";
import { ErrorHandler } from "src/app/errorHandler";
import { catchError } from 'rxjs/operators';

import { Advertisement } from 'src/app/Models/advertisement';
import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }

  createdAdvertisement: Advertisement = new Advertisement();

  createAdvertisement(advertisement: Advertisement){
    const createAdverticementUrl = AppSettings.API_ENDPOINT+"Advertisement/CreateAdvertisement";
    return this.http.post<SaveUpdateResult<Advertisement>>(createAdverticementUrl, advertisement).subscribe(data => this.createdAdvertisement = data.result).add(catchError(ErrorHandler.handleError('createAdvertisement',[])));
  }
}
