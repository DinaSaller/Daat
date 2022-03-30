import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service.service';

@Component({
  selector: 'app-detailscard',
  templateUrl: './detailscard.component.html',
  styleUrls: ['./detailscard.component.css']
})
export class DetailscardComponent implements OnInit {

  id: any;
  list: any[] = []
  item: any;class:any;
  constructor(private activatedRoute: ActivatedRoute, private service: Service) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getJson().subscribe(
      {
        next: (res) => {
          this.list = res.results;
          this.list.forEach(item => {
              item.Year = item.Year.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
            item.imdbID == this.id?this.item=item:""
          })
        },
        error: (e) => console.error(e),
      }
    )
  }

  updateUrl() {
    this.class = "error"
  }

  dosomething() {
    this.class = "good"
  }
}
