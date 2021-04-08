import { DashboardComponent } from './UI/dashboard/dashboard.component';
import { HomeComponent } from './UI/home/home.component';
import { MatAddressFormComponent } from './UI/mat-address-form/mat-address-form.component';
import { TestNgMatComponent } from './UI/testNgMat/testNgMat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{path:'home',component:HomeComponent,children: [
  {path: 'addressForm', component: MatAddressFormComponent, outlet: 'side'}
]},
{path:'',component:MatAddressFormComponent,pathMatch:'full',
},
{path:'testNgMat',component:TestNgMatComponent},
{path:'matAddressForm',component:MatAddressFormComponent},
{path:'dashboard',component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
