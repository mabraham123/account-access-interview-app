import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  @Input() accountgraph;
  @Input() tabs;
  @Output() getAccountgraph: EventEmitter<any>= new EventEmitter()
  @Output() getOtherKeys: EventEmitter<any>= new EventEmitter()

  profileTitle: string= 'Other';
  profileSlogan: string= 'Are there any more things you feel we have missed? '
  profileType: string= 'Other'


//tabs: any[] = [];
//notes: any[]= [];
name: string;
newname: string;
nicknameSet: boolean;
exists: boolean;
NumberofNotes: number;
remove: boolean;
opened: boolean;
DynamicallyCreatedKeys: any[]= [];

//NoteNumber: number;
//private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver
constructor(){
  this.name= this.profileType;
  this.newname="";
  this.nicknameSet= false;
  this.exists=false;
  this.NumberofNotes=0;
  this.remove=false;
  this.opened=false;
  //this.NoteNumber=0;
}

ngOnInit(): void {
  console.log(this.tabs)
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
    opensessions:[],
    incoming:[]
  }

  this.tabs.push(potentialKey);

  console.log(this.accountgraph);
  console.log(this.tabs);



}

updateObject(data){
  this.accountgraph[data.key].incoming=data.update;
  console.log(this.accountgraph);
}

updateObjectOpenSessions(data){
  this.accountgraph[data.key].opensessions=data.update;
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
    opensessions:[],
    incoming:[]
  }

  this.DynamicallyCreatedKeys.push({
    type: data.type,
    key: data.nickname
  });

  console.log(this.DynamicallyCreatedKeys);


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

  let idx:number=0;

      for(let v in this.accountgraph){
        for(let k in this.accountgraph[v].incoming){
          for(let y in this.accountgraph[v].incoming[k].needed){
            idx= this.accountgraph[v].incoming[k].needed[y].indexOf(this.tabs[index]);

            if(idx>-1){
              this.accountgraph[v].incoming[k].needed.splice(idx, 1);
            }
          }
        }
      }

      for(let a in this.accountgraph){
        for(let b in this.accountgraph[a].opensessions){
          idx=this.accountgraph[a].opensessions[b].indexOf(this.tabs[index]);

          if(idx>-1){
            this.accountgraph[a].opensessions.splice(idx, 1);
          }
        }
      }

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

    let idx:number=0;

    for(let v in this.accountgraph){
      for(let k in this.accountgraph[v].incoming){
        for(let y in this.accountgraph[v].incoming[k].needed){
          idx= this.accountgraph[v].incoming[k].needed[y].indexOf(oldKey);

          if(idx>-1){
            this.accountgraph[v].incoming[k].needed[idx]=potentialKey;
          }
        }
      }
    }

    for(let a in this.accountgraph){
      for(let b in this.accountgraph[a].opensessions){
        idx=this.accountgraph[a].opensessions[b].indexOf(oldKey);

        if(idx>-1){
          this.accountgraph[a].opensessions[b]=potentialKey;
        }
      }
    }


    console.log(this.accountgraph);
    console.log(this.tabs);
  }else{
    alert("Error: Look like you have already used that one, try another nickname");
  }
}

prepareToChangePage(pageCode: number){
this.getAccountgraph.emit({
  changePageTo: pageCode,
  accountgraph:this.accountgraph,
  needToCreate: this.DynamicallyCreatedKeys
});

this.getOtherKeys.emit(this.tabs);
}

//Add note as a field of the object
updateNote(data){
  this.accountgraph[data.key].note=data.info;
}


scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}

}
