import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';

import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-opensessions',
  templateUrl: './opensessions.component.html',
  styleUrls: ['./opensessions.component.scss']
})
export class OpensessionsComponent implements OnInit {


 @Input() key;
 @Input() OriginalOpenSessions;
 @Output() updateObjectOpenSessions: EventEmitter<any>= new EventEmitter()
 @Output() createNewKey: EventEmitter<any>= new EventEmitter()


 private dialogRef: MatDialogRef<ModalComponent>


 
 constructor(public dialog: MatDialog) {

  }

tip: string="Being logged in somewhere permantly";
sessions: any[] = [];

  


  ngOnInit(): void {
    this.sessions=this.OriginalOpenSessions;
  }

  updateParentObjectArray(){
    //replace the incoming array of the temp devices object with the options array
    this.OriginalOpenSessions=this.sessions;

    let updatedObject={
      update: this.OriginalOpenSessions,
      key: this.key
    }

    this.updateObjectOpenSessions.emit(updatedObject);
  }

  sendSingaltoCreateNewKey(data){

    this.createNewKey.emit(data);
  }


  onCreate(){
    this.dialogRef = this.dialog.open(ModalComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      //Check if not empty
      if (result !== null && result !== undefined) {
        //Wrap result in an object to add to the needed array
        console.log("Good");
        
        let name=result.type+": "+result.nickname;
        console.log(name);
        this.sessions.push(name);
        console.log(this.sessions);

        this.updateParentObjectArray();
        this.sendSingaltoCreateNewKey(result);
      }
    });
  }

  removeLoginItemNeeded(indexOfOption: number){
    this.sessions.splice(indexOfOption, 1);
    //Send the final device object with parent array index to the replaced in the parent array of devices
    this.updateParentObjectArray();
  }

}
