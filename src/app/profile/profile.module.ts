import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DeviceComponent } from './device/device.component';
import { NicknameComponent } from '../component/nickname/nickname.component';
import { LoginMethodsComponent } from '../component/login-methods/login-methods.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';

const MaterialComponents=[
  MatButtonModule,
  MatGridListModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule
];


@NgModule({
  declarations: [DeviceComponent, NicknameComponent, LoginMethodsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialComponents
  ],
  exports:[
    DeviceComponent
  ]
})

export class ProfileModule {
  // accountsArray: any=[];
  //
  // public addToAccountsArray(account: Account){
  //   this.accountsArray.push(account);
  // }
  //
  // public getAccountsArray(){
  //   return this.accountsArray;
  // }

}
