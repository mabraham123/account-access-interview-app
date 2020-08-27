import { Component} from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent{
  // TODO: Move into a constructor
    profileTitle: string= 'Devices';
    profileSlogan: string= 'What devices do you use to access the internet? '
    profileType: string= 'Device'

  tabs: any[] = [
  ];
  name: string;
  newname: string;
  nicknameSet: boolean;


  constructor(){
    this.name= this.profileType;
    this.newname="";
    this.nicknameSet= false;
  }

  /**
  * Method to add a tab from the array of tabs
  **/
  addTab() {
    this.tabs.push({
      name: this.name,
      type: this.profileType,
      incoming: []
    });

  }

  updateObject(data){
    // console.log("this is the one:");
    // console.log(data);
    this.tabs[data.index]=data.update;
    // console.log("this is the too:");
    console.log(this.tabs);

  }


  /**
  * Method to remove a tab from the array of tabs
  * Params:
  * index: int- The index of the device to be removed from the tabbing array
  **/
  removeTab(index: number) {
    //splice(indexToRemove,How many things need removed)
    this.tabs.splice(index, 1);
  }


/**
* Method to update the name of the tabbing system
* Params:
* name:string- The new name of the tab
* index: int- The index of the device to be renamed in the tabbing array
**/
  updateName(name1, index: number){
    this.nicknameSet=true;
//Set the index of the tabs array to the nickname of the device
    this.tabs[index].name= name1.newname;
  }




}
