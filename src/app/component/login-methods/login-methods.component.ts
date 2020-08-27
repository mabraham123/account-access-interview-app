import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'app-login-methods',
  templateUrl: './login-methods.component.html',
  styleUrls: ['./login-methods.component.scss']
})
export class LoginMethodsComponent implements OnInit{

  @Input() deviceObject;
  @Input() deviceIndex;
  constructor(){
  }

  @Output() updateObject: EventEmitter<any>= new EventEmitter()
  options: any[] = [];
  full: boolean= false;
  recovery: boolean=false;

  ngOnInit(): void {
    this.options=this.deviceObject.incoming;

    //
    // if (this.deviceObject.incoming.length<1) {
    //   this.deviceObject.incoming=this.options;
    // }else{
    //   this.full=true;
    // }
  }

  updateParentObjectArray(){
    //replace the incoming array of the temp devices object with the options array
    this.deviceObject.incoming=this.options;

    let updatedObject={
      update: this.deviceObject,
      index: this.deviceIndex
    }

    this.updateObject.emit(updatedObject);
  }

  //this.deviceObject.incoming=this.options;


  checked=false;


  CreateOption(){
    this.options.push({
      name: "Option "+(this.options.length+1),
      recovery: false,
      needed: []
    });

    //Send the final device object with parent array index to the replaced in the parent array of devices
    this.updateParentObjectArray();
  }


  /**
  * Method to remove a tab from the array of tabs
  * Params:
  * index: int- The index of the device to be removed from the tabbing array
  **/
  removeTab(index: number) {
    //splice(indexToRemove,How many things need removed)
    this.options.splice(index, 1);

    //Rename the rest of the options with the correct numbers
    //Start from index that was deleted and work up as the ones prevoius are correct
    for (let counter = index; counter < this.options.length; counter++) {
      this.options[counter].name= "Option "+(counter+1)
    }

    //Send the final device object with parent array index to the replaced in the parent array of devices
    this.updateParentObjectArray();
  }

  setRecovery(completed: boolean,index: number) {
    // console.log(completed);
    // console.log(index);
    this.options[index].recovery=completed;
    //Send the final device object with parent array index to the replaced in the parent array of devices
    this.updateParentObjectArray();

  }




}
