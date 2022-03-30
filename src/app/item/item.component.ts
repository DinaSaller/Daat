import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  class: any;
  closeResult = '';
  changeText = false;
  title: any;
  oldTitle:any;
  @Output() upadteList = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private service: Service) {

  }

  ngOnInit(): void {
    this.oldTitle=this.item.Title
  }

  updateUrl() {
    this.class = "error"

  }
  dosomething() {
    console.log("load");
    this.class = "good"

  }
  updateText(id:any) {
    this.upadteList.emit({id,title:this.title});
    this.changeText=false
    this.service.editTitle(this.title,this.oldTitle,id).subscribe(
      {
        next: (res) => {
          console.log(res);
         
        },
        error: (e) =>{alert(e.message); console.error(e)},
      }
    )
  }

  change() {
    this.changeText = true;
  }
}
