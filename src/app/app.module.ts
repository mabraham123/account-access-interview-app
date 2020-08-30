import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module';
import { ProfileModule } from "./profile/profile.module";
import { ModalComponent } from "./component/modal/modal.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents:[ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ProfileModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
