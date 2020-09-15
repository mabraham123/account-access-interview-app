import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


const MaterialComponents=[
  MatButtonModule,
  MatGridListModule,
  MatTabsModule,
  MatSliderModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
