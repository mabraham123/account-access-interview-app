import { Component, OnInit ,ElementRef ,Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() token;

  @Output() updateNote: EventEmitter<any>= new EventEmitter()
  noteNumber: number;
  
  input: string="";

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
  }

  saveNote(text: string){
    this.updateNote.emit({
      save: true,
      token: this.token,
      info: text
    });
  }

  deleteNote(){
    this.updateNote.emit({
      save: false,
      token: this.token
    });
  }


  // deleteNote(){
  //   this.host.nativeElement.remove();
  // }

}
