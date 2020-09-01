import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  input: string="";
  type: string="";

  close(): void {


    if (this.input==="") {
      this.dialogRef.close();
    }else{
      let sendBack={
        nickname:this.input,
        type:this.type,
      }
      this.dialogRef.close(sendBack);
    }
  }
}
