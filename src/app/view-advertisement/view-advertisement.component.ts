import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';

import { AdvertisementService } from 'src/app/advertisement.service';
import { AdvertisementView } from 'src/app/Models/advertisementView';

@Component({
  selector: 'app-view-advertisement',
  templateUrl: './view-advertisement.component.html',
  styleUrls: ['./view-advertisement.component.css']
})
export class ViewAdvertisementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['CarManufacturer', 'CarModel', 'ProductionYear', 'Price', 'VinCode', 'Transmission', 'Engine', 'UserName', 'Email'];
  dataSource = new MatTableDataSource<AdvertisementView>();
  resultsLength = 0;
  isLoadingResults = false;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.advertisementService.getAdvertisementsPaged(0, 3).subscribe(data => {this.dataSource.data = data.items, this.resultsLength = data.count});
    
  }

  getNext(event: PageEvent) {
    let offset = event.pageSize * event.pageIndex
    this.advertisementService.getAdvertisementsPaged(offset, this.paginator.pageSize).subscribe(data => {this.dataSource.data = data.items, this.resultsLength = data.count});
  }
}