import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { NewAdvertisementComponent } from './new-advertisement/new-advertisement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { EngineToString } from 'src/app/engineToStringPipe';
import { TransmissionToString } from 'src/app/transmissionToStringPipe';
import { ViewAdvertisementComponent } from './view-advertisement/view-advertisement.component';
import { UploadModule } from '@progress/kendo-angular-upload';

@NgModule({
  declarations: [
    AppComponent,
    NewAdvertisementComponent,
    EngineToString,
    TransmissionToString,
    ViewAdvertisementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
