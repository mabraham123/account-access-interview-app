import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  input: string="";
  type: string="";
  typeOptions: string[]= ['Email','Password','App','Device','Biometric', 'Object', 'Other'];

  myControl= new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(){
    this.filteredOptions= this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[]{
    const filterValue = value.toLocaleLowerCase();
    return this.typeOptions.filter(option =>option.toLocaleLowerCase().startsWith(filterValue));
  }

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
