import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAdvertisementComponent } from './new-advertisement/new-advertisement.component';

const routes: Routes = [
  { path: 'add-advertisement', component: NewAdvertisementComponent }
  // ,{ path: 'advertisement/:id',      component: HeroDetailComponent },
  // {
  //   path: 'advertisements',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
