export class Incoming {
  private loginMethod= [];

  public addItem(item: string){
    this.loginMethod.push(item);
  }

  public getLoginMethodArray(){
    return this.loginMethod;
  }
}
