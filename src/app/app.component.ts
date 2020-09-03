import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'account-access-interview-app';
  accountgraph={};
  currentPage: number=0;
  devicesKeys: any[] = [];
  passwordmanagerKeys: any[] =[];
  otherKeys: any[] =[];

  getAccountgraph(data){
    console.log("Main hashtable updated");
    this.accountgraph=data.accountgraph;
    console.log(this.accountgraph);
    
    console.log(data)
    for (let index = 0; index < data.needToCreate.length; index++) {
     this.updateKeysRegisters(data.needToCreate[index].type, data.needToCreate[index].key);
      
    }

    this.currentPage=data.changePageTo;
  }


  getDeviceKeys(data){
    console.log("Devices Keys Saved");
    this.devicesKeys=data;
  }

  getPasswordmanagerKeys(data){
    console.log("Password Manager Keys Saved");
    this.passwordmanagerKeys=data;
  }


  updateKeysRegisters(type: string, name: string): void{
    let keyToAdd=type+": "+name;

    switch(type) { 
      case "Device": { 
         this.devicesKeys.push(keyToAdd);
         break; 
      } 
      case "Password Manager": { 
         this.passwordmanagerKeys.push(keyToAdd);
         break; 
      }
      default: { 
         //Add to the other list 
         this.otherKeys.push(keyToAdd);
         break; 
      } 
   } 

  }

}
