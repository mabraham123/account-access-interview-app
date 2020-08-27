export class Account {
private name: string="";
private type: string="";
private incoming= [];

constructor(name: string, type: string, incoming:Incoming[]){
  this.name=name;
  this.type=type;
  this.incoming.push(incoming);
}

public getName(): string{
  return this.name;
}

public setName(name: string){
   this.name=name;
}

public getType(): string{
  return this.type;
}

public setType(type: string){
   this.type=type;
}

public getIncoming(): Incoming[]{
  return this.incoming;
}

public setIncoming(incoming: Incoming[]){
   this.incoming=incoming;
}

public addIncoming(incoming: incoming[]){
  this.incoming.push(incoming);
}


}
