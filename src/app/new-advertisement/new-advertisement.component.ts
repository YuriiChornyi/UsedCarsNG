import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ManufacturerService } from 'src/app/manufacturer.service';
import { Manufacturer } from 'src/app/Models/manufacturer';
import { Observable, of } from 'rxjs';
import { ManufacturerModels } from 'src/app/Models/manufacturerModels';

@Component({
  selector: 'app-new-advertisement',
  templateUrl: './new-advertisement.component.html',
  styleUrls: ['./new-advertisement.component.css']
})
export class NewAdvertisementComponent implements OnInit {
  selectedManufacturer:Manufacturer=new Manufacturer();
  selectedModel:ManufacturerModels=new ManufacturerModels();
  selectedEngineType:number;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  manufacturerControl:FormControl;
  modelControl:FormControl;
  manufacturersList:Observable<Manufacturer[]>;
  manufacturerModels:Observable<ManufacturerModels[]>;


  constructor(private _formBuilder: FormBuilder, private manufacturerService: ManufacturerService) {}
  selectedValue: string;

  ngOnInit() {
    this.manufacturersList=this.manufacturerService.getManufacturers();
    this.manufacturerControl = new FormControl('', [Validators.required]);
    this.modelControl = new FormControl('', [Validators.required]);
    this.firstFormGroup = this._formBuilder.group({
      manufacturerControl:this.manufacturerControl});
    this.secondFormGroup = this._formBuilder.group({
      modelControl:this.modelControl})    
  }

  loadModels(manufacturerId:number, manufacturerName:string){
    this.selectedManufacturer.manufacturerId = manufacturerId;
    this.selectedManufacturer.manufacturerName = manufacturerName;
    this.manufacturerModels = this.manufacturerService.getManufacturerModels(this.selectedManufacturer.manufacturerId);
  }

  loadEngineType(modelId:number, modelName:string){
    this.selectedModel.carModelId = modelId;

  }
}