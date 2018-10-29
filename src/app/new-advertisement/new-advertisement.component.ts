import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


import { Manufacturer } from 'src/app/Models/manufacturer';
import { ManufacturerModel } from 'src/app/Models/manufacturerModels';
import { EngineTypeModel } from 'src/app/Models/engineType';
import { Engine } from 'src/app/Models/engine';
import { GearBoxType } from 'src/app/Models/gearBoxType';
import { TransmissionType } from 'src/app/Models/transmissionType';
import { Transmission } from 'src/app/Models/transmission';
import { Car } from 'src/app/Models/car';
import { Advertisement } from 'src/app/Models/advertisement';


import { ManufacturerService } from 'src/app/manufacturer.service';
import { EngineService } from 'src/app/engine.service';
import { TransmissionService } from 'src/app/transmission.service';
import { CarService } from 'src/app/car.service';
import { AdvertisementService } from 'src/app/advertisement.service';
import { Guid } from 'guid-typescript/dist/guid';

@Component({
  selector: 'app-new-advertisement',
  templateUrl: './new-advertisement.component.html',
  styleUrls: ['./new-advertisement.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {showError: true},  
  }]
})

export class NewAdvertisementComponent implements OnInit {
  selectedManufactererModel: ManufacturerModel = new ManufacturerModel();
  selectedCar: Car = new Car();
  selectedAdvertisement: Advertisement = new Advertisement();

  public createdAdvGuid: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  
  yearAndVinCodeGroupControl: FormGroup;
  descrAndPriceGroupControl: FormGroup;

  manufacturerControl: FormControl;
  modelControl: FormControl;
  enginesControl: FormControl;
  transmissionControl: FormControl;
  productionYearControl: FormControl;
  vinCodeControl: FormControl;
  priceControl: FormControl;
  descriptionControl: FormControl;

  manufacturersList: Observable<Manufacturer[]>;
  manufacturerModels: Observable<ManufacturerModel[]>;
  engines: Observable<Engine[]>;
  transmissions: Observable<Transmission[]>;

  constructor(private _formBuilder: FormBuilder, private manufacturerService: ManufacturerService, private engineService: EngineService, private transmissionService: TransmissionService, private carService: CarService, private advertisementService: AdvertisementService) {}

  ngOnInit() {
    this.manufacturersList=this.manufacturerService.getManufacturers();

    this.manufacturerControl = new FormControl('', [Validators.required]);
    this.modelControl = new FormControl('', [Validators.required]);
    this.enginesControl = new FormControl('', [Validators.required]);
    this.transmissionControl = new FormControl('', [Validators.required]);
    this.productionYearControl = new FormControl('', [Validators.required]);
    this.vinCodeControl = new FormControl('', [Validators.required]);
    this.priceControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl();

    this.firstFormGroup = this._formBuilder.group({
      manufacturerControl: this.manufacturerControl });

    this.secondFormGroup = this._formBuilder.group({
      modelControl :this.modelControl});

    this.thirdFormGroup = this._formBuilder.group({
      enginesControl: this.enginesControl});

    this.fourthFormGroup = this._formBuilder.group({
      transmissionControl:this.transmissionControl});

    this.yearAndVinCodeGroupControl= new FormGroup({
      productionYearControl:this.productionYearControl,
      vinCodeControl:this.vinCodeControl});

    this.fifthFormGroup = this._formBuilder.group({
      yearAndVinCodeGroupControl:this.yearAndVinCodeGroupControl});

    this.descrAndPriceGroupControl= new FormGroup({
      priceControl: this.priceControl,
      descriptionControl: this.descriptionControl});

    this.sixthFormGroup = this._formBuilder.group({
      descrAndPriceGroupControl:this.descrAndPriceGroupControl});

  }

  loadModels(manufacturerId:number){
    this.manufacturerModels = this.manufacturerService.getManufacturerModels(manufacturerId);
  }

  loadEngines(modelId:number){
    this.selectedCar.carModelModel = new ManufacturerModel();
    this.selectedCar.carModelModel.carModelId = modelId;
    this.engines = this.engineService.getEngines();
  }

  loadTransmissions(engineId: number){
    this.selectedCar.engine = new Engine();
    this.selectedCar.engine.engineId = engineId;
    this.transmissions = this.transmissionService.getTransmissions();
  }

  loadCarDetails(transmissionId: number){
    console.log(transmissionId);
    this.selectedCar.transmission = new Transmission();
    this.selectedCar.transmission.transmissionId = transmissionId;
  }

  loadAdvertisementDetails(dp:Date, vinCode: string){
    this.selectedCar.productionYear = dp;
    this.selectedCar.vinCode = vinCode;

    this.carService.createCarFromType(this.selectedCar);
  }

  createAdvertisement(price: number, description: string){
    this.selectedCar = this.carService.createdCar;
    console.log(this.carService.createdCar.carId);

    let advertisement = new Advertisement();
    advertisement.carId = this.selectedCar.carId;
    advertisement.userId = Guid.parse("43d7bb9f-157a-430b-b3b9-08d639a81cdd");
    advertisement.description = description;
    advertisement.price=price;

    this.advertisementService.createAdvertisement(advertisement);
    this.selectedAdvertisement = this.advertisementService.createdAdvertisement;
    this.createdAdvGuid = this.selectedAdvertisement.advertisementId;
  }
}

