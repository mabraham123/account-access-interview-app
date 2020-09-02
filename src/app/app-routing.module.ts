import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ DeviceComponent } from './profile/device/device.component';
import{ PasswordmanagerComponent } from './profile/passwordmanager/passwordmanager.component';

const routes: Routes = [
  {
    path:'devices',
    component: DeviceComponent
  },
  {
    path:'passwordmananger',
    component: PasswordmanagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
