import { Injectable } from '@angular/core';
import { AppSettings } from "src/app/AppSettings";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Advertisement } from 'src/app/Models/advertisement';
import { AdvertisementView } from 'src/app/Models/advertisementView';
import { SaveUpdateResult } from "src/app/Models/saveUpdateResult"
import { ListDto } from 'src/app/Models/listDto';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }

  createdAdvertisement: Advertisement = new Advertisement();

  createAdvertisement(advertisement: Advertisement){
    const createAdvertisementUrl = AppSettings.API_ENDPOINT+"Advertisement/CreateAdvertisement";
    return this.http.post<SaveUpdateResult<Advertisement>>(createAdvertisementUrl, advertisement).subscribe(data => this.createdAdvertisement = data.result);
  }

  getAdvertisementsPaged(offset: number, pageSize: number): Observable<ListDto<AdvertisementView>>{
    const getAdverticementsUrl = AppSettings.API_ENDPOINT+"Advertisement/GetAdvertisementsPaged";
    let params = {"offset": offset.toString(), "pageSize": pageSize.toString()};
    return this.http.get<ListDto<AdvertisementView>>(getAdverticementsUrl, {params: params});
  }
}
