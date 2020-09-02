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

  getAccountgraph(data){
    console.log("Main hashtable updated");
    this.accountgraph=data.accountgraph;
    console.log(this.accountgraph);

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


}
