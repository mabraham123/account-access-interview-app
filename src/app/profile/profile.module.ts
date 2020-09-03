import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeviceComponent } from './device/device.component';
import { PasswordmanagerComponent } from './passwordmanager/passwordmanager.component';


import { LoginMethodsComponent } from '../component/login-methods/login-methods.component';
import { ModalComponent } from '../component/modal/modal.component';
import { OpensessionsComponent } from '../component/opensessions/opensessions.component';
// import { NotesComponent } from '../component/notes/notes.component';


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
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
  MatRadioModule,
  MatTooltipModule,
  MatSidenavModule,
  MatAutocompleteModule
];


@NgModule({
  declarations: [DeviceComponent, LoginMethodsComponent, ModalComponent, PasswordmanagerComponent,OpensessionsComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponents
  ],
  exports:[
    DeviceComponent,
    PasswordmanagerComponent
  ]
})

export class ProfileModule {

}
