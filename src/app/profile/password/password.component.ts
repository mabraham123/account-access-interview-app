import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  
  @Input() accountgraph;
  @Input() tabs;
  @Output() getAccountgraph: EventEmitter<any>= new EventEmitter();
  @Output() getPasswordKeys: EventEmitter<any>= new EventEmitter();

  profileTitle: string= 'Password Summary';
  profileSlogan: string= 'Look over the passwords you mentioned, we need just a little more information';
  profileType: string= 'Password';



name: string;
newname: string;
oldname: string;
nicknameSet: boolean;
exists: boolean;
NumberofNotes: number;
remove: boolean;
opened: boolean;
DynamicallyCreatedKeys: any[]= [];
tip: string;
strengthpickedWeak: boolean;
strengthpickedAvg: boolean;
strengthpickedStrong: boolean;
editing:boolean;
typeOptions: string[];
TypesControl=new FormControl();
filteredOptions: Observable<string[]>;


constructor(){
  this.name= this.profileType;
  this.newname="";
  this.oldname=this.profileType.toLowerCase();
  this.nicknameSet= false;
  this.exists=false;
  this.NumberofNotes=0;
  this.remove=false;
  this.opened=false;
  this.tip="Certain to remain safe and uncompramised";
  this.strengthpickedWeak=false;
  this.strengthpickedAvg=false;
  this.strengthpickedStrong=false;
  this.editing=false;
  this.typeOptions=['Device', 'Password Manager', 'Email', 'Social Media', 'Finance', 'Shopping', 'Entertainment', 'Gaming', 'Other', 'Password'];
  
}

ngOnInit(): void {
  console.log(this.tabs);
  this.filteredOptions = this.TypesControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
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

// updateName(name1, index: number){
//   this.accountgraph[this.tabs[index]].name=name1.newname;
// }



setPasswordStrength(index: number, strengthLevel: string){
  this.accountgraph[this.tabs[index]].strength=strengthLevel;

  switch(strengthLevel) { 
    case 'weak': { 
      this.strengthpickedWeak=true;
      this.strengthpickedAvg=false;
      this.strengthpickedStrong=false;
       break; 
    } 
    case 'average': { 
      this.strengthpickedWeak=false;
      this.strengthpickedAvg=true;
      this.strengthpickedStrong=false;
       break; 
    } 
    case 'strong': { 
      this.strengthpickedWeak=false;
      this.strengthpickedAvg=false;
      this.strengthpickedStrong=true;
      break; 
   } 
   default: { 
    this.strengthpickedWeak=false;
    this.strengthpickedAvg=false;
    this.strengthpickedStrong=false;
    break; 
 } 
 } 

}


prepareToChangePage(pageCode: number){
this.getAccountgraph.emit({
  changePageTo: pageCode,
  accountgraph:this.accountgraph,
  needToCreate: this.DynamicallyCreatedKeys
});

this.getPasswordKeys.emit(this.tabs);
}

//Add note as a field of the object
updateNote(data){
  this.accountgraph[data.key].note=data.info;
}

scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}

startOver(){
  if(confirm("Are you sure you want to start again? Doing so will result in a loss of data.")){
  this.prepareToChangePage(-1);
  }
}

/**
* Method to create a duplicate of an existing index in the hashtable
* Params:
* duplicateName:string- name of the profile needed to be duplicated
* duplicateType: string- By default is the current profiletype but can be set
* Returns:
* string: the key of the new creted duplicate item
**/
CreateDuplicateProfileInHashtable(duplicateName: string,duplicateType=this.profileType): string {
  let potentialKey=duplicateType+": "+duplicateName;
  let number:number =0;
  let entered=false;
  while(this.accountgraph.hasOwnProperty(potentialKey)===true) {
    entered=true;
    number++;
    console.log("got here")
    potentialKey=duplicateType+": "+duplicateName+number;
    
  }

  //Create item
  if(entered){
    this.accountgraph[potentialKey]={
      name:duplicateName+number,
      type: duplicateType,
      ViewWhenLocked:"",
      incoming:[]
    }
  }else{
    this.accountgraph[potentialKey]={
      name:duplicateName,
      type: duplicateType,
      ViewWhenLocked:"",
      incoming:[]

    }
  }

  if(duplicateType==this.profileType){
    this.tabs.push(potentialKey);
  }else{

    if(entered){
      this.DynamicallyCreatedKeys.push({
        type: duplicateType,
        key: duplicateName+number
      });
    }else{
      this.DynamicallyCreatedKeys.push({
        type: duplicateType,
        key: duplicateName
      });
    }
    
    console.log("DynamicKeys:");
    console.log(this.DynamicallyCreatedKeys);
  }

  console.log(this.accountgraph);
  console.log(this.tabs);

  return potentialKey;

}


  duplicateTab(index: number){
    //Create a deep copy of an object from the acctound graph hash table
    var toduplicate= JSON.parse(JSON.stringify(this.accountgraph[this.tabs[index]]));
    
    //Create a key to place the information that will be duplicated
    let key=this.CreateDuplicateProfileInHashtable(toduplicate.name);
    let created=this.accountgraph[key]; 
   
    //Set the correct name
    toduplicate.name=created.name;
    //Set the pointer to the duplicate object
    this.accountgraph[key]=toduplicate;

    console.log(this.accountgraph);
    console.log(this.tabs);
  }

  ChangeProfileType(index: number,newtype: string){
  //Create new key with name and newtype
    let key=this.CreateDuplicateProfileInHashtable(this.accountgraph[this.tabs[index]].name,newtype);
    let created=this.accountgraph[key];
  //With the key deep copy everything from one key to another
    var toduplicate= JSON.parse(JSON.stringify(this.accountgraph[this.tabs[index]]));
  //Set the correct information  
    toduplicate.name=created.name;
    toduplicate.type=created.type;
  //Set the pointer to the correct object
    this.accountgraph[key]=toduplicate;

    let idx:number=0;

    for(let v in this.accountgraph){
      for(let k in this.accountgraph[v].incoming){
        for(let y in this.accountgraph[v].incoming[k].needed){
          idx= this.accountgraph[v].incoming[k].needed[y].indexOf(this.tabs[index]);

          if(idx>-1){
            this.accountgraph[v].incoming[k].needed[idx]=key;
          }
        }
      }
    }

    for(let a in this.accountgraph){
      for(let b in this.accountgraph[a].opensessions){
        idx=this.accountgraph[a].opensessions[b].indexOf(this.tabs[index]);

        if(idx>-1){
          this.accountgraph[a].opensessions[b]=key;
        }
      }
    }

  //Delete the old key
    this.removeTab(index);

    console.log(this.accountgraph);
    console.log(this.tabs);
  
  }

  private _filter(value: string): string[]{
    const filterValue= value.toLowerCase()
    return this.typeOptions.filter(option =>
      option.toLowerCase().startsWith(filterValue));
  }

  /**
    * Method that updates the array holding the data types automattically 
    * based on the types already created.
    **/
   updateTypeArray(){
    //Itterate throught hashtable
     for(let v in this.accountgraph){
      //Check if type is in the type array
      if((this.typeOptions.indexOf(this.accountgraph[v].type))<0){
       //If it is not in the array add it
       this.typeOptions.push(this.accountgraph[v].type);
      }
     }
    }
}
