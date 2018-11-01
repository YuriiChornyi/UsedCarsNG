import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAdvertisementComponent } from './new-advertisement/new-advertisement.component';
import { ViewAdvertisementComponent } from './view-advertisement/view-advertisement.component';

const routes: Routes = [
  { path: 'add-advertisement', component: NewAdvertisementComponent },
  { path: 'view-advertisement', component: ViewAdvertisementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
