import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMethodsComponent } from './login-methods/login-methods.component';
import { ModalComponent } from './modal/modal.component';
import { NotesComponent } from './notes/notes.component';



@NgModule({
  declarations: [LoginMethodsComponent, ModalComponent, NotesComponent],
  entryComponents:[ModalComponent],
  imports: [
    CommonModule
  ]
})

export class ComponentModule { }
