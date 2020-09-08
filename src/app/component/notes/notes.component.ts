import { Component, OnInit ,ElementRef ,Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
   @Input() key;
   @Input() current;
   @Output() updateNote: EventEmitter<any>= new EventEmitter()

  
  input: string="";

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.input=this.current;
  }

  saveNote(text: string){
    alert("Note saved");
    this.updateNote.emit({
      key: this.key,
      info: text
    });
  }

  deleteNote(){
    alert("Note deleted");
    this.updateNote.emit({
      key: this.key,
      info:""
    });
  }

}
