import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'account-access-interview-app';
  accountgraph={};

  getAccountgraph(data){
    console.log("Main hashtable updated");
    this.accountgraph=data;
    console.log(this.accountgraph);
  }


}
