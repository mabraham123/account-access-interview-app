import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';

const MaterialComponents=[
  MatButtonModule,
  MatGridListModule,
  MatTabsModule,
  MatSliderModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
