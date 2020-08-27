import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicknameComponent } from './nickname/nickname.component';
import { LoginMethodsComponent } from './login-methods/login-methods.component';



@NgModule({
  declarations: [NicknameComponent, LoginMethodsComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentModule { }
