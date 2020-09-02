import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DeviceComponent } from './device/device.component';
import { NicknameComponent } from '../component/nickname/nickname.component';
import { LoginMethodsComponent } from '../component/login-methods/login-methods.component';
import { ModalComponent } from '../component/modal/modal.component';
// import { NotesComponent } from '../component/notes/notes.component';
import { PasswordmanagerComponent } from './passwordmanager/passwordmanager.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from  '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';


const MaterialComponents=[
  MatButtonModule,
  MatGridListModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatRadioModule
];


@NgModule({
  declarations: [DeviceComponent, NicknameComponent, LoginMethodsComponent, ModalComponent, PasswordmanagerComponent],
  entryComponents: [ModalComponent],
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
