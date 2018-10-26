import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Manufacturer } from 'src/app/Models/manufacturer';
import { ManufacturerModels } from 'src/app/Models/manufacturerModels';
import { EngineType } from 'src/app/Models/engineType';
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
  selectedManufacturer:Manufacturer = new Manufacturer();
  selectedModel:ManufacturerModels = new ManufacturerModels();
  selectedEngine:Engine = new Engine(); 
  selectedTransmission: Transmission = new Transmission();
  selectedCar: Car = new Car();
  selectedAdvertisement: Advertisement = new Advertisement();

  public createdAdvGuid: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  

  engineGroupControl: FormGroup;
  gearboxAndTransmissionGroupControl: FormGroup;
  yearAndVinCodeGroupControl: FormGroup;
  descrAndPriceGroupControl: FormGroup;

  manufacturerControl: FormControl;
  modelControl: FormControl;
  engineTypesControl: FormControl;
  engineValueControl: FormControl;
  engineHpControl: FormControl;
  gearBoxControl: FormControl;
  transmissionControl: FormControl;
  productionYearControl: FormControl;
  vinCodeControl: FormControl;
  priceControl: FormControl;
  descriptionControl: FormControl;

  manufacturersList: Observable<Manufacturer[]>;
  manufacturerModels: Observable<ManufacturerModels[]>;
  engineTypes: Observable<EngineType[]>;
  gearBoxTypes: Observable<GearBoxType[]>;
  transmissionTypes: Observable<TransmissionType[]>;


  constructor(private _formBuilder: FormBuilder, private manufacturerService: ManufacturerService, private engineService: EngineService, private transmissionService: TransmissionService, private carService: CarService, private advertisementService: AdvertisementService) {}

  ngOnInit() {
    this.manufacturersList=this.manufacturerService.getManufacturers();

    this.manufacturerControl = new FormControl('', [Validators.required]);
    this.modelControl = new FormControl('', [Validators.required]);
    this.engineTypesControl = new FormControl('', [Validators.required]);
    this.engineValueControl = new FormControl('', [Validators.required]);
    this.engineHpControl = new FormControl('', [Validators.required]);
    this.gearBoxControl = new FormControl('', [Validators.required]);
    this.transmissionControl = new FormControl('', [Validators.required]);
    this.productionYearControl = new FormControl('', [Validators.required]);
    this.vinCodeControl = new FormControl('', [Validators.required]);
    this.priceControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl();

    this.firstFormGroup = this._formBuilder.group({
      manufacturerControl: this.manufacturerControl });

    this.secondFormGroup = this._formBuilder.group({
      modelControl:this.modelControl});

    this.engineGroupControl= new FormGroup({
        engineTypesControl: this.engineTypesControl,
        engineValueControl:this.engineValueControl,
        engineHpControl: this.engineHpControl
     });

    this.thirdFormGroup = this._formBuilder.group({
      engineGroupControl:this.engineGroupControl
    })

    this.gearboxAndTransmissionGroupControl= new FormGroup({
      gearBoxControl:this.gearBoxControl,
      transmissionControl:this.transmissionControl
    });

    this.fourthFormGroup = this._formBuilder.group({
      gearboxAndTransmissionGroupControl:this.gearboxAndTransmissionGroupControl
    });

    this.yearAndVinCodeGroupControl= new FormGroup({
      productionYearControl:this.productionYearControl,
      vinCodeControl:this.vinCodeControl
    });

    this.fifthFormGroup = this._formBuilder.group({
      yearAndVinCodeGroupControl:this.yearAndVinCodeGroupControl
    });

    this.descrAndPriceGroupControl= new FormGroup({
      priceControl: this.priceControl,
      descriptionControl: this.descriptionControl
    });

    this.sixthFormGroup = this._formBuilder.group({
      descrAndPriceGroupControl:this.descrAndPriceGroupControl
    });

  }

  loadModels(manufacturerId:number, manufacturerName:string){
    this.selectedManufacturer.manufacturerId = manufacturerId;
    this.selectedManufacturer.manufacturerName = manufacturerName;
    this.manufacturerModels = this.manufacturerService.getManufacturerModels(this.selectedManufacturer.manufacturerId);
  }

  loadEngineType(modelId:number, modelName:string){
    this.selectedModel.carModelId = modelId;
    this.selectedModel.carModelName = modelName;
    this.selectedModel.manufacturer = this.selectedManufacturer;
    
    this.engineTypes = this.engineService.getEngineTypes();
  }

  loadGearBoxAndTransmissionTypes(engineTypeId: number, engineType: string, engineValue: string, engineHp: number){
    console.log(engineTypeId);
    console.log(engineType);
    console.log(engineValue);
    console.log(engineHp);

    this.engineService.createEngine(engineTypeId, engineValue, engineHp);
    this.selectedEngine = this.engineService.createdEngine;

    this.gearBoxTypes = this.transmissionService.getGearBoxTypes();
    this.transmissionTypes = this.transmissionService.getTransmissionTypes();
  }

  loadCarDetails(gearBoxTypeId: number, gearBoxType: string, transmissionId: number, transmissionType: string){
    this.transmissionService.createTransmission(gearBoxTypeId,transmissionId);
    console.log("load car details");
    console.log(gearBoxTypeId);
    console.log(gearBoxType);
    console.log(transmissionId);
    console.log(transmissionType);
    console.log("load car details");

    this.selectedTransmission = this.transmissionService.createdTransmission;
  }

  loadAdvertisementDetails(dp:Date, vinCode: string){
    this.carService.createCar(this.selectedEngine.engineId, this.selectedTransmission.transmissionId, this.selectedModel.carModelId, dp, vinCode);
    console.log(dp);
    console.log(vinCode);
    this.selectedCar=this.carService.createdCar;
  }

  createAdvertisement(price: number, description: string){
    
    let advertisement = new Advertisement();

    advertisement.carId = this.selectedCar.carId;
    advertisement.userId = Guid.parse("43d7bb9f-157a-430b-b3b9-08d639a81cdd");
    advertisement.description = description;
    advertisement.price=price;

    this.advertisementService.createAdverticement(advertisement);
    this.selectedAdvertisement = this.advertisementService.createdAdvertisement;
    this.createdAdvGuid = this.selectedAdvertisement.advertisementId.toString();
    console.log(price);
    console.log(description);
  }
}

