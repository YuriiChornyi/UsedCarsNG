// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-new-advertisement',
//   templateUrl: './new-advertisement.component.html',
//   styleUrls: ['./new-advertisement.component.css']
// })
// export class NewAdvertisementComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-new-advertisement',
  templateUrl: './new-advertisement.component.html',
  styleUrls: ['./new-advertisement.component.css']
})
export class NewAdvertisementComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}