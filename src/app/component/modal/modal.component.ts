import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  input: string="";
  type: string="";
  typeOptions: string[]= ['Email','Password','App','Device','Biometric', 'Object', 'Other'];
  inputOptions: string[]=[];

  myControl= new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(){
    this.updateTypeArray();

    

    this.filteredOptions= this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    

    


  }

  loadNamesOfTypeSelected(){
    this.inputOptions=this.findInHashtable("type",this.type,"name");
    console.log("blueredgreen");
    console.log(this.inputOptions);
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

  /**
  * Method to find all the items in the hashtable based on a field
  * Params:
  * feild: string- The specific feild the user wants search through in the hashtable
  * tofind: string- The specific thing the user wants to find in the search of the hashtable
  * savefield: string- the feild you want the save
  * Retruns:
  * string[]: An array of the savefield values of the keys that match the search 
  **/
  findInHashtable(feild: string, tofind: string, savefield: string): string[]{
    var found: string[]=[];
    //Itterate through the hashtable
    for(let v in this.data.accountgraph){
    //Check the type of the entry
     if(this.data.accountgraph[v][feild]==tofind){ 
        //Add the wanted value to the array
        found.push(this.data.accountgraph[v][savefield]);
      }
    }
    return found
    }


    /**
    * Method that updates the array holding the data types automattically 
    * based on the types already created.
    **/
    updateTypeArray(){
      //Itterate throught hashtable
       for(let v in this.data.accountgraph){
        //Check if type is in the type array
        if((this.typeOptions.indexOf(this.data.accountgraph[v].type))<0){
         //If it is not in the array add it
         this.typeOptions.push(this.data.accountgraph[v].type);
        }
       }
      }
      


}
