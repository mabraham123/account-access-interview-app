import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'account-access-interview-app';
  accountgraph={};
  currentPage: number=-1;
  devicesKeys: any[] = [];
  passwordmanagerKeys: any[] =[];
  emailKeys: any[] =[];
  passwordKeys: any[] =[];
  socialmediaKeys: any[] =[];
  financeKeys: any[] =[];
  shoppingKeys: any[] =[];
  entertainmentKeys: any[] = [];
  gamingKeys: any[] = [];
  otherKeys: any[] =[];
  uploaded:boolean= false;
  dontdisplay:boolean=false;
  finalData: string="";
  opened: boolean=false;


  getAccountgraph(data){
    if(data.changePageTo===-1){
      location.reload();
    }else{
      console.log("Main hashtable updated");
      this.accountgraph=data.accountgraph;
      console.log(this.accountgraph);
      
      console.log(data)
      for (let index = 0; index < data.needToCreate.length; index++) {
        this.updateKeysRegisters(data.needToCreate[index].type, data.needToCreate[index].key);
      }
      this.currentPage=data.changePageTo;
    }
  }


  getDeviceKeys(data){
    console.log("Devices Keys Saved");
    this.devicesKeys=data;
  }

  getPasswordmanagerKeys(data){
    console.log("Password Manager Keys Saved");
    this.passwordmanagerKeys=data;
  }

  getEmailKeys(data){
    console.log("Password Manager Keys Saved");
    this.emailKeys=data;
  }

  getPasswordKeys(data){
    console.log("Password Manager Keys Saved");
    this.passwordKeys=data;
  }

  getSocialMediaKeys(data){
    console.log("Social Media Keys Saved");
    this.socialmediaKeys=data;
  }

  getFinanceKeys(data){
    console.log("Finance Keys Saved");
    this.financeKeys=data;
  }

  getShoppingKeys(data){
    console.log("Shopping Keys Saved");
    this.shoppingKeys=data;
  }

  getEntertainmentKeys(data){
    console.log("Entertainment Keys Saved");
    this.entertainmentKeys=data;
  }

  getGamingKeys(data){
    console.log("Gaming Keys Saved");
    this.gamingKeys=data;
  }

  getOtherKeys(data){
    console.log("Other Keys Saved");
    this.otherKeys=data;
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
      case "Email": { 
        this.emailKeys.push(keyToAdd);
        break; 
      }
      case "Social Media": { 
        this.socialmediaKeys.push(keyToAdd);
        break; 
        }
        case "Finance": { 
          this.financeKeys.push(keyToAdd);
          break; 
        }
        case "Shopping": { 
          this.shoppingKeys.push(keyToAdd);
          break; 
        }
        case "Entertainment": { 
          this.entertainmentKeys.push(keyToAdd);
          break; 
        }
        case "Gaming": { 
          this.gamingKeys.push(keyToAdd);
          break; 
        }
        case "Password": { 
          this.passwordKeys.push(keyToAdd);
          break; 
        }
        case "Other": { 
          this.otherKeys.push(keyToAdd);
          break; 
        }
      default: { 
         //Add to the other list 
         this.otherKeys.push(keyToAdd);
         break; 
      } 
   } 

  }

  onFileSelected(event){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      this.accountgraph=JSON.parse(event.target.result as string);
      this.loadItems();
      this.uploaded=false;
      alert('File uplaoded successfully');
    }
    reader.readAsText(file);
  }

  loadItems(){
    this.devicesKeys=this.findInHashtable("type","Device");
    this.passwordmanagerKeys=this.findInHashtable("type","Password Mananger");
    this.emailKeys=this.findInHashtable("type","Email");
    this.socialmediaKeys=this.findInHashtable("type","Social Media");
    this.financeKeys=this.findInHashtable("type","Finance");
    this.shoppingKeys=this.findInHashtable("type","Shopping");
    this.entertainmentKeys=this.findInHashtable("type","Entertainment");
    this.gamingKeys=this.findInHashtable("type","Gaming");
    this.otherKeys=this.findInHashtable("type","Other");
    this.otherKeys=this.otherKeys.concat(this.findInOthersInHashtable());
    this.passwordKeys=this.findInHashtable("type","Password");
    console.log(this.otherKeys);
  }


  findInHashtable(feild: string, tofind: string): string[]{
    var found: string[]=[];
    
    //Itterate through the hashtable
    for(let v in this.accountgraph){
    //Check the type of the entry
     if(this.accountgraph[v][feild]==tofind){ 
        //Add to array of device keys
        found.push(v);
      }
    }

    return found
    }

    findInOthersInHashtable(): string[]{
      var found: string[]=[];
      
      //Itterate through the hashtable
      for(let v in this.accountgraph){
      //Check the type of the entry
       if(this.accountgraph[v].type!=="Device"&& 
       this.accountgraph[v].type!=="Password Manager"&& 
       this.accountgraph[v].type!=="Email"&& 
       this.accountgraph[v].type!=="Social Media"&& 
       this.accountgraph[v].type!=="Finance"&& 
       this.accountgraph[v].type!=="Shopping"&& 
       this.accountgraph[v].type!=="Entertainment"&& 
       this.accountgraph[v].type!=="Gaming"&& 
       this.accountgraph[v].type!=="Other"&& 
       this.accountgraph[v].type!=="Password"
       ){ 
          //Add to array of device keys
          found.push(v);
        }
      }
      
      return found
      }


      save(){
        this.finalData=JSON.stringify(this.accountgraph);

        var element = document.createElement('a');
        element.setAttribute('href', 'data:json;charset=utf-8,' + encodeURIComponent(this.finalData));
        element.setAttribute('download', 'GraphJSON.json');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        
//        let myWindow=window.open('',"_blank",this.finalData);
//        myWindow.document.write(this.finalData);
      }

      startOver(){
        if(confirm("Are you sure you want to start again? Doing so will result in a loss of data.")){
          location.reload();
        }
      }

      visualise(){
        console.log("Visualising Account graph");
      }


}
