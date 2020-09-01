import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent  implements OnInit{
    @Input() accountgraph;

  // TODO: Move into a constructor
    profileTitle: string= 'Devices';
    profileSlogan: string= 'What devices do you use to access the internet? '
    profileType: string= 'Device'


  tabs: any[] = [];
  name: string;
  newname: string;
  nicknameSet: boolean;
  exists: boolean;

  constructor(){
    this.name= this.profileType;
    this.newname="";
    this.nicknameSet= false;
    this.exists=false;
  }

  ngOnInit(): void {
  }

  /**
  * Method to add a tab from the array of tabs
  **/
  addTab() {
    let potentialKey=this.profileType+": "+this.name;
    let number:number =1;
    while(this.accountgraph.hasOwnProperty(potentialKey)===true) {
      console.log("got here")
      potentialKey=this.profileType+": "+this.name+number;
      number++
    }

    //Create item
    this.accountgraph[potentialKey]={
      name:this.name,
      type: this.profileType,
      incoming:[]
    }

    this.tabs.push(potentialKey);

    console.log(this.accountgraph);
    console.log(this.tabs);


    // let potentialKey=this.profileType+this.name;
    //
    // //Check if name exists
    // if(!(this.accountgraph.hasOwnProperty(potentialKey))){
    //   //Does not exist in hashtable
    //   //Create Item
    //   this.accountgraph[potentialKey]={
    //     name: this.name,
    //     type: this.profileType,
    //     incoming: []
    //   }
    //
    //   //Save key in array
    //   this.tabs.push(potentialKey);
    // }else{
    //   this.exists= true;
    // }
    //
    // console.log(this.tabs);
    // console.log(this.accountgraph);

  }

  updateObject(data){
    // console.log("this is the one:");
    // console.log(data);
    // this.tabs[data.index]=data.update;
    // console.log("this is the too:");
    // console.log(this.tabs);

    this.accountgraph[data.key].incoming=data.update;
    console.log(this.accountgraph);
  }


createNewKey(data){
  //check if new key needs to be created
  let potentialKey=data.type+": "+data.nickname;
  if(!(this.accountgraph.hasOwnProperty(potentialKey))){
    //create new entry
    this.accountgraph[potentialKey]={
      name:data.nickname,
      type:data.type,
      incoming:[]
    }
  }
}

  /**
  * Method to remove a tab from the array of tabs
  * Params:
  * index: int- The index of the device to be removed from the tabbing array
  **/
  removeTab(index: number) {
    //splice(indexToRemove,How many things need removed)

    delete this.accountgraph[this.tabs[index]];

    this.tabs.splice(index, 1);

    console.log(this.tabs);
    console.log(this.accountgraph);

  }


/**
* Method to update the name of the tabbing system
* Params:
* name:string- The new name of the tab
* index: int- The index of the device to be renamed in the tabbing array
**/
  updateName(name1, index: number){
//     this.nicknameSet=true;
// //Set the index of the tabs array to the nickname of the device
//     this.accountgraph[this.tabs[index]].name= name1.newname;
    let potentialKey=this.profileType+": "+name1.newname;
    let oldKey=this.tabs[index];
    //Check if name is valid
    if (this.accountgraph.hasOwnProperty(potentialKey)===false) {
      //Swap the elements
      this.accountgraph[potentialKey]=this.accountgraph[oldKey];
      //Delete old one
      delete this.accountgraph[oldKey];

      //update name
      this.accountgraph[potentialKey].name=name1.newname;

      //Swap in array
      this.tabs[index]=potentialKey;
      this.nicknameSet=true;

      console.log(this.accountgraph);
      console.log(this.tabs);
    }else{
      alert("Error: Look like you have already used that one, try another nickname");
    }




  // let potentialKey=this.profileType+name1;
  //
  // if(!(this.accountgraph.hasOwnProperty(potentialKey))){
  //   let oldname=this.profileType+this.name
  //   //Does not exist in hashtable
  //   this.accountgraph[potentialKey]=this.accountgraph[oldname]
  //   delete this.accountgraph[oldname];
  //   //Save key in array
  //   this.tabs.push(potentialKey);
  // }else{
  //   alert("Choose a new name");
  // }
}
}
